const apiResponse = require('../helper/apiResponse');
const ProjectDetails = require('../models/ProjectDetails')

exports.addProjectDetails = async (req, res) => {
  try {
    const { project_category, desc } = req.body;
    const { project_name} = req.body;
    const { project_location} = req.body;
    const img = req.file ? req.file.path : null;

    const ProjectDetails1 = await ProjectDetails.create({ img, project_category, project_name, project_location, isActive: true, isDelete: false });
    return apiResponse.successResponseWithData(res, 'Project Details added successfully', ProjectDetails1);
  } catch (error) {
    console.error('Add Project Details failed', error);
    return apiResponse.ErrorResponse(res, 'Add Project Details failed');
  }
};

exports.updateProjectDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const { project_category, desc } = req.body;
    const { project_name} = req.body;
    const { project_location} = req.body;
    const img = req.file ? req.file.path : null;

    const ProjectDetails1 = await ProjectDetails.findByPk(id);
    if (!ProjectDetails1) {
      return apiResponse.notFoundResponse(res, 'Project Details not found');
    }

    ProjectDetails1.img = img || ProjectDetails1.img;
    ProjectDetails1.project_category = project_category;
    ProjectDetails1.project_name = project_name;
    ProjectDetails1.project_location = project_location;
    await ProjectDetails1.save();

    return apiResponse.successResponseWithData(res, 'Project Details updated successfully', ProjectDetails1);
  } catch (error) {
    console.error('Update Project Details failed', error);
    return apiResponse.ErrorResponse(res, 'Update Project Details failed');
  }
};

exports.getProjectDetails = async (req, res) => {
  try {
    const ProjectDetails1 = await ProjectDetails.findAll({ where: { isDelete: false } });
    
    // Base URL for images
    const baseUrl = `${process.env.SERVER_PATH}`; // Adjust according to your setup
    console.log("baseUrl....", baseUrl);
    const projectDetailsWithBaseUrl = ProjectDetails1.map(ProjectDetails1 => {
      console.log("Project Details.img", ProjectDetails1.img);
      return {
        ...ProjectDetails1.toJSON(), // Convert Sequelize instance to plain object
        img: ProjectDetails1.img ? baseUrl + ProjectDetails1.img.replace(/\\/g, '/') : null 
      };
    });

    return apiResponse.successResponseWithData(res, 'Project Details retrieved successfully', projectDetailsWithBaseUrl);
  } catch (error) {
    console.error('Get Project Details failed', error);
    return apiResponse.ErrorResponse(res, 'Get Project Details failed');
  }
};

exports.isActiveStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const ProjectDetails1 = await ProjectDetails.findByPk(id);

    if (!ProjectDetails1) {
      return apiResponse.notFoundResponse(res, 'Project Details not found');
    }

    ProjectDetails1.isActive = !ProjectDetails1.isActive;
    await ProjectDetails1.save();

    return apiResponse.successResponseWithData(res, 'Project Details status updated successfully', ProjectDetails1);
  } catch (error) {
    console.error('Toggle Project Details status failed', error);
    return apiResponse.ErrorResponse(res, 'Toggle Project Details status failed');
  }
};

exports.isDeleteStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const ProjectDetails1 = await ProjectDetails.findByPk(id);

    if (!ProjectDetails1) {
      return apiResponse.notFoundResponse(res, 'Project Details not found');
    }

    ProjectDetails1.isDelete = !ProjectDetails1.isDelete;
    await ProjectDetails1.save();

    return apiResponse.successResponseWithData(res, 'Project Details delete status updated successfully', ProjectDetails1);
  } catch (error) {
    console.error('Toggle Project Details delete status failed', error);
    return apiResponse.ErrorResponse(res, 'Toggle Project Details delete status failed');
  }
};
