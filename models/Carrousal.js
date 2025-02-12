const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Carrousal = sequelize.define(
  "Carrousal",
  {
    img: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false, // You can set this to `false` if the title is required
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    isDelete: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = Carrousal;
