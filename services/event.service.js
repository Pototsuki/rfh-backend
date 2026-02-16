const { StatusCodes } = require('http-status-codes')
const SettingRepository = require('../repositories/setting.repository')
const StudentRepository = require('../repositories/student.repository')
const EventsRepository = require('../repositories/event.repository')
const EventTypeRepository = require('../repositories/event-type.repository')
const StudentEventsRepository = require('../repositories/student-event.repository')
const AppError = require('../helpers/app-error')
const { ErrorServiceEnum } = require('../enums/errors.enum')
const { parseMeta } = require('../utils/general.util')

class EventService {
  
  async list(payload) {
    try {
      const page = parseInt(payload?.page) || 1
      const limit = parseInt(payload?.limit) || 10
      const search = payload?.search || ''
      const { rows, count } = await EventsRepository.findAllPaginated({page,limit,search})

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
      throw new AppError(StatusCodes.INTERNAL_SERVER_ERROR,'Gagal mengambil data events')
    }
  }

  async detail(payload) {
    try {
      const { id } = payload
      const existingEvent = await EventsRepository.findById(id)
      if (!existingEvent) throw new AppError(StatusCodes.CONFLICT, ErrorServiceEnum.event_not_registered)
      const existingEventType = await EventTypeRepository.findById(existingEvent.type_id)
      if(!existingEventType) throw new AppError(StatusCodes.CONFLICT, ErrorServiceEnum.event_type_not_registered)
      const result = {
        name: existingEvent.name,
        start_date: existingEvent.start_date,
        end_date: existingEvent.end_date,
        is_active: existingEvent.is_active,
        type: existingEventType.name,
        meta: parseMeta(existingEvent.meta)
      }
      return result
    } catch (error) {
      if (error instanceof AppError) throw error
      throw new AppError(StatusCodes.INTERNAL_SERVER_ERROR,'Create Event Internal Server Error')
    }
  }

  async create(payload) {
    try {
      const { name, type_id, start_date, end_date, meta, is_active } = payload
      const existingEventType = await EventTypeRepository.findById(type_id)
      if (!existingEventType) throw new AppError(StatusCodes.CONFLICT, ErrorServiceEnum.event_type_not_registered)
      const existingEvent = await EventsRepository.findByNameAndType(name, type_id)
      if (existingEvent) throw new AppError(StatusCodes.CONFLICT, ErrorServiceEnum.event_registered)
      if (start_date >= end_date) throw new AppError(StatusCodes.BAD_REQUEST, ErrorServiceEnum.start_date_must_be_lower_than_end_date);
      const now = Date.now()/ 1000
      const eventPayload = { name, type_id, start_date, end_date, meta, is_active: is_active ?? 1, created_at: now, updated_at: now }
      const createEvent = await EventsRepository.create(eventPayload)
      const result = {
        name: createEvent.name,
        start_date: createEvent.start_date,
        end_date: createEvent.end_date,
        meta: parseMeta(createEvent.meta)
      }
      return result
    } catch (error) {
      if (error instanceof AppError) throw error
      throw new AppError(StatusCodes.INTERNAL_SERVER_ERROR,'Create Event Internal Server Error')
    }
  }

  async deleteEvent(payload) {
    try {
      const { id } = payload
      const existingEvent = await EventsRepository.findById(id)
      if (!existingEvent) throw new AppError(StatusCodes.CONFLICT, ErrorServiceEnum.event_not_registered)
      const studentEvent = await StudentEventsRepository.findByEvent(existingEvent.id)
      if(studentEvent.length > 0) throw new AppError(StatusCodes.CONFLICT, ErrorServiceEnum.student_still_available)
      await EventsRepository.delete(id)
      const result = { event_name: existingEvent.name }
      return result
    } catch (error) {
      if (error instanceof AppError) throw error
      throw new AppError(StatusCodes.INTERNAL_SERVER_ERROR,'Delete Event Internal Server Error')
    }
  }

