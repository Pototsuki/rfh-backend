const Admin = require('../models/admin.model')

class AdminRepository {

  async findByUsername(username) {
    return Admin.findOne({ where: { username } })
  }

  async create(payload) {
    return Admin.create(payload)
  }

  async countAll() {
    return Admin.count()
  }

  async update(id, payload) {
    return Admin.update(payload,{ where: { id }})
  }

}

module.exports = new AdminRepository()