const applicationData = require("../models/ApplicationsData");
const apiResponse = require("../helper/apiResponse");
const ProductDetails = require('../models/ProductDetails');

exports.addApplicationData = async (req, res) => {
  try {
    const { productName, applicationDescription } = req.body;
    const product = await ProductDetails.findOne({ where: { productName } });
    if (!product) {
      return apiResponse.notFoundResponse(res, "Product not found");
    }
    const ApplicationData = await applicationData.create({
      productId: product.id,
      applicationDescription,
      productName
    });

    return apiResponse.successResponseWithData(
      res,
      "Application data added successfully",
      ApplicationData
    );
  } catch (error) {
    console.error("Add Application data failed", error);
    return apiResponse.ErrorResponse(res, "Add Application data failed");
  }
};

exports.updateApplicationData = async (req, res) => {
  try {
    const { id } = req.params;
    const { applicationDescription } = req.body;

    const ApplicationData = await applicationData.findByPk(id);
    if (!ApplicationData) {
      return apiResponse.notFoundResponse(res, "Application data not found");
    }

    ApplicationData.applicationDescription = applicationDescription;
    await ApplicationData.save();

    return apiResponse.successResponseWithData(
      res,
      "Application data updated successfully",
      ApplicationData
    );
  } catch (error) {
    console.error("Update Application data failed", error);
    return apiResponse.ErrorResponse(res, "Update Application data failed");
  }
};

exports.getApplicationData = async (req, res) => {
  try {
    const ApplicationData = await applicationData.findAll();

    return apiResponse.successResponseWithData(
      res,
      "Application data retrieved successfully",
      ApplicationData
    );
  } catch (error) {
    console.error("Get Application data failed", error);
    return apiResponse.ErrorResponse(res, "Get Application data failed");
  }
};

exports.deleteApplicationData = async (req, res) => {
  try {
    const { id } = req.params;

    const ApplicationData = await applicationData.findByPk(id);
    if (!ApplicationData) {
      return apiResponse.notFoundResponse(res, "Application data not found");
    }

    await ApplicationData.destroy();

    return apiResponse.successResponse(res, "Application data deleted successfully");
  } catch (error) {
    console.error("Delete Application data failed", error);
    return apiResponse.ErrorResponse(res, "Delete Application data failed");
  }
};
