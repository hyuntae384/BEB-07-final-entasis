const { users, companys, dividend_his, position_his, price_his } = require('../models');
const { depositFaucet, sendEtherToUser } = require('../chainUtils/etherUtils');
const { restrictToken, isRestricted } = require('../chainUtils/tokenUtils');

module.exports = {
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
}