const { param } = require('express-validator')
const { ErrorValidationEnum } = require('../../enums/errors.enum')

module.exports = [
  param('id')
    .notEmpty().withMessage(ErrorValidationEnum.id_required)
    .isNumeric().withMessage(ErrorValidationEnum.id_number)
]