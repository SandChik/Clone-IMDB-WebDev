// server.js
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const {
  addNewDrama,
  getAllDramas,
  getDramaById,
  getReviewsByDramaId,
  addReview,
  approveDrama, // Import fungsi approve dari dramaController
  deleteDrama, // Import fungsi delete dari dramaController
  getAllCountries,
  addCountry,
  deleteCountry,
} = require("../Controllers/dramaController");

const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json());

// Route untuk menambahkan drama
app.post("/api/dramas", async (req, res) => {
  try {
    const newDrama = await addNewDrama(req.body);
    res.status(201).json(newDrama);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating drama" });
  }
});

// Route untuk mendapatkan semua drama
app.get("/api/dramas", async (req, res) => {
  try {
    const dramas = await getAllDramas();
    res.status(200).json(dramas);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching dramas" });
  }
});

// Route untuk mendapatkan drama berdasarkan ID
app.get("/api/dramas/:id", async (req, res) => {
  try {
    const drama = await getDramaById(parseInt(req.params.id));
    res.status(200).json(drama);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching drama detail" });
  }
});

// Route untuk mendapatkan review berdasarkan dramaId
app.get("/api/reviews/:dramaId", async (req, res) => {
  try {
    const dramaId = parseInt(req.params.dramaId); // Convert dramaId menjadi integer
    const reviews = await getReviewsByDramaId(dramaId);
    res.status(200).json(reviews);
  } catch (error) {
    console.error("Error fetching reviews:", error);
    res.status(500).json({ message: "Error fetching reviews" });
  }
});

// Route untuk menambahkan review baru
app.post("/api/reviews", async (req, res) => {
  try {
    const { author, content, rating, dramaId } = req.body;
    const newReview = await addReview({
      author,
      content,
      rating: parseFloat(rating),
      dramaId: parseInt(dramaId),
    });
    res.status(201).json(newReview);
  } catch (error) {
    console.error("Error creating review:", error);
    res.status(500).json({ message: "Error creating review" });
  }
});

// Route untuk approve drama
app.patch("/api/dramas/:id/approve", approveDrama);

// Route untuk delete drama
app.delete("/api/dramas/:id", async (req, res) => {
  try {
    await deleteDrama(req.params.id);
    res.json({ message: "Drama deleted successfully" });
  } catch (error) {
    console.error("Error deleting drama:", error);
    res.status(500).json({ message: "Error deleting drama" });
  }
});

// Route untuk mendapatkan semua countries
app.get("/api/countries", async (req, res) => {
  try {
    const countries = await getAllCountries();
    res.status(200).json(countries);
  } catch (error) {
    console.error("Error fetching countries:", error);
    res.status(500).json({ message: "Error fetching countries" });
  }
});

// Route untuk menambahkan country baru
app.post("/api/countries", async (req, res) => {
  try {
    const { name } = req.body;
    const newCountry = await addCountry(name.toUpperCase());
    res.status(201).json(newCountry);
  } catch (error) {
    console.error("Error adding country:", error);
    res.status(500).json({ message: "Error adding country" });
  }
});

// Route untuk menghapus country berdasarkan ID
app.delete("/api/countries/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedCountry = await deleteCountry(id);
    res.status(200).json(deletedCountry);
  } catch (error) {
    console.error("Error deleting country:", error);
    res.status(500).json({ message: "Error deleting country" });
  }
});

// Jalankan server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
