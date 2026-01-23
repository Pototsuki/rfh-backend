const AppError = require('../helpers/app-error')
const { StatusCodes } = require('http-status-codes')
const { AdminRoleEnum } = require('../enums/admin-role.enum')

const adminAuthenticate = (req, res, next) => {
  try {
    if (!req.user) {
      throw new AppError(
        StatusCodes.UNAUTHORIZED,
        'Unauthorized'
      )
    }

    if (
      req.user.role !== AdminRoleEnum.ADMIN &&
      req.user.role !== AdminRoleEnum.SUPERADMIN
    ) {
      throw new AppError(
        StatusCodes.FORBIDDEN,
        'Access denied'
      )
    }

    next()
  } catch (error) {
    next(error)
  }
}

module.exports = adminAuthenticate
