'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Videos extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Videos.belongsTo(models.User, { foreignKey: "userid", as: "user" });
    }
  }
  Videos.init({
    UserId: DataTypes.INTEGER,
    BigVideosId: DataTypes.INTEGER,
    ShortVideosId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Videos',
  });
  return Videos;
};