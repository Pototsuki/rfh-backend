'use strict';

const { DataTypes } = require('sequelize');

module.exports = {
  name: 'create-students',

  up: async ({ context: queryInterface }) => {
    await queryInterface.createTable('students', {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
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
    });
  },

  down: async ({ context: queryInterface }) => {
    await queryInterface.dropTable('students');
  }
};
