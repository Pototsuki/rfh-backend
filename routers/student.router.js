const { Router } = require('express')
const { list, create, deleteStudent, detail } = require('../controllers/student.controller')
const authenticate = require('../middleware/auth.middleware')
const adminAuthenticate = require('../middleware/admin.middleware')
const listValidator = require('../validators/student/list.validator')
const createValidator = require('../validators/student/create.validator')
const deleteValidator = require('../validators/student/delete.validator')
const detailValidator = require('../validators/student/detail.validator')


const router = Router()

router.post('/list', listValidator, list)
router.post('/create', authenticate, adminAuthenticate, createValidator, create)
router.post('/delete', authenticate, adminAuthenticate, deleteValidator, deleteStudent)
router.get('/detail/:uuid', detailValidator, detail)

module.exports = router