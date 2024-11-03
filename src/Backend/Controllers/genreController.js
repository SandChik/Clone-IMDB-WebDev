const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Ambil semua genres
const getAllGenres = async (req, res) => {
  try {
    const genres = await prisma.genre.findMany();
    res.json(genres);
  } catch (error) {
    console.error("Error fetching genres:", error);
    res.status(500).json({ error: "An error occurred while fetching genres." });
  }
};

// Buat genre baru
const createGenre = async (req, res) => {
  const { name } = req.body;
  try {
    const newGenre = await prisma.genre.create({
      data: { name },
    });
    res.status(201).json(newGenre);
  } catch (error) {
    console.error("Error creating genre:", error);
    res
      .status(500)
      .json({ error: "An error occurred while creating the genre." });
  }
};

// Update genre
const updateGenre = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  try {
    const updatedGenre = await prisma.genre.update({
      where: { id: parseInt(id) },
      data: { name },
    });
    res.json(updatedGenre);
  } catch (error) {
    console.error("Error updating genre:", error);
    res
      .status(500)
      .json({ error: "An error occurred while updating the genre." });
  }
};

// Hapus genre
const deleteGenre = async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.genre.delete({
      where: { id: parseInt(id) },
    });
    res.status(204).send();
  } catch (error) {
    console.error("Error deleting genre:", error);
    res
      .status(500)
      .json({ error: "An error occurred while deleting the genre." });
  }
};

module.exports = {
  getAllGenres,
  createGenre,
  updateGenre,
  deleteGenre,
};
