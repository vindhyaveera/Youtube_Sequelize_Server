"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class ShortsVideos extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      ShortsVideos.belongsTo(models.User, { foreignKey: "userid", as: "shortvideos" });
    }
  }
  ShortsVideos.init(
    {
      userid: DataTypes.STRING,
      img: DataTypes.STRING,
      name: DataTypes.STRING,
      dots: DataTypes.STRING,
      rates: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "ShortsVideos",
    }
  );
  return ShortsVideos;
};
