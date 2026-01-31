const { body } = require('express-validator')
const { ErrorValidationEnum } = require('../../enums/errors.enum')

module.exports = [
  body('uuid')
    .notEmpty().withMessage(ErrorValidationEnum.uuid_required)
    .isUUID().withMessage(ErrorValidationEnum.invalid_uuid_type),
  body('page')
    .optional()
    .isNumeric().withMessage(ErrorValidationEnum.page_number),
  body('limit')
    .optional()
    .isNumeric().withMessage(ErrorValidationEnum.limit_number),
  body('search')
    .optional()
    .isString().withMessage(ErrorValidationEnum.search_string)
]