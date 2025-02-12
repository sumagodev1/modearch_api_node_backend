// models/MaterialData.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const MaterialData = sequelize.define('MaterialData', {
  productId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'ProductDetails',
      key: 'id'
    }
  },
  productName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  materialDescription: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
}, {
  timestamps: true,
});

module.exports = MaterialData;
