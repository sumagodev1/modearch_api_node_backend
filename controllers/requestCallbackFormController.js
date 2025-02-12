const RequestCallbackForm = require('../models/RequestCallbackForm');
const apiResponse = require('../helper/apiResponse');

exports.addRequestCallbackForm = async (req, res) => {
  try {
    const { name, email, message } = req.body;

    const requestCallbackForm = await RequestCallbackForm.create({ name, email, message });
    return apiResponse.successResponseWithData(res, 'Request Callback Form added successfully', requestCallbackForm);
  } catch (error) {
    console.error('Add request callback form failed', error);
    return apiResponse.ErrorResponse(res, 'Add request callback form failed');
  }
};

exports.getRequestCallbackForms = async (req, res) => {
  try {
    const requestCallbackForms = await RequestCallbackForm.findAll({ where: { isDelete: false } });
    return apiResponse.successResponseWithData(res, 'Request Callback Forms retrieved successfully', requestCallbackForms);
  } catch (error) {
    console.error('Get request callback forms failed', error);
    return apiResponse.ErrorResponse(res, 'Get request callback forms failed');
  }
};

exports.updateRequestCallbackForm = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, message } = req.body;

    const requestCallbackForm = await RequestCallbackForm.findByPk(id);
    if (!requestCallbackForm) {
      return apiResponse.notFoundResponse(res, 'Request Callback Form not found');
    }

    requestCallbackForm.name = name;
    requestCallbackForm.email = email;
    requestCallbackForm.message = message;
    await requestCallbackForm.save();

    return apiResponse.successResponseWithData(res, 'Request Callback Form updated successfully', requestCallbackForm);
  } catch (error) {
    console.error('Update request callback form failed', error);
    return apiResponse.ErrorResponse(res, 'Update request callback form failed');
  }
};

exports.deleteRequestCallbackForm = async (req, res) => {
  try {
    const { id } = req.params;
    const requestCallbackForm = await RequestCallbackForm.findByPk(id);

    if (!requestCallbackForm) {
      return apiResponse.notFoundResponse(res, 'Request Callback Form not found');
    }

    requestCallbackForm.isDelete = true;
    await requestCallbackForm.save();

    return apiResponse.successResponseWithData(res, 'Request Callback Form deleted successfully', requestCallbackForm);
  } catch (error) {
    console.error('Delete request callback form failed', error);
    return apiResponse.ErrorResponse(res, 'Delete request callback form failed');
  }
};
