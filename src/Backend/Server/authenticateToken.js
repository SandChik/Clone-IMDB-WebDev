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
      console.log("Token invalid:", err.message);
      return res.status(403).json({ message: "Token is not valid" });
    }

    // Debugging: Log role dan user data
    console.log("User decoded from token:", user);

    if (!allowedRoles.includes(user.role)) {
      console.log("Role not allowed:", user.role);
      return res.status(403).json({ message: "Access denied" });
    }

    req.userId = user.userId; // Menyimpan user ID dari token di `req`
    req.role = user.role; // Menyimpan role di `req`
    next(); // Melanjutkan ke fungsi berikutnya
  });
};

module.exports = authenticateToken;
