'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class enta_his extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  enta_his.init({
    createdAt: DataTypes.DATE,
    open: DataTypes.FLOAT,
    close: DataTypes.FLOAT,
    high: DataTypes.FLOAT,
    low: DataTypes.FLOAT,
    totalVolTo: DataTypes.FLOAT,
    totalVolFrom: DataTypes.FLOAT
  }, {
    sequelize,
    modelName: 'enta_his',
  });
  return enta_his;
};