'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class price extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  price.init({
    open: DataTypes.FLOAT,
    close: DataTypes.FLOAT,
    high: DataTypes.FLOAT,
    low: DataTypes.FLOAT,
    totalVolTo: DataTypes.FLOAT,
    totalVolFrom: DataTypes.FLOAT,
    createdAt: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'price',
  });
  return price;
};