const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const upload = require("../middleware/upload");
const router = express.Router();
const { createProject, getMyProjects, deleteProject, updateProject, getAllProjects } = require("../controllers/projectController");

// Create new project
router.post("/", authMiddleware, upload.single("thumbnail"), createProject);

// Get all projects by logged in user
router.get("/my", authMiddleware, getMyProjects);

router.delete("/:id", authMiddleware, deleteProject);
// Update project
router.put("/:id", authMiddleware, upload.single("thumbnail"), updateProject);

router.get("/explore", getAllProjects); // public route


module.exports = router;