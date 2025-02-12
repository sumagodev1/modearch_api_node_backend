const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const applicationData = sequelize.define('applicationData', {
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
  applicationDescription: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
}, {
  timestamps: true,
});

module.exports = applicationData;
