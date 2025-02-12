const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Subscribe = sequelize.define('Subscribe', {
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true, // Add unique constraint
    validate: {
      isEmail: true,
    },
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

module.exports = Subscribe;
