// models/ProductImages.js

const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const ProductImages = sequelize.define('ProductImages', {
  img: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  ProductDetailId: {
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
  }
}, {
  timestamps: true,
});

module.exports = ProductImages;
