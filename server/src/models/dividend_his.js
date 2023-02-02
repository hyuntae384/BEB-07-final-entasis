'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class dividend_his extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      dividend_his.belongsTo(models.companys, { foreignKey: 'company_wallet', sourceKey: 'wallet' });
    }
  }
  dividend_his.init({
    company_wallet: DataTypes.STRING,
    income: DataTypes.INTEGER,
    dividend_ratio: DataTypes.STRING,
    dividend: DataTypes.INTEGER,
    next_ratio: DataTypes.STRING,
    voted_ratio: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'dividend_his',
  });
  return dividend_his;
};