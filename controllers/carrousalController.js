const Carrousal = require("../models/Carrousal");
const apiResponse = require("../helper/apiResponse");
const { validationResult } = require('express-validator');

exports.addCarrousal = async (req, res) => {
  try {
    if (!req.file) {
      return apiResponse.ErrorResponse(res, "Image is required");
    }

    const img = req.file.path;
    const { title } = req.body; // Get title from request body

    const carrousal = await Carrousal.create({
      img,
      title,
      isActive: true,
      isDelete: false,
    });

    return apiResponse.successResponseWithData(
      res,
      "Carrousal added successfully",
      carrousal
    );
  } catch (error) {
    console.error("Add carrousal failed", error);
    return apiResponse.ErrorResponse(res, "Add carrousal failed");
  }
};

exports.updateCarrousal = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return apiResponse.ErrorResponse(res, errors.array().map(err => err.msg).join(', '));
  }

  try {
    const { id } = req.params;
    const img = req.file ? req.file.path : null; // Handle file upload
    const { title } = req.body; // Get title from request body

    const carrousal = await Carrousal.findByPk(id);
    if (!carrousal) {
      return apiResponse.notFoundResponse(res, 'Carrousal not found');
    }

    // Update the image and title only if new ones are provided
    carrousal.img = img || carrousal.img;
    carrousal.title = title || carrousal.title;
    await carrousal.save();

    return apiResponse.successResponseWithData(
      res,
      'Carrousal updated successfully',
      carrousal
    );
  } catch (error) {
    console.error('Update carrousal failed', error);
    return apiResponse.ErrorResponse(res, `Update carrousal failed: ${error.message}`);
  }
};

exports.getCarrousals = async (req, res) => {
  try {
    const carrousals = await Carrousal.findAll({ where: { isDelete: false } });

    // Base URL for images
    const baseUrl = `${process.env.SERVER_PATH}`;

    const carrousalsWithBaseUrl = carrousals.map((carrousal) => {
      return {
        ...carrousal.toJSON(),
        img: carrousal.img ? baseUrl + carrousal.img.replace(/\\/g, "/") : null,
      };
    });

    return apiResponse.successResponseWithData(
      res,
      "Carrousals retrieved successfully",
      carrousalsWithBaseUrl
    );
  } catch (error) {
    console.error("Get carrousals failed", error);
    return apiResponse.ErrorResponse(res, "Get carrousals failed");
  }
};

exports.toggleCarrousalStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const carrousal = await Carrousal.findByPk(id);

    if (!carrousal) {
      return apiResponse.notFoundResponse(res, "Carrousal not found");
    }

    carrousal.isActive = !carrousal.isActive;
    await carrousal.save();

    return apiResponse.successResponseWithData(
      res,
      "Carrousal status updated successfully",
      carrousal
    );
  } catch (error) {
    console.error("Toggle carrousal status failed", error);
    return apiResponse.ErrorResponse(res, "Toggle carrousal status failed");
  }
};

exports.toggleCarrousalDelete = async (req, res) => {
  try {
    const { id } = req.params;
    const carrousal = await Carrousal.findByPk(id);

    if (!carrousal) {
      return apiResponse.notFoundResponse(res, "Carrousal not found");
    }

    carrousal.isDelete = !carrousal.isDelete;
    await carrousal.save();

    return apiResponse.successResponseWithData(
      res,
      "Carrousal delete status updated successfully",
      carrousal
    );
  } catch (error) {
    console.error("Toggle carrousal delete status failed", error);
    return apiResponse.ErrorResponse(
      res,
      "Toggle carrousal delete status failed"
    );
  }
};
