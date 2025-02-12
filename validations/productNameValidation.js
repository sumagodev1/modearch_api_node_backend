const { body, param } = require('express-validator');

const validateProductName = [
  body('productName').notEmpty().withMessage('Product name is required'),
];

const validateProductNameId = [
  param('id').isInt().withMessage('ID must be an integer'),
];

module.exports = { validateProductName, validateProductNameId };
