const apiResponse = require('../helper/apiResponse');
const GalleryDetails = require('../models/GalleryDetails')

exports.addGalleryDetails = async (req, res) => {
  try {
    const { gallery_category, desc } = req.body;

    const existinggallery_category = await GalleryDetails.findOne({ gallery_category });
    if (existinggallery_category) {
      return apiResponse.ErrorResponse(res, "Gallery category already exists");
    }

    const img = req.file ? req.file.path : null;

    const GalleryDetails1 = await GalleryDetails.create({ img, gallery_category, isActive: true, isDelete: false });
    return apiResponse.successResponseWithData(res, 'Gallery category added successfully', GalleryDetails1);
  } catch (error) {
    console.error('Add gallery category failed', error);
    return apiResponse.ErrorResponse(res, 'Add gallery category failed');
  }
};

exports.updateGalleryDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const { gallery_category, desc } = req.body;
    const img = req.file ? req.file.path : null;

    const GalleryDetails1 = await GalleryDetails.findByPk(id);
    if (!GalleryDetails1) {
      return apiResponse.notFoundResponse(res, 'Gallery category not found');
    }

        // Check if another category already has the same title
        const existinggallery_category = await GalleryDetails.findOne({ where: { gallery_category } });
        if (existinggallery_category && existinggallery_category.id !== parseInt(id)) {
          return apiResponse.validationErrorWithData(
            res,
            "Gallery category already exists",
            {}
          );
        }

    GalleryDetails1.img = img || GalleryDetails1.img;
    GalleryDetails1.gallery_category = gallery_category;
    await GalleryDetails1.save();

    return apiResponse.successResponseWithData(res, 'Gallery category updated successfully', GalleryDetails1);
  } catch (error) {
    console.error('Update gallery category failed', error);
    return apiResponse.ErrorResponse(res, 'Update gallery category failed');
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

    return apiResponse.successResponseWithData(res, 'Gallery category retrieved successfully', GalleryDetailsWithBaseUrl);
  } catch (error) {
    console.error('Get Gallery category failed', error);
    return apiResponse.ErrorResponse(res, 'Get Gallery category failed');
  }
};

exports.isActiveStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const GalleryDetails1 = await GalleryDetails.findByPk(id);

    if (!GalleryDetails1) {
      return apiResponse.notFoundResponse(res, 'Gallery category not found');
    }

    GalleryDetails1.isActive = !GalleryDetails1.isActive;
    await GalleryDetails1.save();

    return apiResponse.successResponseWithData(res, 'Gallery category status updated successfully', GalleryDetails1);
  } catch (error) {
    console.error('Toggle Gallery category status failed', error);
    return apiResponse.ErrorResponse(res, 'Toggle Gallery category status failed');
  }
};

exports.isDeleteStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const GalleryDetails1 = await GalleryDetails.findByPk(id);

    if (!GalleryDetails1) {
      return apiResponse.notFoundResponse(res, 'Gallery category not found');
    }

    GalleryDetails1.isDelete = !GalleryDetails1.isDelete;
    await GalleryDetails1.save();

    return apiResponse.successResponseWithData(res, 'Gallery category delete status updated successfully', GalleryDetails1);
  } catch (error) {
    console.error('Toggle Gallery category delete status failed', error);
    return apiResponse.ErrorResponse(res, 'Toggle Gallery category delete status failed');
  }
};
