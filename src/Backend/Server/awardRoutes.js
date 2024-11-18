const express = require("express");
const awardController = require("../Controllers/awardController");
const router = express.Router();
const validateApiAccess = require("../Middleware/validateApiAccess");

// Ambil semua awards
router.get("/api/awards", awardController.getAllAwards);

// Tambah award baru
router.post("/api/awards", validateApiAccess(["ADMIN"]),awardController.createAward);

// Update award
router.put("/api/awards/:id", validateApiAccess(["ADMIN"]),awardController.updateAward);

// Hapus award
router.delete("/api/awards/:id", validateApiAccess(["ADMIN"]),awardController.deleteAward);

module.exports = router;
