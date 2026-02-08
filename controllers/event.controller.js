const { validationResult } = require('express-validator')
const EventService = require('../services/event.service')
const { success, error, successWithPagination } = require('../helpers/response.helper')
const AppError = require('../helpers/app-error')

const list = async (req, res) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) return error(res, errors.array()[0].msg, 422)
    const eventService = new EventService();
    const result = await eventService.list(req.body)
    return successWithPagination(res, result.data, result.meta)
  } catch (err) {
    if (err instanceof AppError) return error(res, err.message, err.statusCode)
    return err(res, 'List Event Internal Server Error', 500)
  }
}

const detail = async (req, res) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) return error(res, errors.array()[0].msg, 422)
    const eventService = new EventService();
    const result = await eventService.detail(req.params)
    return success(res, result)
  } catch (err) {
    if (err instanceof AppError) return error(res, err.message, err.statusCode)
    return err(res, 'Get Detail Event Internal Server Error', 500)
  }
}

const create = async (req, res) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) return error(res, errors.array()[0].msg, 422)
    const eventService = new EventService();
    const result = await eventService.create(req.body)
    return success(res, result)
  } catch (err) {
    if (err instanceof AppError) return error(res, err.message, err.statusCode)
    return err(res, 'Create Event Internal Server Error', 500)
  }
}

const updateEvent = async (req, res) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) return error(res, errors.array()[0].msg, 422)
    const eventService = new EventService();
    const result = await eventService.updateEvent(req.body)
    return success(res, result)
  } catch (err) {
    if (err instanceof AppError) return error(res, err.message, err.statusCode)
    return err(res, 'Update Event Internal Server Error', 500)
  }
}

const createEventType = async (req, res) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) return error(res, errors.array()[0].msg, 422)
    const eventService = new EventService();
    const result = await eventService.createEventType(req.body)
    return success(res, result)
  } catch (err) {
    if (err instanceof AppError) return error(res, err.message, err.statusCode)
    return err(res, 'Create Event Type Internal Server Error', 500)
  }
}

const updateEventType = async (req, res) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) return error(res, errors.array()[0].msg, 422)
    const eventService = new EventService();
    const result = await eventService.updateEventType(req.body)
    return success(res, result)
  } catch (err) {
    if (err instanceof AppError) return error(res, err.message, err.statusCode)
    return err(res, 'Update Event Type Internal Server Error', 500)
  }
}

const listStudentByEvent = async (req, res) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) return error(res, errors.array()[0].msg, 422)
    const eventService = new EventService();
    const result = await eventService.listStudentByEvent(req.body)
    return successWithPagination(res, result.data, result.meta)
  } catch (err) {
    if (err instanceof AppError) return error(res, err.message, err.statusCode)
    return err(res, 'List Event Student Internal Server Error', 500)
  }
}

const detailStudentEvent = async (req, res) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) return error(res, errors.array()[0].msg, 422)
    const eventService = new EventService();
    const result = await eventService.detailStudentEvent(req.params)
    return success(res, result)
  } catch (err) {
    if (err instanceof AppError) return error(res, err.message, err.statusCode)
    return err(res, 'Get Student Internal Server Error', 500)
  }
}

const deleteStudentEvent = async (req, res) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) return error(res, errors.array()[0].msg, 422)
    const eventService = new EventService();
    const result = await eventService.deleteStudentEvent(req.body)
    return success(res, result)
  } catch (err) {
    if (err instanceof AppError) return error(res, err.message, err.statusCode)
    return err(res, 'Get Student Internal Server Error', 500)
  }
}

const listEventType = async (req, res) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) return error(res, errors.array()[0].msg, 422)
    const eventService = new EventService();
    const result = await eventService.listEventType(req.body)
    return successWithPagination(res, result.data, result.meta)
  } catch (err) {
    if (err instanceof AppError) return error(res, err.message, err.statusCode)
    return err(res, 'List Event Internal Server Error', 500)
  }
}

const generateCertificate = async (req, res) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) return error(res, errors.array()[0].msg, 422)
    const eventService = new EventService();
    const result = await eventService.generateCertificate(req.params)
    return success(res, result)
  } catch (err) {
    if (err instanceof AppError) return error(res, err.message, err.statusCode)
    return err(res, 'Generate Certificate Internal Server Error', 500)
  }
}

module.exports = { list, detail, create, updateEvent, createEventType, updateEventType, listStudentByEvent, detailStudentEvent, deleteStudentEvent, listEventType, generateCertificate }