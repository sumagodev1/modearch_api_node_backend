const { body, param } = require('express-validator');

const validateSubscribe = [
  body('email').isEmail().withMessage('Email is required and must be a valid email'),
];

const validateSubscribeId = [
  param('id').isInt().withMessage('ID must be an integer'),
];

module.exports = { validateSubscribe, validateSubscribeId };
