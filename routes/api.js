const express = require('express');
const router = express.Router();

const apiController = require('../controllers/api');

router.get('/search', apiController.searchStation);
router.post('/discover', apiController.routeDiscovey);

module.exports = router;