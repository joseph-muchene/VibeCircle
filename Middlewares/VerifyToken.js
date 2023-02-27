import Jwt from "jsonwebtoken";

export const VerifyToken = (req, res, next) => {
  try {
    let bearerToken;
    bearerToken = req.headers.token;

    if (bearerToken) {
      const token = bearerToken.split(" ")[1];
      Jwt.verify(token, process.env.JWTSECRET, (err, decodedUser) => {
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
