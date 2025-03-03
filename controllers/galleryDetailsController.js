const apiResponse = require('../helper/apiResponse');
const GalleryDetails = require('../models/GalleryDetails')

exports.addGalleryDetails = async (req, res) => {
  try {
    const { gallery_category, desc } = req.body;
    const img = req.file ? req.file.path : null;

    const GalleryDetails1 = await GalleryDetails.create({ img, gallery_category, isActive: true, isDelete: false });
    return apiResponse.successResponseWithData(res, 'Project Details added successfully', GalleryDetails1);
  } catch (error) {
    console.error('Add Project Details failed', error);
    return apiResponse.ErrorResponse(res, 'Add Project Details failed');
  }
};

exports.updateGalleryDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const { gallery_category, desc } = req.body;
    const img = req.file ? req.file.path : null;

    const GalleryDetails1 = await GalleryDetails.findByPk(id);
    if (!GalleryDetails1) {
      return apiResponse.notFoundResponse(res, 'Project Details not found');
    }

    GalleryDetails1.img = img || GalleryDetails1.img;
    GalleryDetails1.gallery_category = gallery_category;
    await GalleryDetails1.save();

    return apiResponse.successResponseWithData(res, 'Project Details updated successfully', GalleryDetails1);
  } catch (error) {
    console.error('Update Project Details failed', error);
    return apiResponse.ErrorResponse(res, 'Update Project Details failed');
  }
};

exports.getGalleryDetails = async (req, res) => {
  try {
    const GalleryDetails1 = await GalleryDetails.findAll({ where: { isDelete: false } });
    
    // Base URL for images
    const baseUrl = `${process.env.SERVER_PATH}`; // Adjust according to your setup
    console.log("baseUrl....", baseUrl);
    const GalleryDetailsWithBaseUrl = GalleryDetails1.map(GalleryDetails1 => {
      console.log("Project Details.img", GalleryDetails1.img);
      return {
        ...GalleryDetails1.toJSON(), // Convert Sequelize instance to plain object
        img: GalleryDetails1.img ? baseUrl + GalleryDetails1.img.replace(/\\/g, '/') : null 
      };
    });

    return apiResponse.successResponseWithData(res, 'Project Details retrieved successfully', GalleryDetailsWithBaseUrl);
  } catch (error) {
    console.error('Get Project Details failed', error);
    return apiResponse.ErrorResponse(res, 'Get Project Details failed');
  }
};

exports.isActiveStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const GalleryDetails1 = await GalleryDetails.findByPk(id);

    if (!GalleryDetails1) {
      return apiResponse.notFoundResponse(res, 'Project Details not found');
    }

    GalleryDetails1.isActive = !GalleryDetails1.isActive;
    await GalleryDetails1.save();

    return apiResponse.successResponseWithData(res, 'Project Details status updated successfully', GalleryDetails1);
  } catch (error) {
    console.error('Toggle Project Details status failed', error);
    return apiResponse.ErrorResponse(res, 'Toggle Project Details status failed');
  }
};

exports.isDeleteStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const GalleryDetails1 = await GalleryDetails.findByPk(id);

    if (!GalleryDetails1) {
      return apiResponse.notFoundResponse(res, 'Project Details not found');
    }

    GalleryDetails1.isDelete = !GalleryDetails1.isDelete;
    await GalleryDetails1.save();

    return apiResponse.successResponseWithData(res, 'Project Details delete status updated successfully', GalleryDetails1);
  } catch (error) {
    console.error('Toggle Project Details delete status failed', error);
    return apiResponse.ErrorResponse(res, 'Toggle Project Details delete status failed');
  }
};
