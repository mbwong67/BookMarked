const jwt = require("jsonwebtoken");

const secret = "mysecretsshhhhh";
const expiration = "2h";

module.exports = {
  authMiddleware: function ({ context }, next) {
    const token = context.token;

    if (!token) {
      return {
        success: false,
        message: "You have no token!",
      };
    }

    try {
      const { data } = jwt.verify(token, secret, { maxAge: expiration });
      context.user = data;
    } catch {
      console.log("Invalid token");
      return {
        success: false,
        message: "Invalid token!",
      };
    }

    return next();
  },
  signToken: function ({ username, email, _id }) {
    const payload = { username, email, _id };

    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
  },
};
