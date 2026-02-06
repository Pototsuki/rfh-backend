const { validationResult } = require('express-validator')
const StudentService = require('../services/student.service')
const { success, error, successWithPagination } = require('../helpers/response.helper')
const AppError = require('../helpers/app-error')

const list = async (req, res) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) return error(res, errors.array()[0].msg, 422)
    const studentService = new StudentService();
    const result = await studentService.list(req.body)
    return successWithPagination(res, result.data, result.meta)
  } catch (err) {
    if (err instanceof AppError) return error(res, err.message, err.statusCode)
    return err(res, 'List Student Internal Server Error', 500)
  }
}

const create = async (req, res) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) return error(res, errors.array()[0].msg, 422)
    const studentService = new StudentService();
    const result = await studentService.create(req.body)
    return success(res, result)
  } catch (err) {
    if (err instanceof AppError) return error(res, err.message, err.statusCode)
    return err(res, 'Create Student Internal Server Error', 500)
  }
}

const deleteStudent = async (req, res) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) return error(res, errors.array()[0].msg, 422)
    const studentService = new StudentService();
    const result = await studentService.delete(req.body)
    return success(res, result)
  } catch (err) {
    if (err instanceof AppError) return error(res, err.message, err.statusCode)
    return err(res, 'Delete Student Internal Server Error', 500)
  }
}

const detail = async (req, res) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) return error(res, errors.array()[0].msg, 422)
    const studentService = new StudentService();
    const result = await studentService.detail(req.params)
    return success(res, result)
  } catch (err) {
    if (err instanceof AppError) return error(res, err.message, err.statusCode)
    return err(res, 'Get Student Internal Server Error', 500)
  }
}

const assign = async (req, res) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) return error(res, errors.array()[0].msg, 422)
    const studentService = new StudentService();
    const result = await studentService.assign(req.body)
    return success(res, result)
  } catch (err) {
    if (err instanceof AppError) return error(res, err.message, err.statusCode)
    return err(res, 'Assign Student Internal Server Error', 500)
  }
}

const listEventByStudent = async (req, res) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) return error(res, errors.array()[0].msg, 422)
    const studentService = new StudentService();
    const result = await studentService.listEventByStudent(req.body)
    return successWithPagination(res, result.data, result.meta)
  } catch (err) {
    if (err instanceof AppError) return error(res, err.message, err.statusCode)
    return err(res, 'List Student Event Internal Server Error', 500)
  }
}

const updateStudentEvent = async (req, res) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) return error(res, errors.array()[0].msg, 422)
    const studentService = new StudentService();
    const result = await studentService.updateStudentEvent(req.body)
    return success(res, result)
  } catch (err) {
    if (err instanceof AppError) return error(res, err.message, err.statusCode)
    return err(res, 'Update Student Event Internal Server Error', 500)
  }
}

module.exports = { list, create, deleteStudent, detail, assign, listEventByStudent, updateStudentEvent }