const { body } = require('express-validator')
const { ErrorValidationEnum } = require('../../enums/errors.enum')

module.exports = [
  body('uuid')
    .notEmpty().withMessage(ErrorValidationEnum.uuid_required)
    .isUUID().withMessage(ErrorValidationEnum.invalid_uuid_type),
  body('event_id')
    .trim()
    .notEmpty().withMessage(ErrorValidationEnum.event_id_required)
    .isNumeric().withMessage(ErrorValidationEnum.event_id_number),
]