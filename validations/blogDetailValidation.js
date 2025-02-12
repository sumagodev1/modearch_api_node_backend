const { body, param } = require('express-validator');

exports.validateBlogDetail = [
  body('title')
    .notEmpty()
    .withMessage('Title is required')
    .isString()
    .withMessage('Title must be a string'),
  body('shortDesc')
    .notEmpty()
    .withMessage('Short description is required')
    .isString()
    .withMessage('Short description must be a string'),
  body('longDesc')
    .notEmpty()
    .withMessage('Long description is required')
    .isString()
    .withMessage('Long description must be a string'),
];

exports.validateBlogDetailId = [
  param('id')
    .isInt()
    .withMessage('ID must be an integer'),
];
