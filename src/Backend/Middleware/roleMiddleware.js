const validateRole = (allowedRoles) => {
  return (req, res, next) => {
    const userRole = req.user.role; // Ambil role dari JWT atau session
    if (allowedRoles.includes(userRole)) {
      next(); // Role cocok, lanjutkan ke handler berikutnya
    } else {
      return res.status(403).json({
        message: "Forbidden: You do not have access to this resource",
      });
    }
  };
};

module.exports = validateRole;
