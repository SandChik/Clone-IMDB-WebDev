const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const {
  addNewDrama,
  getAllDramas,
  getDramaById,
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

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
