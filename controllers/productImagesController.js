// controllers/productImagesController.js

const ProductImages = require('../models/ProductImage');
const ProductDetails = require('../models/ProductDetails');
const apiResponse = require('../helper/apiResponse');
const { validationResult } = require('express-validator');

exports.addProductImage = async (req, res) => {
    // Validate request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return apiResponse.ErrorResponse(res, errors.array().map(err => err.msg).join(', '));
    }
  
    try {
      const { productName } = req.body;
      const img = req.file ? req.file.path : null; // If using file upload
  
      // Validate img field
      if (!img) {
        return apiResponse.validationErrorWithData(res, "Image URL cannot be null", null);
      }
  
      // Find product by productName
      const product = await ProductDetails.findOne({ where: { productName } });
      if (!product) {
        return apiResponse.notFoundResponse(res, "Product not found");
      }
  
      // Create new product image entry
      const productImage = await ProductImages.create({
        ProductDetailId: product.id,
        img,
        productName
      });
  
      return apiResponse.successResponseWithData(
        res,
        "Product image added successfully",
        productImage
      );
    } catch (error) {
      console.error("Add product image failed", error);
      return apiResponse.ErrorResponse(res, "Add product image failed");
    }
  };


  exports.updateProductImage = async (req, res) => {
    // Validate request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return apiResponse.ErrorResponse(res, errors.array().map(err => err.msg).join(', '));
    }
  
    try {
      const { id } = req.params;
      const { productName } = req.body;
      const img = req.file ? req.file.path : null;
  
      const productImage = await ProductImages.findByPk(id);
      if (!productImage) {
        return apiResponse.notFoundResponse(res, "Product image not found");
      }
  
      productImage.img = img || productImage.img;
      productImage.productName = productName;
      await productImage.save();
  
      return apiResponse.successResponseWithData(
        res,
        "Product image updated successfully",
        productImage
      );
    } catch (error) {
      console.error("Update product image failed", error);
      return apiResponse.ErrorResponse(res, "Update product image failed");
    }
  };

exports.getProductImages = async (req, res) => {
  try {
    const baseUrl = `${process.env.SERVER_PATH}`;
        const productImages = await ProductImages.findAll();

        // Map productImages to prepend base URL to img field
        const imagesWithBaseUrl = productImages.map(image => ({
          id: image.id,
          img: baseUrl + image.img,
          ProductDetailId: image.ProductDetailId,
          productName: image.productName,
          createdAt: image.createdAt,
          updatedAt: image.updatedAt
        }));

    return apiResponse.successResponseWithData(
      res,
      "Product images retrieved successfully",
      imagesWithBaseUrl
    );
  } catch (error) {
    console.error("Get product images failed", error);
    return apiResponse.ErrorResponse(res, "Get product images failed");
  }
};

exports.deleteProductImage = async (req, res) => {
  try {
    const { id } = req.params;

    const productImage = await ProductImages.findByPk(id);
    if (!productImage) {
      return apiResponse.notFoundResponse(res, "Product image not found");
    }

    await productImage.destroy();

    return apiResponse.successResponse(res, "Product image deleted successfully");
  } catch (error) {
    console.error("Delete product image failed", error);
    return apiResponse.ErrorResponse(res, "Delete product image failed");
  }
};
