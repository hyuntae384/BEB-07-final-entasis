const express = require('express');

const router = express.Router();
const BEBTokenController = require('../controllers/BEBTokenController');

router.post('/buy', BEBTokenController.buy);
router.post('/sell', BEBTokenController.sell);
router.post('/staking', BEBTokenController.staking);
router.post('/reward', BEBTokenController.reward);

module.exports = router