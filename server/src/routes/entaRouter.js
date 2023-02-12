const express = require('express');

const router = express.Router();
const ENTATokenController = require('../controllers/ENTATokenController');

router.post('/buy', ENTATokenController.buy);
router.post('/sell', ENTATokenController.sell);
router.post('/staking', ENTATokenController.staking);
router.post('/reward', ENTATokenController.reward);

module.exports = router