'use strict';

const { DataTypes } = require('sequelize');

module.exports = {
  name: 'create-event-type',

  up: async ({ context: queryInterface }) => {
    await queryInterface.createTable('event_type', {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
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
    });
  },

  down: async ({ context: queryInterface }) => {
    await queryInterface.dropTable('event_type');
  }
};
