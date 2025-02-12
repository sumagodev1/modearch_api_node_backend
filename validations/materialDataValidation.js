// validations/materialDataValidation.js
const { body } = require('express-validator');

const validateMaterialData = [
  body('productName').notEmpty().withMessage('Product name is required'),
  body('materialDescription').notEmpty().withMessage('Material description is required'),
];

module.exports = { validateMaterialData };
