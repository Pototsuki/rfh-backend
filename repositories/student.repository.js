const { Op, fn, col, where } = require('sequelize')
const Student = require('../models/student.model')

class StudentRepository {

  async findByEmail(email) {
    return Student.findOne({ where: { email, is_deleted: 0 } })
  }

  async findByUUID(uuid) {
    return Student.findOne({ where: { uuid, is_deleted: 0 } })
  }

  async create(payload) {
    return Student.create(payload)
  }

  async update(id, payload) {
    return Student.update(payload,{ where: { id }})
  }

  async findAllPaginated({ page = 1, limit = 10, search = '' }) {
    const offset = (page - 1) * limit

    const whereClause = { is_deleted: 0 }
  
    if (search) {
      whereClause[Op.and] = [
        where(
          fn('LOWER', col('name')),
          {
            [Op.like]: `%${search.toLowerCase()}%`
          }
        )
      ]
    }

    const { rows, count } = await Student.findAndCountAll({
      where: whereClause,
      limit,
      offset,
      order: [['created_at', 'DESC']]
    })

    return {
      rows,
      count
    }
  }

}

module.exports = new StudentRepository()
