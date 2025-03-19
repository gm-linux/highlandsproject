const Project = require("../models/Project");

exports.createProject = async (req, res) => {
  if (req.user.role !== "admin") return res.status(403).json({ message: "Access Denied" });

  try {
    const project = await Project.create({ title: req.body.title, description: req.body.description, createdBy: req.user.id });
    res.json(project);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getProjects = async (req, res) => {
  const projects = await Project.findAll();
  res.json(projects);
};
