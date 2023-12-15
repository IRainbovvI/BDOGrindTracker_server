const express = require('express');
const LocationController = require('../controllers/Location');

const router = express.Router();
const locationController = new LocationController();

router.get('/', locationController.getAll);
router.get('/:id', locationController.getByIdWithItems);

module.exports = router;
