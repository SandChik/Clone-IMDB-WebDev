const express = require("express");
const router = express.Router();
const validateApiAccess = require("../Middleware/validateApiAccess");
const {
  getAllActors,
  createActor,
  updateActor,
  deleteActor,
} = require("../Controllers/actorController");

router.get("/",validateApiAccess(["ADMIN", "USER"]), getAllActors);
router.post("/", validateApiAccess(["ADMIN"]), createActor);
router.put("/:id", validateApiAccess(["ADMIN"]), updateActor);
router.delete("/:id", validateApiAccess(["ADMIN"]), deleteActor);

module.exports = router;
