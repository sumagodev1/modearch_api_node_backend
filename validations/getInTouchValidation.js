const { body, param } = require('express-validator');

const validateGetInTouch = [
  body('name').notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Email is required and must be a valid email'),
  body('subject').notEmpty().withMessage('Subject is required'),
  body('message').notEmpty().withMessage('Message is required'),
  body('phone').isNumeric().withMessage('Phone must be a valid number'),
];

const validateGetInTouchId = [
  param('id').isInt().withMessage('ID must be an integer'),
];

module.exports = { validateGetInTouch, validateGetInTouchId };
