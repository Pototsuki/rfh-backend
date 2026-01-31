const { body } = require('express-validator')
const { ErrorValidationEnum } = require('../../enums/errors.enum')

module.exports = [
  body('name')
    .trim()
    .notEmpty().withMessage(ErrorValidationEnum.name_required)
    .isString().withMessage(ErrorValidationEnum.name_string),
  body('type_id')
    .trim()
    .notEmpty().withMessage(ErrorValidationEnum.type_id_required)
    .isNumeric().withMessage(ErrorValidationEnum.type_id_number),
  body('start_date')
    .trim()
    .notEmpty().withMessage(ErrorValidationEnum.start_date_required)
    .isNumeric().withMessage(ErrorValidationEnum.start_date_number),
  body('end_date')
    .trim()
    .notEmpty().withMessage(ErrorValidationEnum.end_date_required)
    .isNumeric().withMessage(ErrorValidationEnum.end_date_number),
  body('meta')
    .optional()
    .isString().withMessage(ErrorValidationEnum.meta_string),
  body('is_active')
    .optional()
    .isNumeric().withMessage(ErrorValidationEnum.is_active_number)
]