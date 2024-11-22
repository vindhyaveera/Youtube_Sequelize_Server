"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("ShortsVideos", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },

      userid: {
        type: Sequelize.STRING,
      },
      img: {
        type: Sequelize.STRING,
      },
      name: {
        type: Sequelize.STRING,
      },
      dots: {
        type: Sequelize.STRING,
      },
      rates: {
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("ShortsVideos");
  },
};
