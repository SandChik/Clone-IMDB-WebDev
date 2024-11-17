// reviewRoutes.js
const express = require("express");
const router = express.Router();
const {
  getAllReviews,
  approveReviews,
  unapproveReviews,
  deleteReviews,
} = require("../Controllers/reviewController");

router.get("/reviews", getAllReviews);
router.put("/reviews/approve", approveReviews);
router.put("/reviews/unapprove", unapproveReviews);
router.delete("/reviews", deleteReviews);

module.exports = router;
