const express = require("express");
const { createProject, getProjects } = require("../controllers/projectController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();
router.post("/", authMiddleware, createProject);
router.get("/", getProjects);

module.exports = router;

router.delete("/:id", authMiddleware, async (req, res) => {
    try {
        if (req.user.role !== "admin") return res.status(403).json({ message: "Access Denied" });
        const id = req.params.id;
        const project = await Project.findByPk(id);
        if (!project) return res.status(404).json({ message: "Project not found" });
        await project.destroy();
        res.json({ message: "Project deleted" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// ✨ Update project (PUT)
router.put("/:id", authMiddleware, async (req, res) => {
    try {
        if (req.user.role !== "admin") return res.status(403).json({ message: "Access Denied" });
        
        const project = await Project.findByPk(req.params.id);
        if (!project) return res.status(404).json({ message: "Project not found" });

        const { title, description, github, url } = req.body;
        await project.update({ title, description, github, url });
        
        res.json({ message: "Project updated" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});
