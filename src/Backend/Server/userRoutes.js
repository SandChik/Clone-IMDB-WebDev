const express = require("express");
const router = express.Router();
const {
  getUsers,
  updateUser,
  deleteUser,
  createUser,
} = require("../Controllers/userController");

router.get("/users", getUsers);
router.put("/users/:id", updateUser);
router.delete("/users/:id", deleteUser);
router.post("/users", createUser);

module.exports = router;
