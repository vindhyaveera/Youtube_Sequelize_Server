"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn("BigVideos", "userid", {
      type: Sequelize.INTEGER,
      allowNull: false, // Adjust as needed
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn("BigVideos", "userid", {
      type: Sequelize.STRING, // Revert to the previous type
      allowNull: false, // Adjust as needed
    });
  },
};
