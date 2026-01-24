const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const EventType = sequelize.define('event_type', {
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true
  },

  name: {
    type: DataTypes.STRING(100),
    allowNull: false
  },

  meta: {
    type: DataTypes.TEXT,
    allowNull: true
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
  tableName: 'event_type'
});

module.exports = EventType;
