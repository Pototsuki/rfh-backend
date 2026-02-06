const { body } = require('express-validator')
const { ErrorValidationEnum } = require('../../enums/errors.enum')

module.exports = [
  body('uuid')
    .notEmpty().withMessage(ErrorValidationEnum.uuid_required)
    .isUUID().withMessage(ErrorValidationEnum.invalid_uuid_type),
  body('is_finished')
    .optional()
    .isNumeric().withMessage(ErrorValidationEnum.is_finished_number),
  body('meta')
    .optional()
    .isString().withMessage(ErrorValidationEnum.meta_string),
]