const { param } = require('express-validator')
const { ErrorValidationEnum } = require('../../enums/errors.enum')

module.exports = [
  param('uuid')
    .notEmpty().withMessage(ErrorValidationEnum.uuid_required)
    .isUUID().withMessage(ErrorValidationEnum.invalid_uuid_type)
]