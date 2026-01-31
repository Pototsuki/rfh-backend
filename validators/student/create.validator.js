const { body } = require('express-validator')
const { ErrorValidationEnum } = require('../../enums/errors.enum')

module.exports = [
  body('name')
    .trim()
    .notEmpty().withMessage(ErrorValidationEnum.name_required)
    .isString().withMessage(ErrorValidationEnum.name_string),
  body('email')
    .trim()
    .notEmpty().withMessage(ErrorValidationEnum.email_required)
    .isEmail().withMessage(ErrorValidationEnum.invalid_email_format)
    .normalizeEmail(),
  body('phone')
    .notEmpty().withMessage(ErrorValidationEnum.phone_required)
    .matches(/^(08|628|\+628)[0-9]{7,11}$/).withMessage(ErrorValidationEnum.invalid_phone_format),
  body('address')
    .notEmpty().withMessage(ErrorValidationEnum.address_required)
    .isString().withMessage(ErrorValidationEnum.address_string)
]