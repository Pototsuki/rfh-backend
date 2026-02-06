const { StatusCodes } = require('http-status-codes')
const SettingRepository = require('../repositories/setting.repository')
const StudentRepository = require('../repositories/student.repository')
const AppError = require('../helpers/app-error')
const { v4: uuidv4 } = require('uuid')
const EventRepository = require('../repositories/event.repository')
const StudentEventRepository = require('../repositories/student-event.repository')
const { ErrorServiceEnum } = require('../enums/errors.enum')
const { parseMeta } = require('../utils/general.util')

class StudentService {
  
  async list(payload) {
    try {
      const page = parseInt(payload?.page) || 1
      const limit = parseInt(payload?.limit) || 10
      const search = payload?.search || ''

      const { rows, count } = await StudentRepository.findAllPaginated({page,limit,search})

      return {
        data: rows,
        meta: {
          total: count,
          page,
          limit,
          total_page: Math.ceil(count / limit)
        }
      }

    } catch (error) {
      throw new AppError(StatusCodes.INTERNAL_SERVER_ERROR,'Gagal mengambil data student')
    }
  }

  async create(payload) {
    try {
      const { name, email, phone, address } = payload
      const existingStudent = await StudentRepository.findByEmail(email)
      if (existingStudent) throw new AppError(StatusCodes.CONFLICT, ErrorServiceEnum.email_registered)
      const uuid = uuidv4()
      const now = Date.now()/ 1000
      const studentPayload = { uuid, name, email, phone, address, created_at: now, updated_at: now }
      const createStudent = await StudentRepository.create(studentPayload)
      const result = {
        uuid: createStudent.uuid,
        name: createStudent.name,
        email: createStudent.email,
        phone: createStudent.phone,
        address: createStudent.address
      }
      return result
    } catch (error) {
      if (error instanceof AppError) throw error
      throw new AppError(StatusCodes.INTERNAL_SERVER_ERROR,'Create Student Internal Server Error')
    }
  }

  async delete(payload) {
    try {
      const { uuid } = payload
      const existingStudent = await StudentRepository.findByUUID(uuid)
      if (!existingStudent) throw new AppError(StatusCodes.CONFLICT, ErrorServiceEnum.student_not_registered)
      const now = Date.now()/ 1000
      const deleteStudentPayload = { is_deleted: 1, deleted_at: now }
      await StudentRepository.update(existingStudent.id, deleteStudentPayload)
      const result = {
        uuid: existingStudent.uuid,
        name: existingStudent.name,
        email: existingStudent.email,
        is_deleted: 1
      }
      return result
    } catch (error) {
      if (error instanceof AppError) throw error
      throw new AppError(StatusCodes.INTERNAL_SERVER_ERROR,'Delete Student Internal Server Error')
    }
  }

  async detail(payload) {
    try {
      const { uuid } = payload
      const existingStudent = await StudentRepository.findByUUID(uuid)
      if (!existingStudent) throw new AppError(StatusCodes.CONFLICT, ErrorServiceEnum.student_not_registered)
      const result = {
        uuid: existingStudent.uuid,
        name: existingStudent.name,
        email: existingStudent.email,
        phone: existingStudent.phone,
        address: existingStudent.address,
        created_at: existingStudent.created_at
      }
      return result
    } catch (error) {
      if (error instanceof AppError) throw error
      throw new AppError(StatusCodes.INTERNAL_SERVER_ERROR,'Detail Student Internal Server Error')
    }
  }

