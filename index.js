require("dotenv").config()

const cors = require('cors')
const express = require('express')
const app = express()

// 🔐 Force HTTPS (required for cPanel / reverse proxy)
app.enable('trust proxy')
app.use((req, res, next) => {
  const proto = req.headers['x-forwarded-proto']
  if (proto && proto !== 'https') {
    return res.redirect(`https://${req.headers.host}${req.originalUrl}`)
  }
  next()
})

const router = require('./routers/index.router')
const sequelize = require('./config/database')
const errorHandler = require('./middleware/error.middleware')

/**
 * ⛔️ PENTING: JANGAN fallback ke 3000
 */
const PORT = process.env.PORT
const HOST = '0.0.0.0'

app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.get('/', (req, res) => {
  res.send('RFH Backend API!')
})

app.get('/healthcheck', (req, res) => {
  res.json({ status: 'ok' })
})

app.use(router)
app.use(errorHandler)

;(async () => {
  try {
    await sequelize.authenticate()
    console.log('✅ Database connected')
  } catch (err) {
    console.error('❌ Database connection failed:', err)
  }
})()

app.listen(PORT, HOST, () => {
  console.log(`🚀 RFH Backend running on port ${PORT}`)
})

module.exports = app