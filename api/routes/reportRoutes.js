const express = require('express');
const { getReport } = require('../controllers/reportController');
const checkAdmin = require('../middleware/checkAdmin');

const router = express.Router();

router.get('/report', checkAdmin, getReport);

module.exports = router;
