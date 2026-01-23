const { body } = require('express-validator')

module.exports = [
  body('username')
    .notEmpty().withMessage('username is required')
    .isString().withMessage('username is string'),
  body('password')
    .notEmpty().withMessage('password is required')
    .isString().withMessage('password is string')
]