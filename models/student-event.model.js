const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const StudentEvents = sequelize.define('student_events', {
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true
  },

  uuid: {
    type: DataTypes.CHAR(36),
    allowNull: false,
    unique: true
  },

  student_id: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false
  },

  event_id: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false
  },

  is_finished: {
    type: DataTypes.TINYINT.UNSIGNED,
    allowNull: false,
    defaultValue: 0 // 1 = finish, 0 = on progress
  },

  created_at: {
    type: DataTypes.BIGINT,
    allowNull: false
  },

  updated_at: {
    type: DataTypes.BIGINT,
    allowNull: true
  }
}, {
  timestamps: false,
  tableName: 'student_events'
});

module.exports = StudentEvents;
