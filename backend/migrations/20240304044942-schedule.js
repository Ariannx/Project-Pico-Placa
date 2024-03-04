'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('schedule', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      day: {
        type: Sequelize.STRING,
        allowNull: false
      },
      forbiddenDigit: {
        type: Sequelize.ARRAY(Sequelize.INTEGER),
        allowNull: true,
      },
      hours: {
        type: Sequelize.JSONB,
        allowNull: false
      },
      active: {
        type: Sequelize.BOOLEAN,
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });

    const currentDate = new Date();

    const datos = [
      {
        day: 'lunes',
        forbiddenDigit: [1, 2],
        hours: JSON.stringify([
          { startHour: '06:00:00', endHour: '09:30:00' },
          { startHour: '16:00:00', endHour: '20:00:00' }
        ]),
        active: true,
        createdAt: currentDate,
        updatedAt: currentDate
      },
      {
        day: 'martes',
        forbiddenDigit: [3, 4],
        hours: JSON.stringify([
          { startHour: '06:00:00', endHour: '09:30:00' },
          { startHour: '16:00:00', endHour: '20:00:00' }
        ]),
        active: true,
        createdAt: currentDate,
        updatedAt: currentDate
      },
      {
        day: 'miércoles',
        forbiddenDigit: [5, 6],
        hours: JSON.stringify([
          { startHour: '06:00:00', endHour: '09:30:00' },
          { startHour: '16:00:00', endHour: '20:00:00' }
        ]),
        active: true,
        createdAt: currentDate,
        updatedAt: currentDate
      },
      {
        day: 'jueves',
        forbiddenDigit: [7, 8],
        hours: JSON.stringify([
          { startHour: '06:00:00', endHour: '09:30:00' },
          { startHour: '16:00:00', endHour: '20:00:00' }
        ]),
        active: true,
        createdAt: currentDate,
        updatedAt: currentDate
      },
      {
        day: 'viernes',
        forbiddenDigit: [9, 0],
        hours: JSON.stringify([
          { startHour: '06:00:00', endHour: '09:30:00' },
          { startHour: '16:00:00', endHour: '20:00:00' }
        ]),
        active: true,
        createdAt: currentDate,
        updatedAt: currentDate
      },
      {
        day: 'sábado',
        forbiddenDigit: null,
        hours: JSON.stringify([
          { startHour: null, endHour: null }
        ]),
        active: false,
        createdAt: currentDate,
        updatedAt: currentDate
      },
      {
        day: 'domingo',
        forbiddenDigit: null,
        hours: JSON.stringify([
          { startHour: null, endHour: null }
        ]),
        active: false,
        createdAt: currentDate,
        updatedAt: currentDate
      }
    ];

    await queryInterface.bulkInsert('schedule', datos, {});

  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('schedule');
  }
};
