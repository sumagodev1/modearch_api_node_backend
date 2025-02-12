// controllers/optionsDataController.js
const OptionsData = require("../models/OptionsData");
const apiResponse = require("../helper/apiResponse");
const ProductDetails = require('../models/ProductDetails');

exports.addOptionsData = async (req, res) => {
  try {
    const { productName, optionsDescription } = req.body;
    const product = await ProductDetails.findOne({ where: { productName } });
    if (!product) {
      return apiResponse.notFoundResponse(res, "Product not found");
    }
    const optionsData = await OptionsData.create({
      productId: product.id,
      optionsDescription,
      productName
    });

    return apiResponse.successResponseWithData(
      res,
      "Options data added successfully",
      optionsData
    );
  } catch (error) {
    console.error("Add options data failed", error);
    return apiResponse.ErrorResponse(res, "Add options data failed");
  }
};

exports.updateOptionsData = async (req, res) => {
  try {
    const { id } = req.params;
    const { optionsDescription } = req.body;

    const optionsData = await OptionsData.findByPk(id);
    if (!optionsData) {
      return apiResponse.notFoundResponse(res, "Options data not found");
    }

    optionsData.optionsDescription = optionsDescription;
    await optionsData.save();

    return apiResponse.successResponseWithData(
      res,
      "Options data updated successfully",
      optionsData
    );
  } catch (error) {
    console.error("Update options data failed", error);
    return apiResponse.ErrorResponse(res, "Update options data failed");
  }
};

exports.getOptionsData = async (req, res) => {
  try {
    const optionsData = await OptionsData.findAll();

    return apiResponse.successResponseWithData(
      res,
      "Options data retrieved successfully",
      optionsData
    );
  } catch (error) {
    console.error("Get options data failed", error);
    return apiResponse.ErrorResponse(res, "Get options data failed");
  }
};
exports.deleteOptionsData = async (req, res) => {
  try {
    const { id } = req.params;

    const optionsData = await OptionsData.findByPk(id);
    if (!optionsData) {
      return apiResponse.notFoundResponse(res, "Options data not found");
    }

    await optionsData.destroy();

    return apiResponse.successResponse(res, "Options data deleted successfully");
  } catch (error) {
    console.error("Delete options data failed", error);
    return apiResponse.ErrorResponse(res, "Delete options data failed");
  }
};