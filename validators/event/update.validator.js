const { body } = require('express-validator')
const { ErrorValidationEnum } = require('../../enums/errors.enum')

module.exports = [
  body('id')
    .trim()
    .notEmpty().withMessage(ErrorValidationEnum.id_required)
    .isNumeric().withMessage(ErrorValidationEnum.id_number),
  body('name')
    .trim()
    .optional()
    .isString().withMessage(ErrorValidationEnum.name_string),
  body('type_id')
    .trim()
    .optional()
    .isNumeric().withMessage(ErrorValidationEnum.type_id_number),
  body('start_date')
    .trim()
    .optional()
    .isNumeric().withMessage(ErrorValidationEnum.start_date_number),
  body('end_date')
    .trim()
    .optional()
    .isNumeric().withMessage(ErrorValidationEnum.end_date_number),
  body('meta')
    .optional()
    .isString().withMessage(ErrorValidationEnum.meta_string),
  body('is_active')
    .optional()
    .isNumeric().withMessage(ErrorValidationEnum.is_active_number)
]