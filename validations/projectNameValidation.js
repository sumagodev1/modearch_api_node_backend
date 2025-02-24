const { body, param } = require('express-validator');

const projectNameValidation = [
  body('project_name').notEmpty().withMessage('Project Name is required')
];

const projectNameValidationId = [
  param('id').isInt().withMessage('ID must be an integer')
];

module.exports = { projectNameValidation, projectNameValidationId };
