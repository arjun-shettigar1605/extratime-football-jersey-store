const jwt = require("jsonwebtoken");

const adminAuth = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // Get token from header
      token = req.headers.authorization.split(" ")[1];

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Check if user is admin
      if (decoded.role !== "admin") {
        return res.status(403).json({ message: "Access denied. Admin only." });
      }

      // Add admin info to request
      req.admin = {
        id: decoded.id,
        username: decoded.username,
        role: decoded.role,
      };

      next();
    } catch (error) {
      console.error("Admin token verification error:", error);
      return res.status(401).json({ message: "Not authorized, token failed" });
    }
  }

  if (!token) {
    return res.status(401).json({ message: "Not authorized, no token" });
  }
};

module.exports = { adminAuth };
