const express = require("express");
const router = express.Router();
const {
  addPassword,
  getPasswords,
  deletePassword,
} = require("../controllers/passwordController");

router.post("/add", addPassword);
router.get("/all", getPasswords);
router.delete("/:id", deletePassword);

module.exports = router;
