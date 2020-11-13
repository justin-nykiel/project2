'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class review extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.review.belongsTo(models.show)
      models.review.belongsTo(models.user)
    }
  };
  review.init({
    rating: DataTypes.INTEGER,
    bingeworthy: DataTypes.BOOLEAN,
    review: DataTypes.STRING,
    userId: DataTypes.INTEGER,
    showId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'review',
  });
  return review;
};