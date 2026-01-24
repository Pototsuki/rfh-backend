const sequelize = require('../config/database');

const Events = require('./event.model');
const EventType = require('./event-type.model');
const StudentEvents = require('./student-event.model');
const Student = require('./student.model');

StudentEvents.belongsTo(Events, {
  foreignKey: 'event_id',
  as: 'event'
});

Events.hasMany(StudentEvents, {
  foreignKey: 'event_id',
  as: 'student_events'
});

StudentEvents.belongsTo(Student, {
  foreignKey: 'student_id',
  as: 'student'
});

Student.hasMany(StudentEvents, {
  foreignKey: 'student_id',
  as: 'student_events'
});

Events.belongsTo(EventType, {
  foreignKey: 'type_id',
  as: 'type'
});

EventType.hasMany(Events, {
  foreignKey: 'type_id',
  as: 'events'
});

module.exports = {
  sequelize,
  Events,
  EventType,
  StudentEvents,
  Student
};