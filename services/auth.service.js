const { StatusCodes } = require('http-status-codes')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const AdminRepository = require('../repositories/admin.repository')
const SettingRepository = require('../repositories/setting.repository')
const AppError = require('../helpers/app-error')
const { AdminRoleEnum } = require('../enums/admin-role.enum')

class AuthService {
  
  async login(payload) {
    try {
      const { username, password } = payload
      const admin = await AdminRepository.findByUsername(username)
      if(!admin) throw new AppError(StatusCodes.UNAUTHORIZED, 'Username atau password salah')
      const isMatch = await bcrypt.compare(password, admin.password)
      if(!isMatch) throw new AppError(StatusCodes.UNAUTHORIZED, 'Username atau password salah')
      const token = jwt.sign({ id: admin.id, role: admin.role }, process.env.JWT_SECRET,{ expiresIn: '1d' })
      const data = { token, id: admin.id, username: admin.username, role: admin.role }
      return data      
    } catch (error) {
      if (error instanceof AppError) throw error
      throw new AppError(StatusCodes.INTERNAL_SERVER_ERROR,'Internal Server Error')
    }
  }

  async register(payload) {
    try {
      const { username, password } = payload
      const existingAdmin = await AdminRepository.findByUsername(username)
      if(existingAdmin) throw new AppError(StatusCodes.CONFLICT, 'Username sudah terdaftar')
      const adminCount = await AdminRepository.countAll()
      const AdminCountSetting = await SettingRepository.getByKey('admin_count')
      const maxAdmin = AdminCountSetting.value || 3
      if(adminCount > maxAdmin) throw new AppError(StatusCodes.FORBIDDEN, 'Max Admin Count Reached')
      const hashedPassword = await bcrypt.hash(password, 10)
      const payloadAdmin = {
        username: username,
        password: hashedPassword,
        role: AdminRoleEnum.ADMIN,
        created_at: Date.now(),
        updated_at: Date.now()
      }
      const admin = await AdminRepository.create(payloadAdmin)
      const token = jwt.sign({ id: admin.id, role: admin.role }, process.env.JWT_SECRET,{ expiresIn: '1d' })
      const data = { token, id: admin.id, username: admin.username, role: admin.role }
      return data      
    } catch (error) {
      if (error instanceof AppError) throw error
      throw new AppError(StatusCodes.INTERNAL_SERVER_ERROR,'Internal Server Error')
    }
  }

  async resetPassword(payload) {
    try {
      const { username, password, secret_key } = payload
      if(secret_key !== process.env.SECRET_KEY) throw new AppError(StatusCodes.UNAUTHORIZED, 'Kamu tidak memiliki akses')
      const admin = await AdminRepository.findByUsername(username)
      if(!admin) throw new AppError(StatusCodes.CONFLICT, 'Username tidak terdaftar')
      const hashedPassword = await bcrypt.hash(password, 10)
      const payloadUpdatePassword = { password: hashedPassword, updated_at: Date.now()}
      await AdminRepository.update(admin.id, payloadUpdatePassword)
      const data = {}
      return data      
    } catch (error) {
      if (error instanceof AppError) throw error
      throw new AppError(StatusCodes.INTERNAL_SERVER_ERROR,'Internal Server Error')
    }
  }
}

module.exports = AuthService