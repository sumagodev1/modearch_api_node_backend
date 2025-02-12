const { body, param } = require('express-validator');

const validateRequestCallbackForm = [
  body('name').notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Email is required and must be a valid email'),
];

const validateRequestCallbackFormId = [
  param('id').isInt().withMessage('ID must be an integer'),
];

module.exports = { validateRequestCallbackForm, validateRequestCallbackFormId };
