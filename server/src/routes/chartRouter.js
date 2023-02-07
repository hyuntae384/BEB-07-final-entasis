const express = require('express');

const router = express.Router();
const chartController = require('../controllers/chartController');

router.get('/enta', chartController.enta);
router.get('/beb', chartController.beb);
router.get('/leo', chartController.leo);

module.exports = router