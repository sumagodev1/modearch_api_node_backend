const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const About = sequelize.define('About', {
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  img: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    defaultValue: true, // Default to false, so you can toggle it later
  },
  isDelete: {
    type: DataTypes.BOOLEAN,
    defaultValue: false, // Soft delete flag
  },
}, {
  timestamps: true,
});

module.exports = About;
