// src/backend/controllers/actorController.js
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Mendapatkan semua data aktor
const getAllActors = async (req, res) => {
  try {
    const actors = await prisma.actor.findMany();
    res.json(actors);
  } catch (error) {
    console.error("Error fetching actors:", error);
    res.status(500).json({ error: "Failed to fetch actors" });
  }
};

// Menambahkan aktor baru
const createActor = async (req, res) => {
  try {
    const { name, countryId, urlPhoto } = req.body;

    if (!name || !countryId || !urlPhoto) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const newActor = await prisma.actor.create({
      data: {
        name,
        countryId: parseInt(countryId, 10), // Pastikan ini dalam bentuk integer
        urlPhoto,
      },
    });

    res.status(201).json(newActor);
  } catch (error) {
    console.error("Error creating actor:", error);
    res.status(500).json({ error: "Failed to create actor" });
  }
};

// Mengedit aktor
const updateActor = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, countryId, urlPhoto } = req.body;

    const updatedActor = await prisma.actor.update({
      where: { id: parseInt(id, 10) },
      data: {
        name,
        countryId: parseInt(countryId, 10),
        urlPhoto,
      },
    });

    res.json(updatedActor);
  } catch (error) {
    console.error("Error updating actor:", error);
    res.status(500).json({ error: "Failed to update actor" });
  }
};

// Menghapus aktor
const deleteActor = async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.actor.delete({
      where: { id: parseInt(id, 10) },
    });

    res.status(204).end();
  } catch (error) {
    console.error("Error deleting actor:", error);
    res.status(500).json({ error: "Failed to delete actor" });
  }
};

module.exports = {
  getAllActors,
  createActor,
  updateActor,
  deleteActor,
};
