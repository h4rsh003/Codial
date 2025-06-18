const express = require("express");
const multer = require("../middleware/upload");
const { signup, login } = require("../controllers/authController");

const router = express.Router();
router.post("/signup", multer.single("avatar"), signup);
router.post("/login", login);

module.exports = router;
