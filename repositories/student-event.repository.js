// const StudentEvents = require('../models/student-event.model');
const { StudentEvents, Events, EventType, Student } = require('../models');
const { Op, fn, col, where } = require('sequelize');

class StudentEventsRepository {

  async create(payload) {
    return StudentEvents.create(payload);
  }

  async update(id, payload) {
    return StudentEvents.update(payload, { where: { id } });
  }

  async findByStudent(student_id) {
    return StudentEvents.findAll({ where: { student_id } });
  }

  async findByEvent(event_id) {
    return StudentEvents.findAll({ where: { event_id } });
  }

  async delete(student_id, event_id) {
    return StudentEvents.destroy({
      where: { student_id, event_id }
    });
  }

  async countByEvent(event_id) {
    return StudentEvents.count({ where: { event_id } });
  }

  async findByStudentAndEvent(student_id, event_id) {
    return StudentEvents.findOne({ where: { student_id, event_id } });
  }

  async findByUuid(uuid) {
    return StudentEvents.findOne({ where: { uuid } });
  }

  async deleteByUuid(uuid) {
    return StudentEvents.destroy({
      where: { uuid }
    });
  }

  async findEventsByStudentPaginated({student_id, page = 1, limit = 10, search = ''}) {
    const offset = (page - 1) * limit;
    const eventWhere = {};
    if (search) {
      eventWhere[Op.and] = [
        where(fn('LOWER', col('event.name')), {
          [Op.like]: `%${search.toLowerCase()}%`
        })
      ];
    }

    const { rows, count } = await StudentEvents.findAndCountAll({
      where: { student_id },
      include: [
        {
          model: Events,
          as: 'event',
          where: eventWhere,
          required: true,
          include: [
            {
              model: EventType,
              as: 'type',
              required: false // event TANPA type masih boleh
            }
          ]
        }
      ],
      limit,
      offset,
      order: [['created_at', 'DESC']]
    });

    return { rows, count };
  }

  async findStudentsByEventPaginated({event_id, page = 1, limit = 10, search = ''}) {
    const offset = (page - 1) * limit;
    const studentWhere = {};

    if (search) {
      studentWhere[Op.and] = [
        where(fn('LOWER', col('student.name')), {
          [Op.like]: `%${search.toLowerCase()}%`
        })
      ];
    }

    const { rows, count } = await StudentEvents.findAndCountAll({
      where: { event_id },
      include: [
        {
          model: Student,
          as: 'student',
          required: true,
          where: studentWhere
        }
      ],
      limit,
      offset,
      order: [['created_at', 'DESC']]
    });

    return { rows, count };
  }
}

module.exports = new StudentEventsRepository();