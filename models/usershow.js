'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserShow extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  UserShow.init({
    userId: DataTypes.INTEGER,
    showId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'UserShow',
  });
  return UserShow;
};