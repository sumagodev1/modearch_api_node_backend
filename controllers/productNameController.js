const ProductName = require('../models/ProductName');
const apiResponse = require('../helper/apiResponse');

exports.addProductName = async (req, res) => {
  try {
    const { productName } = req.body;

    const product = await ProductName.create({ productName, isActive: true, isDelete: false });
    return apiResponse.successResponseWithData(res, 'Product name added successfully', product);
  } catch (error) {
    console.error('Add product name failed', error);
    return apiResponse.ErrorResponse(res, 'Add product name failed');
  }
};

exports.getProductNames = async (req, res) => {
  try {
    const products = await ProductName.findAll({ where: { isDelete: false } });
    return apiResponse.successResponseWithData(res, 'Product names retrieved successfully', products);
  } catch (error) {
    console.error('Get product names failed', error);
    return apiResponse.ErrorResponse(res, 'Get product names failed');
  }
};

exports.updateProductName = async (req, res) => {
  try {
    const { id } = req.params;
    const { productName } = req.body;

    const product = await ProductName.findByPk(id);
    if (!product) {
      return apiResponse.notFoundResponse(res, 'Product name not found');
    }

    product.productName = productName;
    await product.save();

    return apiResponse.successResponseWithData(res, 'Product name updated successfully', product);
  } catch (error) {
    console.error('Update product name failed', error);
    return apiResponse.ErrorResponse(res, 'Update product name failed');
  }
};

exports.isActiveStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await ProductName.findByPk(id);

    if (!product) {
      return apiResponse.notFoundResponse(res, 'Product name not found');
    }

    product.isActive = !product.isActive;
    await product.save();

    return apiResponse.successResponseWithData(res, 'Product name status updated successfully', product);
  } catch (error) {
    console.error('Toggle product name status failed', error);
    return apiResponse.ErrorResponse(res, 'Toggle product name status failed');
  }
};

exports.isDeleteStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await ProductName.findByPk(id);

    if (!product) {
      return apiResponse.notFoundResponse(res, 'Product name not found');
    }

    product.isDelete = !product.isDelete;
    await product.save();

    return apiResponse.successResponseWithData(res, 'Product name delete status updated successfully', product);
  } catch (error) {
    console.error('Toggle product name delete status failed', error);
    return apiResponse.ErrorResponse(res, 'Toggle product name delete status failed');
  }
};
