const { Router } = require('express')
const { login, register, resetPassword } = require('../controllers/auth.controller')
const loginValidator = require('../validators/auth/login.validator')
const registerValidator = require('../validators/auth/register.validator')
const resetPasswordValidator = require('../validators/auth/reset-password.validator')

const router = Router()

router.post('/login', loginValidator, login)
router.post('/register', registerValidator, register)
router.post('/reset-password', resetPasswordValidator, resetPassword)

module.exports = router