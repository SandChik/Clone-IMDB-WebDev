const express = require("express");
const router = express.Router();
const {
  getUsers,
  updateUser,
  deleteUser,
  createUser,
} = require("../Controllers/userController");
const validateApiAccess = require("../Middleware/validateApiAccess");

router.get("/users", getUsers);
router.put("/users/:id",validateApiAccess(["ADMIN"]), updateUser);
router.delete("/users/:id",validateApiAccess(["ADMIN"]), deleteUser);
router.post("/users",validateApiAccess(["ADMIN"]), createUser);

module.exports = router;
