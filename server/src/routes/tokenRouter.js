const express = require('express');

const router = express.Router();
const tokenController = require('../controllers/tokenController');

router.post('/buy', tokenController.buy);
router.post('/sell', tokenController.sell);
router.post('/restricttoken', tokenController.restricttoken);
router.post('/allowtoken', tokenController.allowtoken);

module.exports = router