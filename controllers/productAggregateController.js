// controllers/productAggregateController.js
const ProductDetails = require('../models/ProductDetails');
const OptionsData = require('../models/OptionsData');
const TechnicalData = require('../models/TechnicalData');
const MaterialData = require('../models/MaterialData');
const ApplicationData = require('../models/ApplicationsData');
const ProductImages = require('../models/ProductImage');
const apiResponse = require('../helper/apiResponse');
const sequelize = require('../config/database');

exports.getAllProductData = async (req, res) => {
  try {
    const { productId } = req.params;

    // Fetch product details with images
    const productDetails = await ProductDetails.findByPk(productId, {
      include: [{
        model: ProductImages,
        as: 'images'
      }]
    });

    if (!productDetails) {
      return apiResponse.notFoundResponse(res, 'Product not found');
    }

    // Fetch related data
    const optionsData = await OptionsData.findAll({ where: { productId } });
    const technicalData = await TechnicalData.findAll({ where: { productId } });
    const materialData = await MaterialData.findAll({ where: { productId } });
    const applicationData = await ApplicationData.findAll({ where: { productId } });

    // Aggregate all data
    const allProductData = {
      productDetails,
      optionsData,
      technicalData,
      materialData,
      applicationData
    };

    return apiResponse.successResponseWithData(
      res,
      'Product data retrieved successfully',
      allProductData
    );
  } catch (error) {
    console.error('Get all product data failed', error);
    return apiResponse.ErrorResponse(res, 'Get all product data failed');
  }
};

exports.deleteProductAndData = async (req, res) => {
  const transaction = await sequelize.transaction(); // Using a transaction to ensure atomicity

  try {
    const { productId } = req.params;

    // Fetch product details
    const productDetails = await ProductDetails.findByPk(productId);
    if (!productDetails) {
      return apiResponse.notFoundResponse(res, 'Product not found');
    }

    // Delete associated data
    await OptionsData.destroy({ where: { productId }, transaction });
    await TechnicalData.destroy({ where: { productId }, transaction });
    await MaterialData.destroy({ where: { productId }, transaction });
    await ApplicationData.destroy({ where: { productId }, transaction });
    await ProductImages.destroy({ where: {ProductDetailId: productId }, transaction });

    // Delete the product
    await ProductDetails.destroy({ where: { id: productId }, transaction });

    // Commit transaction
    await transaction.commit();

    return apiResponse.successResponse(res, 'Product and associated data deleted successfully');
  } catch (error) {
    // Rollback transaction in case of error
    await transaction.rollback();
    console.error('Delete product and data failed', error);
    return apiResponse.ErrorResponse(res, 'Delete product and data failed');
  }
};
exports.toggleActiveStatusForAll = async (req, res) => {
  const transaction = await sequelize.transaction(); // Using a transaction to ensure atomicity

  try {
    const { id } = req.params;
    
    // Fetch product details
    const productDetails = await ProductDetails.findByPk(id);
    if (!productDetails) {
      return apiResponse.notFoundResponse(res, 'Product details not found');
    }

    // Toggle the isActive status for the product
    productDetails.isActive = !productDetails.isActive;
    await productDetails.save({ transaction });

    // Toggle the isActive status for all related data
    await OptionsData.update(
      { isActive: productDetails.isActive },
      { where: { productId: id }, transaction }
    );
    await TechnicalData.update(
      { isActive: productDetails.isActive },
      { where: { productId: id }, transaction }
    );
    await MaterialData.update(
      { isActive: productDetails.isActive },
      { where: { productId: id }, transaction }
    );
    await ApplicationData.update(
      { isActive: productDetails.isActive },
      { where: { productId: id }, transaction }
    );

    // Commit transaction
    await transaction.commit();

    return apiResponse.successResponseWithData(
      res,
      'Product and associated data active status updated successfully',
      productDetails
    );
  } catch (error) {
    // Rollback transaction in case of error
    await transaction.rollback();
    console.error('Toggle product and associated data active status failed', error);
    return apiResponse.ErrorResponse(res, 'Toggle product and associated data active status failed');
  }
};
exports.toggleDeleteStatusForAll = async (req, res) => {
  const transaction = await sequelize.transaction(); // Using a transaction to ensure atomicity

  try {
    const { id } = req.params;

    // Fetch product details
    const productDetails = await ProductDetails.findByPk(id);
    if (!productDetails) {
      return apiResponse.notFoundResponse(res, 'Product details not found');
    }

    // Toggle the isDelete status for the product
    productDetails.isDelete = !productDetails.isDelete;
    await productDetails.save({ transaction });

    // Toggle the isDelete status for all related data
    await OptionsData.update(
      { isDelete: productDetails.isDelete },
      { where: { productId: id }, transaction }
    );
    await TechnicalData.update(
      { isDelete: productDetails.isDelete },
      { where: { productId: id }, transaction }
    );
    await MaterialData.update(
      { isDelete: productDetails.isDelete },
      { where: { productId: id }, transaction }
    );
    await ApplicationData.update(
      { isDelete: productDetails.isDelete },
      { where: { productId: id }, transaction }
    );

    // Commit transaction
    await transaction.commit();

    return apiResponse.successResponseWithData(
      res,
      'Product and associated data delete status updated successfully',
      productDetails
    );
  } catch (error) {
    // Rollback transaction in case of error
    await transaction.rollback();
    console.error('Toggle product and associated data delete status failed', error);
    return apiResponse.ErrorResponse(res, 'Toggle product and associated data delete status failed');
  }
};