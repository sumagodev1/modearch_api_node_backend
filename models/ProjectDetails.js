const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const ProjectDetails = sequelize.define('project_deatils', {
  img: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  project_category: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  project_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  project_location: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  isDelete: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
}, {
  timestamps: true,
});

module.exports = ProjectDetails;
