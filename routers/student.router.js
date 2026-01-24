const { Router } = require('express')
const { list, create, deleteStudent, detail, assign, listEventByStudent } = require('../controllers/student.controller')
const authenticate = require('../middleware/auth.middleware')
const adminAuthenticate = require('../middleware/admin.middleware')
const listValidator = require('../validators/student/list.validator')
const createValidator = require('../validators/student/create.validator')
const deleteValidator = require('../validators/student/delete.validator')
const detailValidator = require('../validators/student/detail.validator')
const assignValidator = require('../validators/student/assign.validator')
const listEventByStudentValidator = require('../validators/student/list-event-by-student.validator')


const router = Router()

router.post('/list', authenticate, adminAuthenticate, listValidator, list)
router.post('/create', authenticate, adminAuthenticate, createValidator, create)
router.post('/delete', authenticate, adminAuthenticate, deleteValidator, deleteStudent)
router.get('/detail/:uuid', authenticate, adminAuthenticate, detailValidator, detail)
router.post('/assign', authenticate, adminAuthenticate, assignValidator, assign)
router.post('/list/event', authenticate, adminAuthenticate,listEventByStudentValidator, listEventByStudent)

module.exports = router