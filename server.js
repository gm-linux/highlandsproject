const express = require("express");
const dotenv = require("dotenv");
const sequelize = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const projectRoutes = require("./routes/projectRoutes");

dotenv.config();
const app = express();

app.use(express.json());
app.use("/auth", authRoutes);
app.use("/projects", projectRoutes);

sequelize.sync()
  .then(() => console.log("Database Connected"))
  .catch(err => console.log("DB Error: ", err));

app.listen(3000, () => console.log("Server running on port 3000"));

const sequelize = require("./config/db");
const User = require("./models/User");
const Project = require("./models/Project");

sequelize.sync({ alter: true }) // Use { force: true } to reset DB (removes all data)
  .then(() => console.log("✅ Database & tables created!"))
  .catch(err => console.error("❌ Error syncing database:", err));
