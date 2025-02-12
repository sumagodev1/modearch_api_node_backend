// controllers/productDetailsController.js
const { Op } = require('sequelize'); // Import Op from Sequelize

const ProductDetails = require('../models/ProductDetails');
const ProductImages = require('../models/ProductImage');
const apiResponse = require('../helper/apiResponse');
// exports.addProductDetails = async (req, res) => {
//   try {
//     console.log(req.body); // Log the body to check the incoming data
//     const { productName, application } = req.body;
//     const images = req.files ? req.files.map(file => file.path) : [];

//     const productDetails = await ProductDetails.create({
//       productName,
//       application,
//       isActive: true,
//       isDelete: false,
//     });

//     // Create ProductImages entries for each image with the correct foreign key
//     const createdImages = await Promise.all(images.map(img => {
//       return ProductImages.create({ 
//         img, 
//         ProductDetailId: productDetails.id,
//         productName // Set the foreign key
//       });
//     }));

//     productDetails.setDataValue('images', createdImages); // Attach images to productDetails

//     return apiResponse.successResponseWithData(
//       res,
//       'Product details added successfully',
//       productDetails
//     );
//   } catch (error) {
//     console.error('Add product details failed', error);
//     return apiResponse.ErrorResponse(res, 'Add product details failed');
//   }
// };

exports.addProductDetails = async (req, res) => {
  try {
    console.log(req.body); // Log the body to check the incoming data
    const { productName, slug, application } = req.body;
    const images = req.files ? req.files.map(file => file.path) : [];

    // Create the product details entry
    const productDetails = await ProductDetails.create({
      productName,
      slug,
      application,
      isActive: true,
      isDelete: false,
    });

    let createdImages = [];

    // Only create ProductImages if there are images to associate
    if (images.length > 0) {
      createdImages = await Promise.all(images.map(img => {
        return ProductImages.create({ 
          img, 
          ProductDetailId: productDetails.id,
        });
      }));
    }

    // Attach images to productDetails (if any)
    productDetails.setDataValue('images', createdImages);

    return apiResponse.successResponseWithData(
      res,
      'Product details added successfully',
      productDetails
    );
  } catch (error) {
    console.error('Add product details failed', error);

    if (error.name === 'SequelizeUniqueConstraintError') {
      return apiResponse.ErrorResponse(res, 'Duplicate entry: Product details already exist');
    }

    return apiResponse.ErrorResponse(res, 'Add product details failed');
  }
};


exports.getAllProductDetails = async (req, res) => {
  try {
    const baseUrl = `${process.env.SERVER_PATH}`;
        const productDetails = await ProductDetails.findAll({
      include: [{
        model: ProductImages,
        as: 'images'
      }]
    });

    productDetails.forEach(product => {
      product.images.forEach(image => {
        image.img = baseUrl + image.img;
      });
    });

    return apiResponse.successResponseWithData(
      res,
      'Product details retrieved successfully',
      productDetails
    );
  } catch (error) {
    console.error('Get all product details failed', error);
    return apiResponse.ErrorResponse(res, 'Get all product details failed');
  }
};
// exports.updateProductDetails = async (req, res) => {
//   try {
//     const { productId } = req.params;
//     const { productName, application } = req.body;
//     const images = req.files ? req.files.map(file => file.path) : [];

//     // Find the product by primary key
//     const productDetails = await ProductDetails.findByPk(productId);
//     if (!productDetails) {
//       return apiResponse.notFoundResponse(res, 'Product not found');
//     }

//     // Update product details
//     productDetails.productName = productName || productDetails.productName;
//     productDetails.application = application || productDetails.application;
//     productDetails.isActive = req.body.isActive !== undefined ? req.body.isActive : productDetails.isActive;
//     productDetails.isDelete = req.body.isDelete !== undefined ? req.body.isDelete : productDetails.isDelete;
//     await productDetails.save();

//     // Handle images
//     // Remove existing images if not provided in the new request
//     if (images.length > 0) {
//       // Find existing images
//       const existingImages = await ProductImages.findAll({ where: { ProductDetailId: productId } });
      
