// models/ProductDetails.js

const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const ProductImages = require('./ProductImage'); // Import the ProductImages model

const ProductDetails = sequelize.define('ProductDetails', {
  productName: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  slug: {
    type: DataTypes.STRING,
    allowNull: true,
    unique: true,
  },
  application: {
    type: DataTypes.TEXT,
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

// Define the association
ProductDetails.hasMany(ProductImages, { as: 'images', foreignKey: 'ProductDetailId' });
ProductImages.belongsTo(ProductDetails, { foreignKey: 'ProductDetailId' });

module.exports = ProductDetails;
