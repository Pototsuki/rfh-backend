const { StatusCodes } = require('http-status-codes')
const SettingRepository = require('../repositories/setting.repository')
const StudentRepository = require('../repositories/student.repository')
const AppError = require('../helpers/app-error')
const { v4: uuidv4 } = require('uuid')

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
      if (existingStudent) throw new AppError(StatusCodes.CONFLICT,'Email sudah terdaftar')
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
      if (!existingStudent) throw new AppError(StatusCodes.CONFLICT,'Student tidak terdaftar')
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
      if (!existingStudent) throw new AppError(StatusCodes.CONFLICT,'Student tidak terdaftar')
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
}

module.exports = StudentService