const express = require("express");
const router = express.Router();
const { addNewDrama, updateDrama } = require("../Controllers/dramaController");
const prisma = require("../prismaClient");
const validateApiAccess = require("../Middleware/validateApiAccess");

// Endpoint untuk menambahkan drama baru
router.post("/", validateApiAccess(["ADMIN"]), async (req, res) => {
  try {
    const dramaData = req.body;
    const newDrama = await addNewDrama(dramaData);
    res.status(201).json(newDrama);
  } catch (error) {
    console.error("Error adding drama:", error);
    res.status(500).json({ error: "Failed to add drama" });
  }
});

router.put("/:id", validateApiAccess(["ADMIN"]), updateDrama);

module.exports = router;
