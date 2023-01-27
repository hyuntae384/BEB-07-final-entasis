const { users, companys, dividend_his, position_his, price_his } = require('../models');
const { depositFaucet, sendEtherToUser } = require('../chainUtils/etherUtils');
const { getTokenBalance, getTokenName, signAndSendTx, sendTokenToUser } = require('../chainUtils/tokenUtils');

module.exports = {
    vote: async (req,res,next) => {
        const {st_name,st_amount,ratio,wallet} = req.body;
        // company테이블에서 필요한 데이터 조회한 후 post
        // 배당금 관련 추후 공지......
        const havetoken = await companys.findOne({
            where: { wallet },
          });
        try{
            if(!havetoken || !wallet) return res.status(400).send({message: "invaild payload"});

        } catch(err) {
            console.err(err);
            return next(err);
        }
    },
    pdisclosure: async(req,res,next) => {
        const {cpd} = req.query;
        // 참조키 활용 이게 맞는지.....ㅋㅋ
        /*
        const companyinfo = await companys.findOne({
            where: {cpd},
            include: [
                {
                    model: dividend_his,
                    as: "company_wallet",
                    where: {cpd}
                }
            ]
        });
        console.log(companyinfo);
        */ 
        try{
            if(!companyinfo || !cpd) return res.status(400).send({message: "Non-existent data or invaild query "});
            // 배당금 추후논의
            const result = {
                name:companyinfo.name,
                total_asset: companyinfo.asset,
                income:3,
                dividend_ratio:3,
                dividend:3,
                next_ratio:3
              }
            return res.status(200).send(result);
        } catch (err){
            console.err(err);
            return next(err);
        }
    }
}