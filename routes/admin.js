const express = require('express');
const router = express.Router();

const adminController = require('../controllers/admin');

router.get('/',adminController.getDashboard);
router.get('/station-edit/:id', adminController.getStationEdit);
router.post('/station-edit/:id', adminController.postStationEdit);

module.exports = router;