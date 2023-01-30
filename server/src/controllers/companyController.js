const { users, companys, dividend_his, position_his, price_his } = require('../models');
const { depositFaucet, sendEtherToUser } = require('../chainUtils/etherUtils');
const { getTotalSupply, getTokenBalance, getTokenName, signAndSendTx, sendTokenToUser } = require('../chainUtils/tokenUtils');

module.exports = {
    vote: async (req,res,next) => {
        const { name, ratio, user_wallet, st_amount} = req.body;
        // company테이블에서 필요한 데이터 조회한 후 post
        // 배당금 관련 추후 공지......
        const company = await companys.findOne({
            where: { name },
        });
        try{
            if(!havetoken || !wallet) return res.status(400).send({message: "invaild payload"});
            const balance = await getTokenBalance(wallet);
            const totalsupply = await getTotalSupply();
            const stake = balance / totalsupply
            // 당기순이익, 배당률 난수로 생성
            // 당기순이익 * 배당률 * stake 해서 나온 값을 전송
            const dividend = await sendEtherToUser(user_wallet, "결정된 배당금");
            if(dividend){
                await dividend_his.create({
                    company_wallet: company.wallet,
                    income: "난수로 설정된 당기순이익",
                    dividend_ratio: "난수로 설정된 배당금",
                    dividend: "총 배당금",
                    next_ratio: "차기 배당금" // 이건 어떻게 생성하는지 모르겠음...
                });
                return res.status(200).json({status: "success"});
            }
            return res.status(400).jsom({status: "fail"});
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