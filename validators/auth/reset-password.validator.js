const { body } = require('express-validator')
const { ErrorValidationEnum } = require('../../enums/errors.enum')

module.exports = [
  body('username')
    .notEmpty().withMessage(ErrorValidationEnum.username_required)
    .isString().withMessage(ErrorValidationEnum.username_string),
  body('password')
    .notEmpty().withMessage(ErrorValidationEnum.password_required)
    .isString().withMessage(ErrorValidationEnum.password_string),
  body('secret_key')
    .notEmpty().withMessage(ErrorValidationEnum.secret_key_required)
    .isString().withMessage(ErrorValidationEnum.secret_key_string)
]