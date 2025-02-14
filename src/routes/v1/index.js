const express = require('express');
const { InfoController } = require('../../controllers');
const airplaneRoute = require('./airplaneRoute');
const cityRoute = require('./cityRoute');
const airportRoute = require('./airportRoute');
const flightRoute = require('./flightRoute');
const router = express.Router();

router.use('/airplanes', airplaneRoute);
router.use('/city', cityRoute);
router.use('/airports', airportRoute);
router.use('/flight', flightRoute);

router.get('/info', InfoController.info);

module.exports = router;
