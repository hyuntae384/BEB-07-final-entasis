const express = require('express');

const router = express.Router();
const userController = require('../controllers/userController');

router.post('/enroll', userController.enroll);

module.exports = router;