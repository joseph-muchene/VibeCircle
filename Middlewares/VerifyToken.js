import Jwt from "jsonwebtoken";

export const VerifyToken = (req, res, next) => {
  try {
    const bearerToken = req.headers.token.split(" ")[1];

    if (bearerToken) {
      Jwt.verify(bearerToken, process.env.JWTSECRET, (err, decodedUser) => {
        if (err || !decodedUser) {
          return res.status(403).json("you are not authenticated");
        } else {
          req.user = decodedUser;
          next();
        }
      });
    } else {
      return res.status(403).json("token was not found");
    }
  } catch (error) {
    throw new Error(error.message);
  }
};
