const express = require('express');
const router = express.Router();

const apiRoutes = require('./api');
const webRoutes = require('./web');
const adminRoutes = require('./admin');
const placeRoutes = require('./place');
const authRoutes = require('./auth');

router.use('/', webRoutes);
router.use('/api', apiRoutes);
router.use('/admin', adminRoutes);
router.use('/place', placeRoutes)
router.use('/auth', authRoutes);

module.exports = router;