'use strict';

const { DataTypes } = require('sequelize');

module.exports = {
  name: 'create-admins',

  up: async ({ context: queryInterface }) => {
    await queryInterface.createTable('admins', {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
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
    });
  },

  down: async ({ context: queryInterface }) => {
    await queryInterface.dropTable('admins');
  }
};
