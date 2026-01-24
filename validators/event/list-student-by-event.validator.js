const { body } = require('express-validator')

module.exports = [
  body('id')
    .notEmpty().withMessage('id is required')
    .isNumeric().withMessage('id is number'),
  body('page')
    .optional()
    .isNumeric().withMessage('page is number'),
  body('limit')
    .optional()
    .isNumeric().withMessage('limit is number'),
  body('search')
    .optional()
    .isString().withMessage('search is string')
]