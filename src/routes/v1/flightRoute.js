const express = require('express');
const { FlightController } = require('../../controllers');

const router = express.Router();

router.post('/', FlightController.createFlight);
router.get('/', FlightController.getAllFlights);
router.get('/:id', FlightController.getFlightById);

module.exports = router;
