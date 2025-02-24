const { body, param } = require('express-validator');

const validateInfrastructure = [
  body('title').notEmpty().withMessage('Title is required'),
  // body('desc').notEmpty().withMessage('desc is required')
];

const validateInfrastructureId = [
  param('id').isInt().withMessage('ID must be an integer')
];

module.exports = { validateInfrastructure, validateInfrastructureId };
