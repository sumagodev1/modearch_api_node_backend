const apiResponse = require("../helper/apiResponse");
const ProjectName = require("../models/ProjectName");
exports.addProjectName = async (req, res) => {
  try {
    const { project_name } = req.body;

    const ProjectName1 = await ProjectName.create({
      project_name,
      isActive: true,
      isDelete: false,
    });
    return apiResponse.successResponseWithData(
      res,
      "Project Name added successfully",
      ProjectName1
    );
  } catch (error) {
    console.error("Add Project Name failed", error);
    return apiResponse.ErrorResponse(res, "Add Project Name failed");
  }
};

exports.updateProjectName = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, desc } = req.body;

    const ProjectName1 = await ProjectName.findByPk(id);
    if (!ProjectName1) {
      return apiResponse.notFoundResponse(res, "Project Name not found");
    }

    ProjectName1.title = title;
    await ProjectName1.save();

    return apiResponse.successResponseWithData(
      res,
      "Project Name updated successfully",
      ProjectName1
    );
  } catch (error) {
    console.error("Update Project Name failed", error);
    return apiResponse.ErrorResponse(res, "Update Project Name failed");
  }
};

exports.getProjectName = async (req, res) => {
  try {
    const ProjectName1 = await ProjectName.findAll({
      where: { isDelete: false },
    });

    // Base URL for images
    // const baseUrl = `${process.env.SERVER_PATH}`; // Adjust according to your setup
    // console.log("baseUrl....", baseUrl);
    // const ProjectNameWithBaseUrl = ProjectName.map((ProjectName) => {
    //   console.log("ProjectName.img", ProjectName.img);
    //   return {
    //     ...ProjectName.toJSON(), // Convert Sequelize instance to plain object
    //     img: ProjectName.img
    //       ? baseUrl + ProjectName.img.replace(/\\/g, "/")
    //       : null,
    //   };
    // });

    return apiResponse.successResponseWithData(
      res,
      "Project Name retrieved successfully",
      ProjectName1
    );
  } catch (error) {
    console.error("Get Project Name failed", error);
    return apiResponse.ErrorResponse(res, "Get Project Name failed");
  }
};

exports.isActiveStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const ProjectName1 = await ProjectName.findByPk(id);

    if (!ProjectName1) {
      return apiResponse.notFoundResponse(res, "Project Name not found");
    }

    ProjectName1.isActive = !ProjectName1.isActive;
    await ProjectName1.save();

    return apiResponse.successResponseWithData(
      res,
      "Project Name status updated successfully",
      ProjectName1
    );
  } catch (error) {
    console.error("Toggle ProjectName status failed", error);
    return apiResponse.ErrorResponse(res, "Toggle Project Name status failed");
  }
};

exports.isDeleteStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const ProjectName1 = await ProjectName.findByPk(id);

    if (!ProjectName1) {
      return apiResponse.notFoundResponse(res, "Project Name not found");
    }

    ProjectName1.isDelete = !ProjectName1.isDelete;
    await ProjectName1.save();

    return apiResponse.successResponseWithData(
      res,
      "Project Name delete status updated successfully",
      ProjectName1
    );
  } catch (error) {
    console.error("Toggle Project Name delete status failed", error);
    return apiResponse.ErrorResponse(
      res,
      "Toggle Project Name delete status failed"
    );
  }
};
