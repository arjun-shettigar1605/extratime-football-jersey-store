const jwt = require("jsonwebtoken");
const User = require("../models/User");
//protects API routes so that only loggedin users access
const protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    try {
      //extract token from header
      token = req.headers.authorization.split(" ")[1];

      //check if token is not expired and made with the secret key.
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      //find user from db with token, exclude password for safety
      req.user = await User.findById(decoded.id).select("-password");
      next();

    } catch (error) { //token expired
      console.error("Token verification error:", error);
      return res.status(401).json({ message: "Not authorized, token failed" });
    }
  }
  if (!token) { //no token
    return res.status(401).json({ message: "Not authorized, no token" });
  }
};

module.exports = { protect };
