const { body } = require('express-validator')

module.exports = [
  body('id')
    .trim()
    .notEmpty().withMessage('id is required')
    .isNumeric().withMessage('id is number'),
  body('name')
    .trim()
    .optional()
    .isString().withMessage('name is string'),
  body('type_id')
    .trim()
    .optional()
    .isNumeric().withMessage('type_id is number'),
  body('start_date')
    .trim()
    .optional()
    .isNumeric().withMessage('start_date is number'),
  body('end_date')
    .trim()
    .optional()
    .isNumeric().withMessage('end_date is number'),
  body('meta')
    .optional()
    .isString().withMessage('meta is string'),
  body('is_active')
    .optional()
    .isNumeric().withMessage('is_active is number')
]