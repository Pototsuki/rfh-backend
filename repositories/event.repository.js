const { Op, where, fn, col } = require('sequelize');
const Events = require('../models/event.model');

class EventsRepository {

  async findById(id) {
    return Events.findOne({ where: { id } });
  }

  async findAll() {
    return Events.findAll();
  }

  async findByType(type_id) {
    return Events.findAll({ where: { type_id } });
  }

  async create(payload) {
    return Events.create(payload);
  }

  async update(id, payload) {
    return Events.update(payload, { where: { id } });
  }

  async delete(id) {
    return Events.destroy({ where: { id } });
  }

  async countAll() {
    return Events.count();
  }

  async findByNameAndType(name, type_id) {
    return Events.findOne({ where: { name, type_id } });
  }

  async findAllPaginated({ page = 1, limit = 10, search = '' }) {
    const offset = (page - 1) * limit

    const whereClause = {}
  
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

    const { rows, count } = await Events.findAndCountAll({
      where: whereClause,
      limit,
      offset,
      order: [['created_at', 'DESC']]
    })

    return { rows, count }
  }

  async findAllByIdPaginated({ page = 1, limit = 10, search = '', id = [] }) {
    const offset = (page - 1) * limit

    const whereClause = {}
  
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

    if (Array.isArray(id) && id.length > 0) {
      whereClause.id = {[Op.in]: id};
    }

    const { rows, count } = await Events.findAndCountAll({
      where: whereClause,
      limit,
      offset,
      order: [['created_at', 'DESC']]
    })

    return { rows, count }
  }
}

module.exports = new EventsRepository();
