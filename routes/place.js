// configuration
const express = require('express');
const router = express.Router();

const placeController = require('../controllers/place');

// create
router.post('/new', placeController.createPlace);

// read
router.get('/', placeController.getPlaces);
router.get('/:id', placeController.getPlace);


// update
router.post('/:id', placeController.updatePlace);

// delete
router.delete('/:id', placeController.deletePlace);

module.exports = router;