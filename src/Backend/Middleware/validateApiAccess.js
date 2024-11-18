// middleware/validateApiAccess.js
const jwt = require("jsonwebtoken");

const validateApiAccess = (allowedRoles = []) => {
  return (req, res, next) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token)
      return res
        .status(401)
        .json({ message: "Unauthorized: No token provided" });

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err)
        return res.status(403).json({ message: "Forbidden: Invalid token" });

      // Tambahkan validasi role jika `allowedRoles` tidak kosong
      if (allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
        return res
          .status(403)
          .json({ message: "Forbidden: You do not have access" });
      }

      req.user = user; // Simpan informasi user ke request
      next(); // Lanjutkan ke handler berikutnya
    });
  };
};

module.exports = validateApiAccess;
