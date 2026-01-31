const { body } = require('express-validator')
const { ErrorValidationEnum } = require('../../enums/errors.enum')

module.exports = [
  body('id')
    .notEmpty().withMessage(ErrorValidationEnum.id_required)
    .isNumeric().withMessage(ErrorValidationEnum.id_number),
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