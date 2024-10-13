const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const {
  addNewDrama,
  getAllDramas,
  getDramaById,
  getReviewsByDramaId,
  addReview,
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
    const reviews = await getReviewsByDramaId(dramaId); // Panggil fungsi dengan dramaId yang sudah di-convert
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
      rating: parseFloat(rating), // Konversi rating jika perlu
      dramaId: parseInt(dramaId),  // Pastikan dramaId dalam bentuk integer
    });
    res.status(201).json(newReview);  // Kirim respon jika sukses
  } catch (error) {
    console.error("Error creating review:", error);
    res.status(500).json({ message: "Error creating review" });
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
