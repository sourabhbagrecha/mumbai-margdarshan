const express = require('express');
const router = express.Router();

const webController = require('../controllers/web');
const isAuth = require('../middleware/is-auth');

router.get('/search-route', webController.getSearchPage);
router.get('/map',webController.getMap);
router.get('/about-us', webController.getAboutUs);
router.get('/faq', webController.getFAQ);
router.get('/about-mumbai', webController.getAboutMumbai);
router.get('/station/:id', webController.getStation);
router.post('/payment', isAuth, webController.getPaymentPage);
router.post('/book-tickets', isAuth, webController.bookTicket);

module.exports = router;