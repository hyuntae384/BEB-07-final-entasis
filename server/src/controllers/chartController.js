const { users, companys, dividend_his, position_his, price_his } = require('../models');
const { depositFaucet, sendEtherToUser } = require('../chainUtils/etherUtils');
const { restrictToken, isRestricted } = require('../chainUtils/tokenUtils');
const { circuitBreaker, chartData } = require('../app');

module.exports = {
  rtd: async (req, res, next) => {
    try {
      if(!chartData) return res.status(400).json({message: "No such data"});
      return res.status(200).json(chartData)
    } catch (err) {
      console.error(err);
      return next(err);
    }
  },

  total: async (req, res, next) => {
    // const { offset, limit } = req.query;
    try{
      const total = await price_his.findAll();
      if(!total) return res.status(400).json({message: "No such data"});
      return res.status(200).json(total)
    } catch (err) {
      console.error(err);
      return next(err);
    }
  },

  restrict: async (req, res, next) => {
    try {
      circuitBreaker = true;
      const status = await isRestricted();
      if(status) {
        console.log("이미 제한되어 있는 토큰")
        return res.status(400).send({message: "this token had already been restricted"})
      }
      const result = await restrictToken();
      if(result) {
        console.log("토큰 거래 제한 성공");
        return res.status(200).send({status: "successfully restricted the token"});
      }
      return res.status(400).send({status: "failed with the contract"});
    } catch (err) {
      console.error(err);
      return next(err);
    }
  }
}