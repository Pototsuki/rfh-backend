const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Events = sequelize.define('events', {
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true
  },

  name: {
    type: DataTypes.STRING(150),
    allowNull: false
  },

  type_id: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false
  },

  start_date: {
    type: DataTypes.BIGINT,
    allowNull: false
  },

  end_date: {
    type: DataTypes.BIGINT,
    allowNull: false
  },

  is_active: {
    type: DataTypes.TINYINT.UNSIGNED,
    allowNull: false,
    defaultValue: 1 // 1 = aktif, 0 = tidak aktif
  },

  meta: {
    type: DataTypes.TEXT('long'),
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
  tableName: 'events'
});

module.exports = Events;
