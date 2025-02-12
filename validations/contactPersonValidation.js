const { body, param } = require('express-validator');

const validateContactPerson = [
  body('title').notEmpty().withMessage('Title is required'),
  body('person_name').notEmpty().withMessage('Person name is required'),
  body('phone').notEmpty().withMessage('Phone is required'),
  body('email').isEmail().withMessage('Valid email is required')
];

const validateContactPersonId = [
  param('id').isInt().withMessage('ID must be an integer')
];

module.exports = { validateContactPerson, validateContactPersonId };
