const express = require("express");
const router = express.Router();
const {
  getAllGenres,
  createGenre,
  updateGenre,
  deleteGenre,
} = require("../Controllers/genreController");
const validateApiAccess = require("../Middleware/validateApiAccess");

router.get("/genres", getAllGenres);
router.post("/genres", validateApiAccess(["ADMIN"]), createGenre);
router.put("/genres/:id", validateApiAccess(["ADMIN"]), updateGenre);
router.delete("/genres/:id", validateApiAccess(["ADMIN"]), deleteGenre);

module.exports = router;
