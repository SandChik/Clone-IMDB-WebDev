const jwt = require("jsonwebtoken");

const authenticateToken = (allowedRoles) => (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    console.log("No token provided");
    return res.status(401).json({ message: "No token provided" });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      console.error("Invalid token:", err);
      return res.status(403).json({ message: "Access denied" });
    }

    console.log("Decoded Token:", user); // Tambahkan ini untuk debug
    req.userId = user.userId;
    req.role = user.role;
    next();
  });

};

module.exports = authenticateToken;
