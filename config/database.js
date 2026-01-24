const { Sequelize } = require('sequelize')

const dbConfig = require('./db.config')

const sequelize = new Sequelize(
  dbConfig.database,
  dbConfig.username,
  dbConfig.password,
  {
    host: dbConfig.host,
    port: dbConfig.port,
    dialect: dbConfig.dialect,
    logging: false,
    timezone: '+00:00',
    dialectOptions: {
      dateStrings: true,
      typeCast: true
    }
  }
)

module.exports = sequelize