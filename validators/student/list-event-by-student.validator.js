const { body } = require('express-validator')

module.exports = [
  body('uuid')
    .notEmpty().withMessage('uuid is required')
    .isUUID().withMessage('uuid is not valid'),
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