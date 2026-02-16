const { body } = require('express-validator')
const { ErrorValidationEnum } = require('../../enums/errors.enum')

module.exports = [
  body('id')
    .notEmpty().withMessage(ErrorValidationEnum.id_required)
    .isNumeric().withMessage(ErrorValidationEnum.id_number)
]