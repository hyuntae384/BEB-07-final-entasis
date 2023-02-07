const { position_his } = require('../models');
const { sendWeiToUser, sendEtherToUser, getEtherBalance } = require('../chainUtils/etherUtils');
const { sendLEOTokenToUser, restrictLEOToken, allowLEOToken, isRestrictedLEO } = require('../chainUtils/LEOUtils');
const { LEO_Contract } = require('../chainUtils/index')

module.exports = {
    buy: async(req,res,next)=> {
        const {price,amount,wallet} = req.body;
        try {
            if(!price || !amount || !wallet) return res.status(400).json({status : "fail", message: "there's a problem with body"});
            // 클라이언트 : 메타마스크를 통해 거래소로 이더 전송(수수료도 전송해야 함)

            // 서버 : 컨트랙트를 통해 거래소에서 유저에게 토큰 전송(거래소이기 때문에 수수료 메소드는 따로 x)
            const buyToken = await sendLEOTokenToUser(wallet, amount);
            if(buyToken) {
                await position_his.create({
                    user_wallet: wallet,
                    order: 'buy',
                    price: price,
                    amount: amount,
                    fee: price * amount * 0.0004,
                    token_name: "LEOToken"
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
        const {price,amount,wallet} = req.body;
        try {
            if(!price || !amount || !wallet) return res.status(400).json({status : "fail", message: "there's a problem with body"});
            
            // 클라이언트 : 메타마스크를 통해 거래소로 토큰 전송

            // 거래 제한 여부 확인
            const isRestricted = await isRestrictedLEO();
            if(isRestricted) {
                return res.status(400).send({status: "fail", message: "거래가 제한되어 이더를 송금할 수 없습니다."});
            }

            // 서버 : web3를 통해 거래소에서 유저에게 이더 전송(수수료 제외하고 전송)
            const value = String(price * amount * 0.9996);
            const sellToken = await sendWeiToUser(wallet, value);
            if(sellToken){
                await position_his.create({
                    user_wallet: wallet,
                    order: 'sell',
                    price: price,
                    amount : amount,
                    fee: price * amount * 0.0004,
                    token_name: "LEOToken"
                });
                return res.status(200).json({status : "success"});
            }
            return res.status(400).json({status: "fail", message: "failed to send ether through contract"})
        } catch (err) {
            console.err(err);
            return next(err);
        }
    },

    // 거래제한을 어떻게 실행할지에 대한 방안 논의 필요
    // 1. 클라이언트에서 요청을 보낸다.
    // 2. 가격 변동에 따라서 자동으로 거래 제한/해제가 되도록 한다.(우선)
    restricttoken: async (req, res, next) => {
        const status = await isRestrictedLEO();
        console.log(status);
        try {
            if(status) {
                return res.status(400).send({message: "this token had already been restricted"})
            }
            const result = await restrictLEOToken();
            if(result) {
                return res.status(200).send({status: "successfully restricted the token"});
            }
            return res.status(400).send({status: "failed with the contract"});
        } catch (err) {
            console.err(err);
            return next(err);
        }
    },

    allowtoken: async (req, res, next) => {
        const status = await isRestrictedLEO();
        console.log(status);
        try {
            if(!status) {
                return res.status(400).send({message: "available token"})
            }
            const result = await allowLEOToken();
            if(result) {
                return res.status(200).send({status: "successfully re-allowed the token"});
            }
            return res.status(400).send({status: "failed with the contract"});
        } catch (err) {
            console.err(err);
            return next(err);
        }
    }
}