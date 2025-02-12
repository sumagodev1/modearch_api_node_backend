const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const ContactPerson = sequelize.define('ContactPerson', {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  person_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  img: {
    type: DataTypes.STRING,
    allowNull: true,
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

module.exports = ContactPerson;
