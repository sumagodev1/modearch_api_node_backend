// controllers/materialDataController.js
const ProductDetails = require('../models/ProductDetails');
const MaterialData = require('../models/MaterialData');
const apiResponse = require('../helper/apiResponse');

exports.addMaterialData = async (req, res) => {
  try {
    const { productName, materialDescription } = req.body;

    // Find the product by productName
    const product = await ProductDetails.findOne({ where: { productName } });
    if (!product) {
      return apiResponse.notFoundResponse(res, 'Product not found');
    }

    const materialData = await MaterialData.create({
      productId: product.id,
      productName,
      materialDescription,
    });

    return apiResponse.successResponseWithData(
      res,
      'Material data added successfully',
      materialData
    );
  } catch (error) {
    console.error('Add material data failed', error);
    return apiResponse.ErrorResponse(res, 'Add material data failed');
  }
};



exports.updateMaterialData = async (req, res) => {
  try {
    const { id } = req.params;
    const { materialDescription } = req.body;

    const materialData = await MaterialData.findByPk(id);
    if (!materialData) {
      return apiResponse.notFoundResponse(res, 'Material data not found');
    }

    materialData.materialDescription = materialDescription;
    await materialData.save();

    return apiResponse.successResponseWithData(
      res,
      'Material data updated successfully',
      materialData
    );
  } catch (error) {
    console.error('Update material data failed', error);
    return apiResponse.ErrorResponse(res, 'Update material data failed');
  }
};

exports.getMaterialData = async (req, res) => {
  try {
    const materialData = await MaterialData.findAll();

    return apiResponse.successResponseWithData(
      res,
      'Material data retrieved successfully',
      materialData
    );
  } catch (error) {
    console.error('Get material data failed', error);
    return apiResponse.ErrorResponse(res, 'Get material data failed');
  }
};


exports.deleteMaterialData = async (req, res) => {
  try {
    const { id } = req.params;

    // Find the material data entry by ID
    const materialData = await MaterialData.findByPk(id);
    if (!materialData) {
      return apiResponse.notFoundResponse(res, 'Material data not found');
    }

    // Delete the material data entry
    await materialData.destroy();

    return apiResponse.successResponse(
      res,
      'Material data deleted successfully'
    );
  } catch (error) {
    console.error('Delete material data failed', error);
    return apiResponse.ErrorResponse(res, 'Delete material data failed');
  }
};
