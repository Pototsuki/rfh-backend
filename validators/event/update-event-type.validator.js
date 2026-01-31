const { body } = require('express-validator')
const { ErrorValidationEnum } = require('../../enums/errors.enum')

module.exports = [
  body('id')
    .trim()
    .notEmpty().withMessage(ErrorValidationEnum.id_required)
    .isNumeric().withMessage(ErrorValidationEnum.id_number),
  body('name')
    .optional()
    .isString().withMessage(ErrorValidationEnum.name_string),
  body('meta')
    .optional()
    .isString().withMessage(ErrorValidationEnum.meta_string)
]