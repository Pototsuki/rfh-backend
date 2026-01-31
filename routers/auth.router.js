const { Router } = require('express')
const { login, register, resetPassword, getUser } = require('../controllers/auth.controller')
const loginValidator = require('../validators/auth/login.validator')
const registerValidator = require('../validators/auth/register.validator')
const resetPasswordValidator = require('../validators/auth/reset-password.validator')
const authenticate = require('../middleware/auth.middleware')
const adminAuthenticate = require('../middleware/admin.middleware')

const router = Router()

router.get('/', authenticate, adminAuthenticate, getUser)
router.post('/login', loginValidator, login)
router.post('/register',authenticate,adminAuthenticate, registerValidator, register)
router.post('/reset-password', resetPasswordValidator, resetPassword)

module.exports = router