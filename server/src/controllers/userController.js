const { users, companys, dividend_his, position_his, price_his } = require('../models');
const { depositFaucet, sendEtherToUser } = require('../chainUtils/etherUtils');
const { getTokenBalance, getTokenName, signAndSendTx, sendTokenToUser } = require('../chainUtils/tokenUtils');

module.exports = {
  enroll: async (req, res, next) => {
    const { wallet } = req.query;
    const userInfo = await users.findOne({
      where: { wallet },
    });
    try {
      if(userInfo === null) {
        const enrollNewWallet = await users.create({
          wallet,
        })
        const result = {
          status: "success",
          name: enrollNewWallet.name,
          visited: false,
          cnt: enrollNewWallet.cnt
        }
        return res.status(200).json(result);
      }
      const result = {
        status: "success",
        name: userInfo.name,
        visited: true,
        cnt: userInfo.cnt
      }
      return res.status(200).json(result);
    } catch (err) {
      console.error(err);
      return next(err);
    }
  }
}