  async assign(payload) {
    try {
      const { uuid, event_id } = payload
      const existingStudent = await StudentRepository.findByUUID(uuid)
      if (!existingStudent) throw new AppError(StatusCodes.CONFLICT, ErrorServiceEnum.student_not_registered)
      const existingEvent = await EventRepository.findById(event_id)
      if (!existingEvent) throw new AppError(StatusCodes.CONFLICT, ErrorServiceEnum.event_not_registered)
      const existingStudentEvent = await StudentEventRepository.findByStudentAndEvent(existingStudent.id, existingEvent.id)
      if(existingStudentEvent) throw new AppError(StatusCodes.CONFLICT, ErrorServiceEnum.student_event_registered)
      const now = Date.now()/ 1000
      const uuidStudentEvent = uuidv4()
      const studentEventPayload = { uuid: uuidStudentEvent, student_id: existingStudent.id, event_id: existingEvent.id, is_finished: 0, created_at: now, updated_at: now }
      await StudentEventRepository.create(studentEventPayload)
      const result = {
        uuid: uuidStudentEvent,
        student_name: existingStudent.name,
        event_name: existingEvent.name,
        event_start_date: existingEvent.start_date,
        event_end_date: existingEvent.end_date
      }
      return result
    } catch (error) {
      if (error instanceof AppError) throw error
      throw new AppError(StatusCodes.INTERNAL_SERVER_ERROR,'Assign Student Internal Server Error')
    }
  }

  async listEventByStudent(payload) {
    try {
      const uuid = payload.uuid;
      const page = parseInt(payload?.page) || 1;
      const limit = parseInt(payload?.limit) || 10;
      const search = payload?.search || '';

      const existingStudent = await StudentRepository.findByUUID(uuid);
      if (!existingStudent) throw new AppError(StatusCodes.CONFLICT, ErrorServiceEnum.student_not_registered);

      const { rows, count } = await StudentEventRepository.findEventsByStudentPaginated({
        student_id: existingStudent.id, page, limit, search
      });

      const data = rows.map(item => ({
        student_event_uuid: item.uuid,
        is_finished: item.is_finished,
        event_name: item.event.name,
        event_start_date: item.event.start_date,
        event_end_date: item.event.end_date,
        event_type: item.event.type.name
      }))

      return {
        data: data,
        meta: {
          total: count,
          page,
          limit,
          total_page: Math.ceil(count / limit)
        }
      };

    } catch (error) {
      if (error instanceof AppError) throw error
      throw new AppError(StatusCodes.INTERNAL_SERVER_ERROR,'Gagal mengambil data event student')
    }
  }

  async updateStudentEvent(payload) {
    try {
      const { uuid } = payload
      const existingStudentEvent = await StudentEventRepository.findByUuid(uuid)
      if (!existingStudentEvent) throw new AppError(StatusCodes.CONFLICT, ErrorServiceEnum.student_event_not_registered)
      const existingStudent = await StudentRepository.findById(existingStudentEvent.student_id)
      if (!existingStudent) throw new AppError(StatusCodes.CONFLICT, ErrorServiceEnum.student_not_registered)
      const existingEvent = await EventRepository.findById(existingStudentEvent.event_id)
      if (!existingEvent) throw new AppError(StatusCodes.CONFLICT, ErrorServiceEnum.event_not_registered)
      
      const updatableFields = [ 'is_finished', 'meta' ];
      const updatePayload = {}
      for (const field of updatableFields) {
        if (payload[field] !== undefined) updatePayload[field] = payload[field]
      }

      if (Object.keys(updatePayload).length === 0) {
        return { id: existingStudentEvent.uuid, meta: parseMeta(existingStudentEvent.meta) }
      }

      const now = Date.now()/ 1000
      updatePayload.updated_at = now;

      await StudentEventRepository.update(existingStudentEvent.id, updatePayload)
      const updatedStudentEvent = await StudentEventRepository.findByUuid(uuid);
      const result = {
        uuid: updatedStudentEvent.uuid,
        is_finished: updatedStudentEvent.is_finished,
        meta: parseMeta(updatedStudentEvent.meta)
      }
      return result
    } catch (error) {
      if (error instanceof AppError) throw error
      throw new AppError(StatusCodes.INTERNAL_SERVER_ERROR,'Update Student Event Internal Server Error')
    }
  }
}

module.exports = StudentService