  async updateEvent(payload) {
    try {
      const { id } = payload
      const existingEvent = await EventsRepository.findById(id)
      if (!existingEvent) throw new AppError(StatusCodes.CONFLICT, ErrorServiceEnum.event_not_registered)
      if(payload.type_id) {
        const existingEventType = await EventTypeRepository.findById(payload.type_id)
        if (!existingEventType) throw new AppError(StatusCodes.CONFLICT, ErrorServiceEnum.event_type_not_registered)
      }

      const updatableFields = [
        'name',
        'type_id',
        'start_date',
        'end_date',
        'meta',
        'is_active'
      ];

      const updatePayload = {}
      for (const field of updatableFields) {
        if (payload[field] !== undefined) updatePayload[field] = payload[field]
      }

      if (Object.keys(updatePayload).length === 0) {
        return {
          id: existingEvent.id,
          name: existingEvent.name,
          start_date: existingEvent.start_date,
          end_date: existingEvent.end_date
        };
      }

      const finalStartDate = updatePayload.start_date ?? existingEvent.start_date
      const finalEndDate = updatePayload.end_date ?? existingEvent.end_date
      if (finalStartDate >= finalEndDate) throw new AppError(StatusCodes.BAD_REQUEST, ErrorServiceEnum.start_date_must_be_lower_than_end_date);
      const now = Math.floor(Date.now() / 1000);
      if (finalEndDate < now) updatePayload.is_active = 0
      updatePayload.updated_at = now;
      await EventsRepository.update(existingEvent.id, updatePayload)
      const updatedEvent = await EventsRepository.findById(id);
      const result = {
        id: updatedEvent.id,
        name: updatedEvent.name,
        start_date: updatedEvent.start_date,
        end_date: updatedEvent.end_date,
        is_active: updatedEvent.is_active
      }
      return result
    } catch (error) {
      if (error instanceof AppError) throw error
      throw new AppError(StatusCodes.INTERNAL_SERVER_ERROR,'Update Event Internal Server Error')
    }
  }

  async createEventType(payload) {
    try {
      const { name, meta } = payload
      const existingEventType = await EventTypeRepository.findByName(name)
      if (existingEventType) throw new AppError(StatusCodes.CONFLICT, ErrorServiceEnum.event_type_registered)
      const now = Date.now()/ 1000
      const eventTypePayload = { name, meta, created_at: now, updated_at: now }
      const createEventType = await EventTypeRepository.create(eventTypePayload)
      const result = {
        id: createEventType.id,
        name: createEventType.name
      }
      return result
    } catch (error) {
      if (error instanceof AppError) throw error
      throw new AppError(StatusCodes.INTERNAL_SERVER_ERROR,'Create Event Type Internal Server Error')
    }
  }

  async updateEventType(payload) {
    try {
      const { id } = payload
      const existingEventType = await EventTypeRepository.findById(id)
      if (!existingEventType) throw new AppError(StatusCodes.CONFLICT, ErrorServiceEnum.event_type_not_registered)

      const updatableFields = [ 'name', 'meta' ];
      const updatePayload = {}
      for (const field of updatableFields) {
        if (payload[field] !== undefined) updatePayload[field] = payload[field]
      }

      if (Object.keys(updatePayload).length === 0) {
        return { id: existingEventType.id, name: existingEventType.name }
      }

      const now = Date.now()/ 1000
      updatePayload.updated_at = now;

      await EventTypeRepository.update(existingEventType.id, updatePayload)
      const updatedEventType = await EventTypeRepository.findById(id);
      const result = {
        id: updatedEventType.id,
        name: updatedEventType.name
      }
      return result
    } catch (error) {
      if (error instanceof AppError) throw error
      throw new AppError(StatusCodes.INTERNAL_SERVER_ERROR,'Update Event Type Internal Server Error')
    }
  }

  async deleteEventType(payload) {
    try {
      const { id } = payload
      const existingEventType = await EventTypeRepository.findById(id)
      if (!existingEventType) throw new AppError(StatusCodes.CONFLICT, ErrorServiceEnum.event_type_not_registered)
      const existingEvent = await EventsRepository.findByType(existingEventType.id)
      if(existingEvent.length > 0) throw new AppError(StatusCodes.CONFLICT, ErrorServiceEnum.event_still_available)
      await EventTypeRepository.delete(id)
      const result = { event_type_name: existingEventType.name }
      return result
    } catch (error) {
      if (error instanceof AppError) throw error
      throw new AppError(StatusCodes.INTERNAL_SERVER_ERROR,'Delete Event Type Internal Server Error')
    }
  }

