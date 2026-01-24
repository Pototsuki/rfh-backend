const { validationResult } = require('express-validator')
const AuthService = require('../services/auth.service')
const { success, error } = require('../helpers/response.helper')
const AppError = require('../helpers/app-error')

const login = async (req, res) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) return error(res, errors.array()[0].msg, 422)
    const authService = new AuthService();
    const result = await authService.login(req.body)
    return success(res, result)
  } catch (err) {
    if (err instanceof AppError) return error(res, err.message, err.statusCode)
    return err(res, 'Login Internal Server Error', 500)
  }
}

const register = async (req, res) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) return error(res, errors.array()[0].msg, 422)
    const authService = new AuthService();
    const result = await authService.register(req.body)
    return success(res, result)
  } catch (err) {
    if (err instanceof AppError) return error(res, err.message, err.statusCode)
    return err(res, 'Register Internal Server Error', 500)
  }
}

const resetPassword = async (req, res) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) return error(res, errors.array()[0].msg, 422)
    const authService = new AuthService();
    const result = await authService.resetPassword(req.body)
    return success(res, result)
  } catch (err) {
    if (err instanceof AppError) return error(res, err.message, err.statusCode)
    return err(res, 'Reset Password Internal Server Error', 500)
  }
}

module.exports = { login, register, resetPassword }