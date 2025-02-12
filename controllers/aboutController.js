const About = require('../models/About');
const apiResponse = require('../helper/apiResponse');

// Add About
exports.addAbout = async (req, res) => {
  try {
    const { description } = req.body;
    const img = req.file ? req.file.path : null;

    const about = await About.create({ description, img, isActive: true, isDelete: false });
    return apiResponse.successResponseWithData(res, 'About section added successfully', about);
  } catch (error) {
    console.error('Add about section failed', error);
    return apiResponse.ErrorResponse(res, 'Add about section failed');
  }
};

// Update About
exports.updateAbout = async (req, res) => {
  try {
    const { id } = req.params;
    const { description } = req.body;
    const img = req.file ? req.file.path : null;

    const about = await About.findByPk(id);
    if (!about) {
      return apiResponse.notFoundResponse(res, 'About section not found');
    }

    about.description = description;
    about.img = img || about.img;
    await about.save();

    return apiResponse.successResponseWithData(res, 'About section updated successfully', about);
  } catch (error) {
    console.error('Update about section failed', error);
    return apiResponse.ErrorResponse(res, 'Update about section failed');
  }
};

// Get About Entries (Only fetch active and non-deleted entries)
exports.getAbout = async (req, res) => {
  try {
    const aboutSections = await About.findAll({ where: { isDelete: false } });

    const baseUrl = `${process.env.SERVER_PATH}`;
    const aboutWithBaseUrl = aboutSections.map(section => {
      return {
        ...section.toJSON(),
        img: section.img ? baseUrl + section.img.replace(/\\/g, '/') : null
      };
    });

    return apiResponse.successResponseWithData(res, 'About sections retrieved successfully', aboutWithBaseUrl);
  } catch (error) {
    console.error('Get about sections failed', error);
    return apiResponse.ErrorResponse(res, 'Get about sections failed');
  }
};

// Toggle Active Status
exports.toggleAboutStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const about = await About.findByPk(id);

    if (!about) {
      return apiResponse.notFoundResponse(res, 'About section not found');
    }

    about.isActive = !about.isActive; // Toggle active status
    await about.save();

    return apiResponse.successResponseWithData(res, 'About section status updated successfully', about);
  } catch (error) {
    console.error('Toggle about section status failed', error);
    return apiResponse.ErrorResponse(res, 'Toggle about section status failed');
  }
};

// Soft Delete About (Toggle the isDelete flag)
exports.toggleAboutDelete = async (req, res) => {
  try {
    const { id } = req.params;

    const about = await About.findByPk(id);
    if (!about) {
      return apiResponse.notFoundResponse(res, 'About section not found');
    }

    about.isDelete = !about.isDelete; // Toggle the delete status
    await about.save();

    return apiResponse.successResponseWithData(res, 'About section delete status updated successfully', about);
  } catch (error) {
    console.error('Toggle about section delete status failed', error);
    return apiResponse.ErrorResponse(res, 'Toggle about section delete status failed');
  }
};
