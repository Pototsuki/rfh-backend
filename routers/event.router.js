const { Router } = require('express')
const { list, create, updateEvent, createEventType, updateEventType, listStudentByEvent, detailStudentEvent, deleteStudentEvent, listEventType } = require('../controllers/event.controller')
const authenticate = require('../middleware/auth.middleware')
const adminAuthenticate = require('../middleware/admin.middleware')
const listValidator = require('../validators/event/list.validator')
const createValidator = require('../validators/event/create.validator')
const updateValidator = require('../validators/event/update.validator')
const createEventTypeValidator = require('../validators/event/create-event-type.validator')
const updateEventTypeValidator = require('../validators/event/update-event-type.validator')
const listStudentByEventValidator = require('../validators/event/list-student-by-event.validator')
const detailStudentEventValidator = require('../validators/event/detail-student-event.validator')
const deleteStudentEventValidator = require('../validators/event/delete-student-event.validator')
const listEventTypeValidator = require('../validators/event/list-event-type.validator')


const router = Router()

router.post('/list', authenticate, adminAuthenticate, listValidator, list)
router.post('/create', authenticate, adminAuthenticate, createValidator, create)
router.post('/update', authenticate, adminAuthenticate, updateValidator, updateEvent)
router.post('/create-event-type', authenticate, adminAuthenticate, createEventTypeValidator, createEventType)
router.post('/update-event-type', authenticate, adminAuthenticate, updateEventTypeValidator, updateEventType)
router.post('/list/student', authenticate, adminAuthenticate,listStudentByEventValidator, listStudentByEvent)
router.get('/detail/:uuid', detailStudentEventValidator, detailStudentEvent)
router.post('/delete', authenticate, adminAuthenticate, deleteStudentEventValidator, deleteStudentEvent)
router.post('/list-event-type', authenticate, adminAuthenticate, listEventTypeValidator, listEventType)

module.exports = router