//       // Delete images that are not in the new list
//       const imagePaths = images.map(img => img.split('/').pop());
//       await ProductImages.destroy({
//         where: {
//           ProductDetailId: productId,
//           img: {
//             [Op.notIn]: imagePaths
//           }
//         }
//       });

//       // Add or update images
//       await Promise.all(images.map(img => {
//         return ProductImages.upsert({
//           img,
//           ProductDetailId: productId // Set the foreign key
//         });
//       }));
//     }

//     // Fetch updated product details with images
//     const updatedProductDetails = await ProductDetails.findByPk(productId, {
//       include: [{
//         model: ProductImages,
//         as: 'images'
//       }]
//     });

//     return apiResponse.successResponseWithData(
//       res,
//       'Product details updated successfully',
//       updatedProductDetails
//     );
//   } catch (error) {
//     console.error('Update product details failed', error);
//     return apiResponse.ErrorResponse(res, 'Update product details failed');
//   }
// };


exports.updateProductDetails = async (req, res) => {
  try {
    const { productId } = req.params;
    const { productName, application } = req.body;
    const images = req.files ? req.files.map(file => file.path) : [];

    // Find the product by primary key
    const productDetails = await ProductDetails.findByPk(productId);
    if (!productDetails) {
      return apiResponse.notFoundResponse(res, 'Product not found');
    }

    // Update product details
    productDetails.productName = productName || productDetails.productName;
     productDetails.slug = productName || productDetails.slug;
    productDetails.application = application || productDetails.application;
    productDetails.isActive = req.body.isActive !== undefined ? req.body.isActive : productDetails.isActive;
    productDetails.isDelete = req.body.isDelete !== undefined ? req.body.isDelete : productDetails.isDelete;
    await productDetails.save();

    // Handle images only if they are provided
    if (images.length > 0) {
      // Find existing images
      const existingImages = await ProductImages.findAll({ where: { ProductDetailId: productId } });

      // Delete images that are not in the new list
      const imagePaths = images.map(img => img.split('/').pop());
      await ProductImages.destroy({
        where: {
          ProductDetailId: productId,
          img: {
            [Op.notIn]: imagePaths
          }
        }
      });

      // Add or update images
      await Promise.all(images.map(img => {
        return ProductImages.upsert({
          img,
          ProductDetailId: productId // Set the foreign key
        });
      }));
    }

    // Fetch updated product details with images
    const updatedProductDetails = await ProductDetails.findByPk(productId, {
      include: [{
        model: ProductImages,
        as: 'images'
      }]
    });

    return apiResponse.successResponseWithData(
      res,
      'Product details updated successfully',
      updatedProductDetails
    );
  } catch (error) {
    console.error('Update product details failed', error);

    if (error.name === 'SequelizeUniqueConstraintError') {
      return apiResponse.ErrorResponse(res, 'Duplicate entry: Product details already exist');
    }

    return apiResponse.ErrorResponse(res, 'Update product details failed');
  }
};



exports.isActiveStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const productDetails = await ProductDetails.findByPk(id);

    if (!productDetails) {
      return apiResponse.notFoundResponse(res, 'Product details not found');
    }

    productDetails.isActive = !productDetails.isActive;
    await productDetails.save();

    return apiResponse.successResponseWithData(
      res,
      'Product details active status updated successfully',
      productDetails
    );
  } catch (error) {
    console.error('Toggle product details active status failed', error);
    return apiResponse.ErrorResponse(res, 'Toggle product details active status failed');
  }
};
exports.deleteProductDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const productDetails = await ProductDetails.findByPk(id);

    if (!productDetails) {
      return apiResponse.notFoundResponse(res, 'Product details not found');
    }

    await productDetails.destroy();

    return apiResponse.successResponse(res, 'Product details deleted successfully');
  } catch (error) {
    console.error('Delete product details failed', error);
    return apiResponse.ErrorResponse(res, 'Delete product details failed');
  }
};


exports.getAllProductNames = async (req, res) => {
  try {
    const productNames = await ProductDetails.findAll({
      attributes: ['productName'],
      where: { isDelete: false }
    });

    return apiResponse.successResponseWithData(
      res,
      'Product names retrieved successfully',
      productNames
    );
  } catch (error) {
    console.error('Get product names failed', error);
    return apiResponse.ErrorResponse(res, 'Get product names failed');
  }
};