const { Router } = require('express')
const authRouter = require('./auth.router')
const studentRouter = require('./student.router')
const router = Router()

router.use('/api/v1.0/service/auth', authRouter)
router.use('/api/v1.0/service/student', studentRouter)


module.exports = router