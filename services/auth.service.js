const { StatusCodes } = require('http-status-codes')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const AdminRepository = require('../repositories/admin.repository')
const SettingRepository = require('../repositories/setting.repository')
const AppError = require('../helpers/app-error')
const { AdminRoleEnum } = require('../enums/admin-role.enum')
const { ErrorServiceEnum } = require('../enums/errors.enum')

class AuthService {
  
  async login(payload) {
    try {
      const { username, password } = payload
      const admin = await AdminRepository.findByUsername(username)
      if(!admin) throw new AppError(StatusCodes.UNAUTHORIZED, ErrorServiceEnum.wrong_username_password)
      const isMatch = await bcrypt.compare(password, admin.password)
      if(!isMatch) throw new AppError(StatusCodes.UNAUTHORIZED, ErrorServiceEnum.wrong_username_password)
      const token = jwt.sign({ id: admin.id, role: admin.role }, process.env.JWT_SECRET,{ expiresIn: '1d' })
      const data = { token, id: admin.id, username: admin.username, role: admin.role }
      return data      
    } catch (error) {
      if (error instanceof AppError) throw error
      throw new AppError(StatusCodes.INTERNAL_SERVER_ERROR,'Login Internal Server Error')
    }
  }

  async register(payload) {
    try {
      const { username, password } = payload
      const existingAdmin = await AdminRepository.findByUsername(username)
      if(existingAdmin) throw new AppError(StatusCodes.CONFLICT, ErrorServiceEnum.username_registered)
      const adminCount = await AdminRepository.countAll()
      const AdminCountSetting = await SettingRepository.getByKey('admin_count')
      const maxAdmin = AdminCountSetting?.value || 3
      if(adminCount > maxAdmin) throw new AppError(StatusCodes.FORBIDDEN, ErrorServiceEnum.max_admin_count_reached)
      const hashedPassword = await bcrypt.hash(password, 10)
      const payloadAdmin = {
        username: username,
        password: hashedPassword,
        role: AdminRoleEnum.ADMIN,
        created_at: Date.now()/ 1000,
        updated_at: Date.now()/ 1000
      }
      const admin = await AdminRepository.create(payloadAdmin)
      const token = jwt.sign({ id: admin.id, role: admin.role }, process.env.JWT_SECRET,{ expiresIn: '1d' })
      const data = { token, id: admin.id, username: admin.username, role: admin.role }
      return data      
    } catch (error) {
      if (error instanceof AppError) throw error
      throw new AppError(StatusCodes.INTERNAL_SERVER_ERROR,'Register Internal Server Error')
    }
  }

  async resetPassword(payload) {
    try {
      const { username, password, secret_key } = payload
      if(secret_key !== process.env.SECRET_KEY) throw new AppError(StatusCodes.UNAUTHORIZED, ErrorServiceEnum.do_not_have_access)
      const admin = await AdminRepository.findByUsername(username)
      if(!admin) throw new AppError(StatusCodes.CONFLICT, ErrorServiceEnum.username_not_registerd)
      const hashedPassword = await bcrypt.hash(password, 10)
      const payloadUpdatePassword = { password: hashedPassword, updated_at: Date.now()}
      await AdminRepository.update(admin.id, payloadUpdatePassword)
      const data = {}
      return data      
    } catch (error) {
      if (error instanceof AppError) throw error
      throw new AppError(StatusCodes.INTERNAL_SERVER_ERROR,' Reset Internal Server Error')
    }
  }

  async getUser(payload) {
    try {
      const user = payload
      const admin = await AdminRepository.findByIdAndRole(user.id, user.role)
      if(!admin) throw new AppError(StatusCodes.CONFLICT, ErrorServiceEnum.username_not_registerd)
      const result = { id: admin.id, username: admin.username, role: admin.role }
      return result      
    } catch (error) {
      if (error instanceof AppError) throw error
      throw new AppError(StatusCodes.INTERNAL_SERVER_ERROR,'Get User Internal Server Error')
    }
  }
}

module.exports = AuthService