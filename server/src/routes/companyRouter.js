const express = require('express');

const router = express.Router();
const companyController = require('../controllers/companyController');

router.post('/vote', companyController.vote);
router.get('/pdisclosure',companyController.pdisclosure);

module.exports = router