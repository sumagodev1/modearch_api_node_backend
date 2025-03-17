const apiResponse = require("../helper/apiResponse");
const ProjectName = require("../models/ProjectName");
// exports.addProjectName = async (req, res) => {
//   try {
//     const { project_name, desc } = req.body;
//     const { project_category } = req.body;
//     const { project_category_id } = req.body;

//     const ProjectName1 = await ProjectName.create({
//       project_name,
//       project_category,
//       project_category_id,
//       isActive: true,
//       isDelete: false,
//     });
//     return apiResponse.successResponseWithData(
//       res,
//       "Project Name added successfully",
//       ProjectName1
//     );
//   } catch (error) {
//     console.error("Add Project Name failed", error);
//     return apiResponse.ErrorResponse(res, "Add Project Name failed");
//   }
// };

exports.addProjectName = async (req, res) => {
  try {
    const { project_name, project_category, project_category_id } = req.body;

    // Check if project_name already exists within the same project_category
    const existingProject = await ProjectName.findOne({
      where: { project_name, project_category },
    });

    if (existingProject) {
      return apiResponse.ErrorResponse(
        res,
        "A project with this name already exists in the selected category."
      );
    }

    // Create the project entry
    const ProjectName1 = await ProjectName.create({
      project_name,
      project_category,
      project_category_id,
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


// exports.updateProjectName = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { project_name, desc } = req.body;
//     const { project_category } = req.body;
//     const { project_category_id } = req.body;

//     const ProjectName1 = await ProjectName.findByPk(id);
//     if (!ProjectName1) {
//       return apiResponse.notFoundResponse(res, "Project Name not found");
//     }

//     ProjectName1.project_name = project_name;
//     ProjectName1.project_Category = project_category;
//     ProjectName1.project_Category_id = project_category_id;
//     await ProjectName1.save();

//     return apiResponse.successResponseWithData(
//       res,
//       "Project Name updated successfully",
//       ProjectName1
//     );
//   } catch (error) {
//     console.error("Update Project Name failed", error);
//     return apiResponse.ErrorResponse(res, "Update Project Name failed");
//   }
// };

// exports.updateProjectName = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { project_name, project_category, project_category_id } = req.body; // Extract all fields correctly

//     const project = await ProjectName.findByPk(id);
//     if (!project) {
//       return apiResponse.notFoundResponse(res, "Project Name not found");
//     }

//     // Ensure these fields exist in the model
//     project.project_name = project_name;
//     if (project.project_category !== undefined) {
//       project.project_category = project_category;
//     }
//     if (project.project_category_id !== undefined) {
//       project.project_category_id = project_category_id;
//     }

//     await project.save();

//     return apiResponse.successResponseWithData(
//       res,
//       "Project Name updated successfully",
//       project
//     );
//   } catch (error) {
//     console.error("Update Project Name failed", error);
//     return apiResponse.ErrorResponse(res, "Update Project Name failed");
//   }
// };

exports.updateProjectName = async (req, res) => {
  try {
    const { id } = req.params;
    const { project_name, project_category, project_category_id } = req.body;

    const project = await ProjectName.findByPk(id);
    if (!project) {
      return apiResponse.notFoundResponse(res, "Project Name not found");
    }

    // Allow update if the project_name and category remain unchanged
    if (
      project.project_name === project_name &&
      project.project_category === project_category
    ) {
      return apiResponse.successResponseWithData(
        res,
        "No changes detected, but update successful",
        project
      );
    }

    // Prevent duplicate project_name in the same project_category (except for the same record)
    const existingProject = await ProjectName.findOne({
      where: {
        project_name,
        project_category,
        // id: { [Op.ne]: id }, 
      },
    });

    if (existingProject) {
      return apiResponse.ErrorResponse(
        res,
        "A project with this name already exists in the selected category."
      );
    }

    // Proceed with update
    project.project_name = project_name;
    project.project_category = project_category;
    project.project_category_id = project_category_id;

    await project.save();

    return apiResponse.successResponseWithData(
      res,
      "Project Name updated successfully",
      project
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
