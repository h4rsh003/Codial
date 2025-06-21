const Project = require("../models/Project");
const createProject = async (req, res) => {
    try {
        const { title, description, techStack, github, liveLink } = req.body;
        const thumbnail = req.file ? `/uploads/${req.file.filename}` : "";

        const newProject = new Project({
            user: req.user,
            title,
            description,
            techStack,
            github,
            liveLink,
            thumbnail,
        });
        await newProject.save();
        res.status(201).json({ message: "Project created", project: newProject });
    } catch (error) {
        console.error("Created Project Error:", error);
        res.status(500).json({ message: "Server error" });
    }
};

const getMyProjects = async(req, res) => {
    try {
        const projects = await Project.find({ user: req.user }).sort({ createdAt: -1 });
        res.json({ projects });
    } catch(error) {
        console.error("Get Projects Error:", error);
        res.status(500).json({ message: "Server error" });
    }
};

const deleteProject = async (req, res) => {
  try {
    const project = await Project.findOneAndDelete({
      _id: req.params.id,
      user: req.user,
    });

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    res.json({ message: "Project deleted successfully" });
  } catch (error) {
    console.error("Delete error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const updateProject = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, techStack, github, liveLink } = req.body;
    const thumbnail = req.file ? `/uploads/${req.file.filename}` : undefined;

    const updateFields = {
      title,
      description,
      techStack,
      github,
      liveLink,
    };

    if (thumbnail) updateFields.thumbnail = thumbnail;

    const updatedProject = await Project.findOneAndUpdate(
      { _id: id, user: req.user },
      updateFields,
      { new: true }
    );

    if (!updatedProject) return res.status(404).json({ message: "Project not found" });

    res.json({ message: "Project updated", project: updatedProject });
  } catch (error) {
    console.error("Update Project Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const getAllProjects = async (req, res) => {
  try {
    const projects = await Project.find().populate("user", "name avatar");
    res.json({ projects });
  } catch (error) {
    console.error("Get All Projects Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};


module.exports = {
    createProject,
    getMyProjects,
    deleteProject,
    updateProject,
    getAllProjects,
};
