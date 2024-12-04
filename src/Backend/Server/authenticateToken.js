const jwt = require("jsonwebtoken");

const authenticateToken =
  (allowedRoles = []) =>
  (req, res, next) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
      console.log("No token provided");
      return res.status(401).json({ message: "No token provided" });
    }

    jwt.verify(
      token,
      process.env.JWT_SECRET || "your_secret_key",
      (err, user) => {
        if (err) {
          console.error("Invalid token:", err);
          // Ubah status kode ke 401 untuk token tidak valid
          return res.status(401).json({ message: "Invalid token" });
        }

        console.log("Decoded Token:", user); // Debug token decoding
        req.userId = user.userId;
        req.role = user.role;

        if (allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
          return res
            .status(403)
            .json({ message: "Access denied: Insufficient role" });
        }

        next();
      }
    );
  };

module.exports = authenticateToken;
