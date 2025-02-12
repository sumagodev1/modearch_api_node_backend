// models/Oueleaders.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Oueleaders = sequelize.define('Oueleaders', {
  name: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  img: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  designation: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  longtext: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  linkedin: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  facebbok: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  instagram: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
  isDelete: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
}, {
  timestamps: true,
});

module.exports = Oueleaders;
