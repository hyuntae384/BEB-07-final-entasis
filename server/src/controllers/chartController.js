const { price_his, enta_his, beb_his, leo_his } = require('../models');
const { depositFaucet, sendEtherToUser } = require('../chainUtils/etherUtils');
const { restrictToken, isRestricted } = require('../chainUtils/ENTAUtils');

module.exports = {
  // offset, limit에 대한 쿼리가 없을 경우에 대한 경우도 작성하기
  enta: async (req, res, next) => {
    const { offset, limit } = req.query;
    try{
      if (!offset || !limit) {
          return res.status(400).send("not enough query");
      }
      const entaprice = await enta_his.findAll({
        offset: Number(offset),
        limit: Number(limit)
      });
      const total = await enta_his.findAll();
      if(!total) return res.status(400).json({message: "No such data"});
      
      return res.status(200).json({ priceinfo: entaprice, totalLength: total.length });

    } catch (err) {
      console.error(err);
      return next(err);
    }
  },

  beb: async (req, res, next) => {
    const { offset, limit } = req.query;
    try{
      if (!offset || !limit) {
          return res.status(400).send("not enough query");
      }
      const bebprice = await beb_his.findAll({
        offset: Number(offset),
        limit: Number(limit)
      });
      const total = await beb_his.findAll();
      if(!total) return res.status(400).json({message: "No such data"});
      
      return res.status(200).json({ priceinfo: bebprice, totalLength: total.length });

    } catch (err) {
      console.error(err);
      return next(err);
    }
  },

  leo: async (req, res, next) => {
    const { offset, limit } = req.query;
    try{
      if (!offset || !limit) {
          return res.status(400).send("not enough query");
      }
      const leoprice = await leo_his.findAll({
        offset: Number(offset),
        limit: Number(limit)
      });
      const total = await leo_his.findAll();
      if(!total) return res.status(400).json({message: "No such data"});
      
      return res.status(200).json({ priceinfo: leoprice, totalLength: total.length });

    } catch (err) {
      console.error(err);
      return next(err);
    }
  }
}