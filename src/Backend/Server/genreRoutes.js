const express = require("express");
const router = express.Router();
const {
  getAllGenres,
  createGenre,
  updateGenre,
  deleteGenre,
} = require("../Controllers/genreController");

router.get("/genres", getAllGenres);
router.post("/genres", createGenre);
router.put("/genres/:id", updateGenre);
router.delete("/genres/:id", deleteGenre);

module.exports = router;
