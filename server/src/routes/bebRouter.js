const express = require('express');

const router = express.Router();
const BEBTokenController = require('../controllers/BEBTokenController');

router.post('/buy', BEBTokenController.buy);
router.post('/sell', BEBTokenController.sell);
router.post('/restricttoken', BEBTokenController.restricttoken);
router.post('/allowtoken', BEBTokenController.allowtoken);

module.exports = router