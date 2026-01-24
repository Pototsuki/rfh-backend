const { body } = require('express-validator')

module.exports = [
  body('uuid')
    .notEmpty().withMessage('uuid is required')
    .isUUID().withMessage('uuid is not valid'),
  body('event_id')
    .trim()
    .notEmpty().withMessage('event_id is required')
    .isNumeric().withMessage('event_id is number'),
]