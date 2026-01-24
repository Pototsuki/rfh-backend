'use strict';

const { DataTypes } = require('sequelize');

module.exports = {
  name: 'create-events',

  up: async ({ context: queryInterface }) => {
    await queryInterface.createTable('events', {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
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

      meta: {
        type: DataTypes.TEXT('long'),
        allowNull: true
      },

      is_active: {
        type: DataTypes.TINYINT.UNSIGNED,
        allowNull: false,
        defaultValue: 1 // 1 = aktif, 0 = tidak aktif
      },

      created_at: {
        type: DataTypes.BIGINT,
        allowNull: false
      },

      updated_at: {
        type: DataTypes.BIGINT,
        allowNull: true
      }
    });
  },

  down: async ({ context: queryInterface }) => {
    await queryInterface.dropTable('events');
  }
};
