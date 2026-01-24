const { DataTypes } = require('sequelize')
const sequelize = require('../config/database')

const Admin = sequelize.define('admins', {
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true
  },
  username: {
    type: DataTypes.STRING(100),
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  role: {
    type: DataTypes.TINYINT.UNSIGNED,
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
  timestamps: false,
  tableName: 'admins'
})

module.exports = Admin