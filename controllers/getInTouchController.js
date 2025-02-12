const GetInTouch = require('../models/GetInTouch');
const apiResponse = require('../helper/apiResponse');

exports.addGetInTouch = async (req, res) => {
  try {
    const { name, email, subject, message, phone } = req.body;

    const getInTouch = await GetInTouch.create({ name, email, subject, message, phone });
    return apiResponse.successResponseWithData(res, 'Get In Touch added successfully', getInTouch);
  } catch (error) {
    console.error('Add Get In Touch failed', error);
    return apiResponse.ErrorResponse(res, 'Add Get In Touch failed');
  }
};

exports.getGetInTouches = async (req, res) => {
  try {
    const getInTouches = await GetInTouch.findAll({ where: { isDelete: false } });
    return apiResponse.successResponseWithData(res, 'Get In Touch records retrieved successfully', getInTouches);
  } catch (error) {
    console.error('Get Get In Touch records failed', error);
    return apiResponse.ErrorResponse(res, 'Get Get In Touch records failed');
  }
};

exports.updateGetInTouch = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, subject, message, phone } = req.body;

    const getInTouch = await GetInTouch.findByPk(id);
    if (!getInTouch) {
      return apiResponse.notFoundResponse(res, 'Get In Touch record not found');
    }

    getInTouch.name = name;
    getInTouch.email = email;
    getInTouch.subject = subject;
    getInTouch.message = message;
    getInTouch.phone = phone;
    await getInTouch.save();

    return apiResponse.successResponseWithData(res, 'Get In Touch record updated successfully', getInTouch);
  } catch (error) {
    console.error('Update Get In Touch record failed', error);
    return apiResponse.ErrorResponse(res, 'Update Get In Touch record failed');
  }
};

exports.deleteGetInTouch = async (req, res) => {
  try {
    const { id } = req.params;
    const getInTouch = await GetInTouch.findByPk(id);

    if (!getInTouch) {
      return apiResponse.notFoundResponse(res, 'Get In Touch record not found');
    }

    getInTouch.isDelete = true;
    await getInTouch.save();

    return apiResponse.successResponseWithData(res, 'Get In Touch record deleted successfully', getInTouch);
  } catch (error) {
    console.error('Delete Get In Touch record failed', error);
    return apiResponse.ErrorResponse(res, 'Delete Get In Touch record failed');
  }
};
