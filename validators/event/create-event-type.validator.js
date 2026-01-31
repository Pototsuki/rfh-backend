const { body } = require('express-validator')
const { ErrorValidationEnum } = require('../../enums/errors.enum')

module.exports = [
  body('name')
    .trim()
    .notEmpty().withMessage(ErrorValidationEnum.name_required)
    .isString().withMessage(ErrorValidationEnum.name_string),
  body('meta')
    .optional()
    .isString().withMessage(ErrorValidationEnum.meta_string)
]