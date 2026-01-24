const { param } = require('express-validator')

module.exports = [
  param('uuid')
    .notEmpty().withMessage('uuid is required')
    .isUUID().withMessage('uuid is not valid')
]