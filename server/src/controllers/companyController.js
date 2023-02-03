const { users, companys, dividend_his, position_his, price_his } = require('../models');
const { depositFaucet, sendEtherToUser } = require('../chainUtils/etherUtils');
const { getTotalSupply, getTokenBalance, getTokenName, signAndSendTx, sendTokenToUser } = require('../chainUtils/tokenUtils');

module.exports = {
    vote: async (req,res,next) => {
        const { name, ratio, user_wallet, st_amount} = req.body;
        const company = await companys.findOne({where: { name }});
        try{
            if(!company) return res.status(400).send({message: "no such company"})
            await position_his.create({
                user_wallet,
                order: "vote",
                vote: ratio,
                company_name: name
            })
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
    },


}