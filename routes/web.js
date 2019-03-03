const express = require('express');
const router = express.Router();

const webController = require('../controllers/web');

router.get('/search-route', webController.getSearchPage);

module.exports = router;