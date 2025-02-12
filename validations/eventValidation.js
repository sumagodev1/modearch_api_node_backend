// validations/eventValidation.js
const { body, param } = require('express-validator');

exports.validateEvent = [
  // body('name').notEmpty().withMessage('Event name is required'),
  // Add any other validations you need here
];

exports.validateEventId = [
  param('id').isInt().withMessage('Event ID must be an integer'),
];
