"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class WatchLater extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Define associations
      WatchLater.belongsTo(models.User, { foreignKey: "userId" });
      WatchLater.belongsTo(models.BigVideos, { foreignKey: "bigVideosId" });
      WatchLater.belongsTo(models.ShortsVideos, {
        foreignKey: "shortVideosId",
      });
    }
  }
  
  WatchLater.init(
    {
      userId: DataTypes.INTEGER,
      bigVideosId: DataTypes.INTEGER,
      shortVideosId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "WatchLater",
    }
  );
  return WatchLater;
};
