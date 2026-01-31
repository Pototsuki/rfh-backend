const EventType = require('../models/event-type.model');

class EventTypeRepository {

  async findById(id) {
    return EventType.findOne({ where: { id } });
  }

  async findAll() {
    return EventType.findAll();
  }

  async create(payload) {
    return EventType.create(payload);
  }

  async countAll() {
    return EventType.count();
  }

  async update(id, payload) {
    return EventType.update(payload, { where: { id } });
  }

  async delete(id) {
    return EventType.destroy({ where: { id } });
  }

  async findByName(name) {
    return EventType.findOne({ where: { name } });
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

    const { rows, count } = await EventType.findAndCountAll({
      where: whereClause,
      limit,
      offset,
      order: [['created_at', 'DESC']]
    })

    return { rows, count }
  }

}

module.exports = new EventTypeRepository();
