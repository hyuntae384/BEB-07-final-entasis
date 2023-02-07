const express = require('express');

const router = express.Router();
const ENTATokenController = require('../controllers/ENTATokenController');

router.post('/buy', ENTATokenController.buy);
router.post('/sell', ENTATokenController.sell);
router.post('/restricttoken', ENTATokenController.restricttoken);
router.post('/allowtoken', ENTATokenController.allowtoken);

module.exports = router