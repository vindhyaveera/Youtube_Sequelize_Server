"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class BigVideos extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      BigVideos.belongsTo(models.User, { foreignKey: "userid", as: "bigvideos" });
    }
  }

  BigVideos.init(
    {
      userid: DataTypes.STRING,
      img: DataTypes.STRING,
      name: DataTypes.STRING,
      desc: DataTypes.STRING,
      dots: DataTypes.STRING,
      source: DataTypes.STRING,
      rates: DataTypes.STRING,
      showButtons: DataTypes.BOOLEAN,
      channel: DataTypes.STRING,
      subscribers: DataTypes.STRING,
      likes: DataTypes.STRING,
      dislikes: DataTypes.STRING,
      fullDescription: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "BigVideos",
    }
  );
  return BigVideos;
};
