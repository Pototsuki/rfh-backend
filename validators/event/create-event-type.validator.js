const { body } = require('express-validator')

module.exports = [
  body('name')
    .trim()
    .notEmpty().withMessage('name is required')
    .isString().withMessage('name is string'),
  body('meta')
    .optional()
    .isString().withMessage('meta is string')
]