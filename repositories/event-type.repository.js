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

}

module.exports = new EventTypeRepository();
