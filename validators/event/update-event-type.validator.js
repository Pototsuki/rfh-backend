const { body } = require('express-validator')

module.exports = [
  body('id')
    .trim()
    .notEmpty().withMessage('id is required')
    .isNumeric().withMessage('id is number'),
  body('name')
    .optional()
    .isString().withMessage('name is string'),
  body('meta')
    .optional()
    .isString().withMessage('meta is string')
]