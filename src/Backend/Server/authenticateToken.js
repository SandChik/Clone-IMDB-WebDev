// middleware/authenticateToken.js
const jwt = require("jsonwebtoken");

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) return res.status(401).json({ message: "No token provided" });

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: "Token is not valid" });
    req.userId = user.userId; // Menyimpan user ID dari token di `req`
    next(); // Melanjutkan ke fungsi berikutnya
  });
};

module.exports = authenticateToken;
