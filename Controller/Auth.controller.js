import User from "../models/user.model.js";
import bcryptJs from "bcryptjs";
import Jwt from "jsonwebtoken";
// login the user

async function LoginUser(req, res) {
  try {
    // get the user details from the req.body and check if the user already exists
    // if the user does not exist request client to go to the register page
    // if the user exists compare the password to the password in the database
    // if there is a match, create a token and send it as payload

    const email = req.body.email;
    const password = req.body.password;

    const user = await User.findOne({ email });

    if (!user) return res.status(404).json("user was not found");
    const userPassword = user.password;
    const comparePassword = await bcryptJs.compareSync(password, userPassword);
    console.log(comparePassword);
    if (comparePassword) {
      const payload = {
        name: user.name,
        _id: user.id,
        isAdmin: user.isAdmin,
      };
      Jwt.sign(
        payload,
        process.env.JWTSECRET,
        { expiresIn: "30d" },
        (err, token) => {
          if (err || !token) {
            return res.status(403).json("Not authorized");
          } else {
            return res.status(200).json({
              ...payload,
              token,
            });
          }
        }
      );
    } else {
      return res.status(403).json("invalid credentials");
    }
  } catch (err) {
    return res.status(500).json({ "server error": err.message });
  }
}

export { LoginUser };
