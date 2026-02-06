'use strict';

const { DataTypes } = require('sequelize');

module.exports = {
  name: 'create-student-events',

  up: async ({ context: queryInterface }) => {
    await queryInterface.createTable('student_events', {
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

      student_id: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false
      },

      event_id: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false
      },

      is_finished: {
        type: DataTypes.TINYINT.UNSIGNED,
        allowNull: false,
        defaultValue: 0 // 1 = finish, 0 = on progress
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
    });

    // 🔐 Prevent duplicate student-event pairs
    await queryInterface.addConstraint('student_events', {
      fields: ['student_id', 'event_id'],
      type: 'unique',
      name: 'unique_student_event'
    });
  },

  down: async ({ context: queryInterface }) => {
    await queryInterface.dropTable('student_events');
  }
};
