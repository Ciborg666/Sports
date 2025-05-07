'use strict';

const bcrypt = require('bcrypt');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const hashedPassword = await bcrypt.hash('password_for_manager', 10); // Хешируем пароль

    await queryInterface.bulkInsert('Users', [
      {
        username: 'manager1',
        password: hashedPassword,
        email: 'manager1@example.com',
        role: 'manager',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        username: 'user1',
        password: 'hashed_password_2', // Храните захешированные пароли!
        email: 'user1@example.com',
        role: 'user',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Users', null, {});
  }
};