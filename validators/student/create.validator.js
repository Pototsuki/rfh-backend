const { body } = require('express-validator')

module.exports = [
  body('name')
    .trim()
    .notEmpty().withMessage('name is required')
    .isString().withMessage('name is string'),
  body('email')
    .trim()
    .notEmpty().withMessage('email is required')
    .isEmail().withMessage('email format invalid')
    .normalizeEmail(),
  body('phone')
    .matches(/^(08|628|\+628)[0-9]{7,11}$/)
    .withMessage('phone must be a valid Indonesian number'),
  body('address')
    .notEmpty().withMessage('address is required')
    .isString().withMessage('address is string')
]