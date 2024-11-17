const express = require("express");
const router = express.Router();
const { addNewDrama, updateDrama } = require("../Controllers/dramaController");
const prisma = require("../prismaClient");

// Endpoint untuk menambahkan drama baru
router.post("/", async (req, res) => {
  try {
    const dramaData = req.body;
    const newDrama = await addNewDrama(dramaData);
    res.status(201).json(newDrama);
  } catch (error) {
    console.error("Error adding drama:", error);
    res.status(500).json({ error: "Failed to add drama" });
  }
});

router.put("/:id", updateDrama);

module.exports = router;