  async listStudentByEvent(payload) {
    try {
      const id = payload.id
      const page = parseInt(payload?.page) || 1
      const limit = parseInt(payload?.limit) || 10
      const search = payload?.search || ''

      const existingEvent = await EventsRepository.findById(id)
      if(!existingEvent) throw new AppError(StatusCodes.CONFLICT, ErrorServiceEnum.event_not_registered)
      const { rows, count } = await StudentEventsRepository.findStudentsByEventPaginated({
        event_id: existingEvent.id, page, limit, search
      });

      const data = rows.map(item => ({
        student_event_uuid: item.uuid,
        is_finished: item.is_finished,
        student_uuid: item.student.uuid,
        student_name: item.student.name
      }))

      return {
        data: data,
        meta: {
          total: count,
          page,
          limit,
          total_page: Math.ceil(count / limit)
        }
      }

    } catch (error) {
      if (error instanceof AppError) throw error
      throw new AppError(StatusCodes.INTERNAL_SERVER_ERROR,'Gagal mengambil data event student')
    }
  }

  async detailStudentEvent(payload) {
    try {
      const { uuid } = payload
      const existingStudentEvent = await StudentEventsRepository.findByUuid(uuid)
      if (!existingStudentEvent) throw new AppError(StatusCodes.CONFLICT, ErrorServiceEnum.student_event_not_registered)
      const existingStudent = await StudentRepository.findById(existingStudentEvent.student_id)
      if (!existingStudent) throw new AppError(StatusCodes.CONFLICT, ErrorServiceEnum.student_not_registered)
      const existingEvent = await EventsRepository.findById(existingStudentEvent.event_id)
      if (!existingEvent) throw new AppError(StatusCodes.CONFLICT, ErrorServiceEnum.event_not_registered)
      const existingEventType = await EventTypeRepository.findById(existingEvent.type_id)
      if (!existingEventType) throw new AppError(StatusCodes.CONFLICT, ErrorServiceEnum.event_type_not_registered)
      const result = {
        student_name: existingStudent.name,
        event_name: existingEvent.name,
        event_type: existingEventType.name,
        start_date: existingEvent.start_date,
        end_date: existingEvent.end_date,
        is_finished: existingStudentEvent.is_finished,
        meta: parseMeta(existingStudentEvent.meta)
      }
      return result
    } catch (error) {
      if (error instanceof AppError) throw error
      throw new AppError(StatusCodes.INTERNAL_SERVER_ERROR,'Detail Student Event Internal Server Error')
    }
  }

  async deleteStudentEvent(payload) {
    try {
      const { uuid } = payload
      const existingStudentEvent = await StudentEventsRepository.findByUuid(uuid)
      if (!existingStudentEvent) throw new AppError(StatusCodes.CONFLICT, ErrorServiceEnum.student_event_not_registered)
      const existingStudent = await StudentRepository.findById(existingStudentEvent.student_id)
      if (!existingStudent) throw new AppError(StatusCodes.CONFLICT, ErrorServiceEnum.student_not_registered)
      const existingEvent = await EventsRepository.findById(existingStudentEvent.event_id)
      if (!existingEvent) throw new AppError(StatusCodes.CONFLICT, ErrorServiceEnum.event_not_registered)
      await StudentEventsRepository.deleteByUuid(uuid)
      const result = {
        student_name: existingStudent.name,
        event_name: existingEvent.name
      }
      return result
    } catch (error) {
      if (error instanceof AppError) throw error
      throw new AppError(StatusCodes.INTERNAL_SERVER_ERROR,'Delete Student Event Internal Server Error')
    }
  }

  async listEventType(payload) {
    try {
      const page = parseInt(payload?.page) || 1
      const limit = parseInt(payload?.limit) || 10
      const search = payload?.search || ''
      const { rows, count } = await EventTypeRepository.findAllPaginated({page,limit,search})

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
      throw new AppError(StatusCodes.INTERNAL_SERVER_ERROR,'Gagal mengambil data events type')
    }
  }
}

module.exports = EventService