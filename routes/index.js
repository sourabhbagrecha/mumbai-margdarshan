const express = require('express');
const router = express.Router();

const apiRoutes = require('./api');
const webRoutes = require('./web');

router.use('/api',apiRoutes);
router.use('/', webRoutes);

module.exports = router;