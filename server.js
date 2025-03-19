require("dotenv").config(); // Load .env file

const express = require("express");
const dotenv = require("dotenv");
const sequelize = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const projectRoutes = require("./routes/projectRoutes");
const User = require("./models/User");
const Project = require("./models/Project");

dotenv.config();
const app = express();

// ✅ Middleware to parse JSON requests
app.use(express.json());

// ✅ Define routes
app.use("/auth", authRoutes);
app.use("/projects", projectRoutes);

// ✅ Sync Database & Models
sequelize.sync({ alter: true }) // Use { force: true } to reset DB (WARNING: This will delete data)
  .then(() => console.log("✅ Database & tables created!"))
  .catch(err => console.error("❌ Error syncing database:", err));

// ✅ Start the Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));