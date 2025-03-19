const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const User = require("./User");

const Project = sequelize.define("Project", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
  },
  createdBy: {
    type: DataTypes.INTEGER,
    references: {
      model: User,
      key: "id",
    },
  },
});

User.hasMany(Project, { foreignKey: "createdBy" });
Project.belongsTo(User, { foreignKey: "createdBy" });

module.exports = Project;
