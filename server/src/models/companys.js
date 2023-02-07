'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class companys extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  companys.init({
    wallet: DataTypes.STRING,
    name: DataTypes.STRING,
    contract_address: DataTypes.STRING,
    asset: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'companys',
  });
  return companys;
};