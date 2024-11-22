"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("BigVideos", {
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
      desc: {
        type: Sequelize.STRING,
      },
      dots: {
        type: Sequelize.STRING,
      },
      source: {
        type: Sequelize.STRING,
      },
      rates: {
        type: Sequelize.STRING,
      },
      showButtons: {
        type: Sequelize.BOOLEAN,
      },
      channel: {
        type: Sequelize.STRING,
      },
      subscribers: {
        type: Sequelize.STRING,
      },
      likes: {
        type: Sequelize.STRING,
      },
      dislikes: {
        type: Sequelize.STRING,
      },
      fullDescription: {
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
    await queryInterface.dropTable("BigVideos");
  },
};
