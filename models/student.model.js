const { DataTypes } = require('sequelize')
const sequelize = require('../config/database')

const Student = sequelize.define('students', {
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
  name: {
    type: DataTypes.STRING(150),
    allowNull: false
  },
  email: {
    type: DataTypes.STRING(150),
    allowNull: false,
    unique: true
  },
  phone: {
    type: DataTypes.STRING(20),
    allowNull: true
  },
  address: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  created_at: {
    type: DataTypes.BIGINT,
    allowNull: false
  },
  updated_at: {
    type: DataTypes.BIGINT,
    allowNull: false
  },
  is_deleted: {
    type: DataTypes.TINYINT,
    allowNull: false,
    defaultValue: 0
  },
  deleted_at: {
    type: DataTypes.BIGINT,
    allowNull: true
  }
}, {
  tableName: 'students',
  timestamps: false
})

module.exports = Student
