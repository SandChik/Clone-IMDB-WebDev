// reviewRoutes.js
const express = require("express");
const router = express.Router();
const {
  getAllReviews,
  approveReviews,
  unapproveReviews,
  deleteReviews,
} = require("../Controllers/reviewController");
const validateApiAccess = require("../Middleware/validateApiAccess");

router.get("/reviews", getAllReviews);
router.put("/reviews/approve", validateApiAccess(["ADMIN"]), approveReviews);
router.put("/reviews/unapprove",validateApiAccess(["ADMIN"]), unapproveReviews);
router.delete("/reviews", validateApiAccess(["ADMIN"]), deleteReviews);

module.exports = router;
