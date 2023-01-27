const { users, companys, dividend_his, position_his, price_his } = require('../models');
const { depositFaucet, sendEtherToUser } = require('../chainUtils/etherUtils');
const { getTokenBalance, getTokenName, signAndSendTx, sendTokenToUser } = require('../chainUtils/tokenUtils');

module.exports = {
    buy: async(req,res,next)=> {
        const {name,price,amount,wallet} = req.body;
        // 조금 개선하면 불필요한 쿼리라고 생각 
        const excompany = await companys.findOne({
            where: { name },
          });
        try {
            // 디비에서의 로직 컨트랙트는 따로 짜야함
            if(!name || !excompany) return res.status(400).json({status : "fail"});
            await position_his.create({
                wallet: wallet,
                order: 'buy',
                price: price,
                amount : amount,
                // 수수료 계산
                //fee: price * amount * 0.05
                create_at: new Date()
            });
            return res.status(200).json({status : "success"});
        } catch (err) {
            console.err(err);
            return next(err);
        }
    },
    sell: async(req,res,next)=> {
        const {name,price,amount,wallet} = req.body;
        // 찾아보면 더 효율적인 방법이 있을것같음
        const excompany = await companys.findOne({
            where: { name },
          });
        try {
            // 디비에서의 로직 컨트랙트는 따로 짜야함
            if(!name || !excompany) return res.status(400).json({status : "fail"});
            await position_his.create({
                wallet: wallet,
                order: 'sell',
                price: price,
                amount : amount,
                // 수수료 계산
                //fee: price * amount * 0.05
                create_at: new Date()
            });
            return res.status(200).json({status : "success"});
        } catch (err) {
            console.err(err);
            return next(err);
        }
    }
}