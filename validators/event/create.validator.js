const { body } = require('express-validator')

module.exports = [
  body('name')
    .trim()
    .notEmpty().withMessage('name is required')
    .isString().withMessage('name is string'),
  body('type_id')
    .trim()
    .notEmpty().withMessage('type_id is required')
    .isNumeric().withMessage('type_id is number'),
  body('start_date')
    .trim()
    .notEmpty().withMessage('start_date is required')
    .isNumeric().withMessage('start_date is number'),
  body('end_date')
    .trim()
    .notEmpty().withMessage('end_date is required')
    .isNumeric().withMessage('end_date is number'),
  body('meta')
    .optional()
    .isString().withMessage('meta is string'),
  body('is_active')
    .optional()
    .isNumeric().withMessage('is_active is number')
]