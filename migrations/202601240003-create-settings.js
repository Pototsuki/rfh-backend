'use strict';

const { DataTypes } = require('sequelize');

module.exports = {
  name: 'create-settings',

  up: async ({ context: queryInterface }) => {
    await queryInterface.createTable('settings', {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
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
    });
  },

  down: async ({ context: queryInterface }) => {
    await queryInterface.dropTable('settings');
  }
};
