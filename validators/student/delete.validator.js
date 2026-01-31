const { body } = require('express-validator')
const { ErrorValidationEnum } = require('../../enums/errors.enum')

module.exports = [
  body('uuid')
    .notEmpty().withMessage(ErrorValidationEnum.uuid_required)
    .isUUID().withMessage(ErrorValidationEnum.invalid_uuid_type)
]