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
            // 거래소랑만 거래하기 때문에 이 부분은 당장은 필요 없을 수 있음
            if(!name || !excompany) return res.status(400).json({status : "fail", message: "there's a problem with the name"});
            // 클라이언트에서 메타마스크를 통해 거래소로 이더 전송(수수료도 전송해야 함)
            // 컨트랙트를 통해 거래소에서 유저에게 토큰 전송(거래소이기 때문에 수수료 메소드는 따로 x)
            const buyToken = await sendTokenToUser(wallet, amount);
            if(buyToken) {
                await position_his.create({
                    user_wallet: wallet,
                    order: 'buy',
                    price: price,
                    amount : amount,
                    fee: price * amount * 0.0004
                });
                return res.status(200).json({status : "success"});
            }
            return res.status(400).json({status: "fail", message: "failed to send token through contract"})
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
            // 거래소랑만 거래하기 때문에 이 부분은 당장은 필요 없을 수 있음
            if(!name || !excompany) return res.status(400).json({status : "fail", message: "there's a problem with the name"});
            // 클라이언트에서 메타마스크를 통해 거래소로 토큰 전송(수수료도 전송해야 함)
            // web3를 통해 거래소에서 유저에게 이더 전송
            const value = price * amount;
            const sellToken = await sendEtherToUser(wallet, value);
            if(sellToken){
                await position_his.create({
                    user_wallet: wallet,
                    order: 'sell',
                    price: price,
                    amount : amount,
                    fee: price * amount * 0.0004
                });
                return res.status(200).json({status : "success"});
            }
            return res.status(400).json({status: "fail", message: "failed to send ether through contract"})
        } catch (err) {
            console.err(err);
            return next(err);
        }
    }
}