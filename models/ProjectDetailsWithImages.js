// const { DataTypes } = require("sequelize");
// const sequelize = require("../config/database");

// const ProjectDetailsWithImages = sequelize.define(
//   "project_details_with_images",
//   {
//     imgs: {
//       type: DataTypes.JSON, // Use JSON type for storing an array of image paths
//       allowNull: true,
//     },
//     project_category_id: { type: DataTypes.STRING, allowNull: false },
//     project_category: { type: DataTypes.STRING, allowNull: false },
//     project_name_id: { type: DataTypes.STRING, allowNull: false },
//     project_name: { type: DataTypes.STRING, allowNull: false },
//     project_location: { type: DataTypes.STRING, allowNull: false },
//     project_info: { type: DataTypes.STRING, allowNull: false },
//     project_year_of_completion: { type: DataTypes.STRING, allowNull: false },
//     project_total_tonnage: { type: DataTypes.STRING, allowNull: false },
//     project_status: { type: DataTypes.STRING, allowNull: false },
//     isActive: { type: DataTypes.BOOLEAN, defaultValue: false },
//     isDelete: { type: DataTypes.BOOLEAN, defaultValue: false },
//   },
//   { timestamps: true }
// );

// module.exports = ProjectDetailsWithImages;

const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const ProjectDetailsWithImages = sequelize.define(
  "project_details_with_images2",
  {
    project_category_id: { type: DataTypes.STRING, allowNull: false },
    project_category: { type: DataTypes.STRING, allowNull: false },
    project_name_id: { type: DataTypes.STRING, allowNull: false },
    project_name: { type: DataTypes.STRING, allowNull: false, unique: true, },
    // project_location: { type: DataTypes.STRING, allowNull: false },
    // project_info: { type: DataTypes.STRING, allowNull: false },
    // project_year_of_completion: { type: DataTypes.STRING, allowNull: false },
    // project_total_tonnage: { type: DataTypes.STRING, allowNull: false },
    // project_status: { type: DataTypes.STRING, allowNull: false },
    project_images: { type: DataTypes.JSON, allowNull: true, defaultValue: [] }, // Store images as an array

    isActive: { type: DataTypes.BOOLEAN, defaultValue: false },
    isDelete: { type: DataTypes.BOOLEAN, defaultValue: false },
  },
  { timestamps: true }
);

module.exports = ProjectDetailsWithImages;
