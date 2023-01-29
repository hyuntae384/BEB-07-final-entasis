const express = require('express');

const router = express.Router();
const userController = require('../controllers/userController');

router.post('/enroll', userController.enroll);
router.put('/chname', userController.chname);
router.put('/tutorial', userController.tutorial);
router.get('/position', userController.position);
router.get('/mypage', userController.mypage);
router.put('/sample', userController.sample); // 수정 필요
router.put('/faucet', userController.faucet);
router.get('/ethbalance', userController.ethbalance); // 이더 잔액 조회 테스트 API

module.exports = router;