// controllers/OueleadersController.js
const Oueleader = require('../models/Ourleaders')
const apiResponse = require('../helper/apiResponse');
const { validationResult } = require('express-validator');

exports.addOueleaders = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return apiResponse.ErrorResponse(res, errors.array().map(err => err.msg).join(', '));
  }

  try {
    const { name, designation, longtext, linkedin, facebbok, instagram } = req.body;
    const img = req.file ? req.file.path : null;

    const Oueleaders = await Oueleader.create({
      name,
      img,
      designation, longtext, linkedin, facebbok, instagram,
      isActive: true,
      isDelete: false,
    });

    return apiResponse.successResponseWithData(
      res,
      'Oueleaders added successfully',
      Oueleaders
    );
  } catch (error) {
    console.error('Add Oueleaders failed', error);
    return apiResponse.ErrorResponse(res, 'Add Oueleaders failed');
  }
};

exports.updateOueleaders = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return apiResponse.ErrorResponse(res, errors.array().map(err => err.msg).join(', '));
  }

  try {
    const { id } = req.params;
    const { name, designation, longtext, linkedin, facebbok, instagram } = req.body;
    const img = req.file ? req.file.path : null;

    const Oueleaders = await Oueleader.findByPk(id);
    if (!Oueleaders) {
      return apiResponse.notFoundResponse(res, 'Oueleaders not found');
    }

    Oueleaders.img = img || Oueleaders.img;
    Oueleaders.name = name;
    Oueleaders.designation = designation;
    Oueleaders.facebbok = facebbok;
    Oueleaders.linkedin = linkedin;
    Oueleaders.longtext = longtext;
    Oueleaders.facebbok = facebbok;
    Oueleaders.instagram = instagram;
    await Oueleaders.save();

    return apiResponse.successResponseWithData(
      res,
      'Oueleaders updated successfully',
      Oueleaders
    );
  } catch (error) {
    console.error('Update Oueleaders failed', error);
    return apiResponse.ErrorResponse(res, 'Update Oueleaders failed');
  }
};

exports.getOueleaderss = async (req, res) => {
  try {
    const Oueleaderss = await Oueleaders.findAll({ where: { isDelete: false } });

    const baseUrl = `${process.env.SERVER_PATH}`;
    const OueleaderssWithBaseUrl = Oueleaderss.map(Oueleaders => ({
      ...Oueleaders.toJSON(),
      img: Oueleaders.img ? baseUrl + Oueleaders.img.replace(/\\/g, '/') : null,
    }));

    return apiResponse.successResponseWithData(
      res,
      'Oueleaderss retrieved successfully',
      OueleaderssWithBaseUrl
    );
  } catch (error) {
    console.error('Get Oueleaderss failed', error);
    return apiResponse.ErrorResponse(res, 'Get Oueleaderss failed');
  }
};

exports.isActiveStatusOueleaders = async (req, res) => {
  try {
    const { id } = req.params;
    const Oueleaders = await Oueleader.findByPk(id);

    if (!Oueleaders) {
      return apiResponse.notFoundResponse(res, 'Oueleaders not found');
    }

    Oueleaders.isActive = !Oueleaders.isActive;
    await Oueleaders.save();

    return apiResponse.successResponseWithData(
      res,
      'Oueleaders active status updated successfully',
      Oueleaders
    );
  } catch (error) {
    console.error('Toggle Oueleaders active status failed', error);
    return apiResponse.ErrorResponse(res, 'Toggle Oueleaders active status failed');
  }
};

exports.isDeleteStatusOueleaders = async (req, res) => {
  try {
    const { id } = req.params;
    const Oueleaders = await Oueleader.findByPk(id);

    if (!Oueleaders) {
      return apiResponse.notFoundResponse(res, 'Oueleaders not found');
    }

    Oueleaders.isDelete = !Oueleader.isDelete;
    await Oueleaders.save();

    return apiResponse.successResponseWithData(
      res,
      'Oueleaders delete status updated successfully',
      Oueleaders
    );
  } catch (error) {
    console.error('Toggle Oueleaders delete status failed', error);
    return apiResponse.ErrorResponse(res, 'Toggle Oueleaders delete status failed');
  }
};
