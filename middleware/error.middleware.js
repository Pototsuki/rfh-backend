const AppError = require('../helpers/app-error')

const errorHandler = (err, req, res, next) => {
  // default
  let statusCode = err.statusCode || 500
  let message = err.message || 'Internal Server Error'

  // AppError → custom message
  if (err instanceof AppError) {
    statusCode = err.statusCode
    message = err.message
  }

  // JWT error
  if (err.name === 'JsonWebTokenError') {
    statusCode = 401
    message = 'Invalid token'
  }

  if (err.name === 'TokenExpiredError') {
    statusCode = 401
    message = 'Token expired'
  }

  return res.status(statusCode).json({
    status: false,
    message
  })
}

module.exports = errorHandler
