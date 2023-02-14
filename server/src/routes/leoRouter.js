const express = require('express');

const router = express.Router();
const LEOTokenController = require('../controllers/LEOTokenController');

router.post('/buy', LEOTokenController.buy);
router.post('/sell', LEOTokenController.sell);
router.post('/staking', LEOTokenController.staking);
router.post('/reward', LEOTokenController.reward);

module.exports = router