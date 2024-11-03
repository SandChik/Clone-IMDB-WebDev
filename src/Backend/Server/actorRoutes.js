const express = require("express");
const router = express.Router();
const {
  getAllActors,
  createActor,
  updateActor,
  deleteActor,
} = require("../Controllers/actorController");

router.get("/", getAllActors);
router.post("/", createActor);
router.put("/:id", updateActor);
router.delete("/:id", deleteActor);

module.exports = router;
