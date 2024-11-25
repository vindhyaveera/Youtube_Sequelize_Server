'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('ShortsVideos', 'userid', {
      type: Sequelize.INTEGER,
      allowNull: false, // Adjust based on your requirements
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('ShortsVideos', 'userid', {
      type: Sequelize.STRING, // Revert back if necessary
      allowNull: false, // Adjust based on your requirements
    });
  },
};
