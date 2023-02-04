const express = require('express');

const router = express.Router();
const chartController = require('../controllers/chartController');

router.get('/rtd', chartController.rtd);
router.get('/total', chartController.total);
router.post('/restrict', chartController.restrict);

module.exports = router