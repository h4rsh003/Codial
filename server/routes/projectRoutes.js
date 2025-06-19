const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const upload = require("../middleware/upload");
const router = express.Router();
const { createProject, getMyProjects, deleteProject } = require("../controllers/projectController");

// Create new project
router.post("/", authMiddleware, upload.single("thumbnail"), createProject);

// Get all projects by logged in user
router.get("/my", authMiddleware, getMyProjects);

router.delete("/:id", authMiddleware, deleteProject);

module.exports = router;