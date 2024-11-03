const express = require("express");
const awardController = require("../Controllers/awardController");
const router = express.Router();

// Ambil semua awards
router.get("/api/awards", awardController.getAllAwards);

// Tambah award baru
router.post("/api/awards", awardController.createAward);

// Update award
router.put("/api/awards/:id", awardController.updateAward);

// Hapus award
router.delete("/api/awards/:id", awardController.deleteAward);

module.exports = router;
