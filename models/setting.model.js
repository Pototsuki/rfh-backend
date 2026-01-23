const { DataTypes } = require('sequelize')
const sequelize = require('../config/database')

const Setting = sequelize.define('settings', {
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true
  },
  key: {
    type: DataTypes.STRING(100),
    allowNull: false,
    unique: true
  },
  value: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  created_at: {
    type: DataTypes.BIGINT,
    allowNull: false
  },
  updated_at: {
    type: DataTypes.BIGINT,
    allowNull: false
  }
}, {
  tableName: 'settings',
  timestamps: false
})

module.exports = Setting
