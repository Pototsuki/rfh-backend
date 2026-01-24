const { body } = require('express-validator')

module.exports = [
  body('uuid')
    .notEmpty().withMessage('uuid is required')
    .isUUID().withMessage('uuid is not valid')
]