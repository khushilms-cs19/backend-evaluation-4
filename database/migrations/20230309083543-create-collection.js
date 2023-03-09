'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('collections', {
      collectionId: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4
      },
      contentTypeId: {
        type: Sequelize.STRING
      },
      data: {
        type: Sequelize.ARRAY(Sequelize.JSONB),
        defaultValue: []
      },
      columns: {
        type: Sequelize.ARRAY(Sequelize.STRING),
        defaultValue: [],
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
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('collections');
  }
};