require('dotenv').config();
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
          name: "Unnamed",
          visited: false,
          cnt: 0
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
  },

  chname: async (req, res, next) => {
    const { wallet } = req.query;
    const { name } = req.body;
    const check = await users.findOne({where: {wallet}})
    try {
      if(!name || !check) return res.status(400).send({message: "Not enrolled user or please input name"})
      await users.update({ name }, { where: { wallet } });
      const result = {
        status: "success",
        name
      }
      return res.status(200).json(result);
    } catch (err) {
      console.error(err);
      return next(err);
    }
  },

  tutorial: async (req, res, next) => {
    const { wallet, cnt } = req.query;
    const check = await users.findOne({where: {wallet}})
    try {
      if(!cnt || !check) return res.status(400).send({message: "Not enrolled user or please input cnt"})
      await users.update({ cnt }, { where: { wallet } });
      const result = {
        status: "success",
        cnt
      }
      return res.status(200).json(result);
    } catch (err) {
      console.error(err);
      return next(err);
    }
  },

  // 무한 스크롤 기능 구현시 offset, limit을 이용한 수정 필요
  position: async (req, res, next) => {
    const { wallet } = req.query;
    try {
      const userPosition = await position_his.findAll({
        where: { user_wallet: wallet },
      })
      return res.status(200).json(userPosition)
    } catch (err) {
      console.error(err);
      return next(err);
    }
  },

  // 컨트랙트 관련 테스트 필요
  mypage: async (req, res, next) => {
    const { wallet } = req.query;
    try {
      const userInfo = await users.findOne({
        where: { wallet }
      })
      if(!userInfo) return res.status(400).json({message: "No such user"});
      const balance = await getTokenBalance(wallet); // 컨트랙트
      const result = {
        name : userInfo.name,
        faucet: userInfo.faucet,
        cnt: userInfo.cnt,
        amount: balance
      }
      return res.status(200).json(result)
    } catch (err) {
      console.error(err);
      return next(err);
    }
  },

  // 배열로 된 stoken에 대한 데이터 입력 방법 찾기
  // 추후에 기업이 여러개 생길때 구현해야 하는 부분임
  // stoken 컬럼에 대한 데이터 입력 테스트 => 수정 필요
  sample: async (req, res, next) => {
    const { wallet } = req.query;
    const { stoken } = req.body; // 주소값만 넣으면 됨
    try {
      const currentStoken = await users.findOne({where: {wallet}});
      console.log(currentStoken.stoken);
      const changedStoken = [...currentStoken.stoken];
      console.log(changedStoken);
      const jsonStoken = JSON.stringify(changedStoken);
      const result = await users.update({stoken: jsonStoken}, {where: wallet});
      return res.status(200).json(result);
    } catch (err) {
      console.error(err);
      return next(err);
    }
  },

  // 컨트랙트 관련 테스트 필요
  faucet: async (req, res, next) => {
    const { wallet } = req.query;
    const userInfo = await users.findOne({
      where: { wallet }
    })
    try {
      if(!userInfo) return res.status(400).send({message: "No such user"});
      if(userInfo.faucet === 1) return res.status(400).send({message: "user has already used the faucet"});
      await depositFaucet(wallet); // 컨트랙트
      await users.update({faucet: 1}, {where: {wallet}});
      return res.status(200).json({status: "success"})
    } catch (err) {
      console.error(err);
      return next(err);
    }
  }
}