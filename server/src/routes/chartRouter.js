const express = require('express');

const router = express.Router();
const chartController = require('../controllers/chartController');

router.get('/total', chartController.total);

module.exports = router