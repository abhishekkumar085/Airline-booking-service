const express = require('express');

const { InfoController } = require('../../controllers');
const airplaneRoute = require('./airplaneRoute');
const cityRoute = require('./cityRoute');

const router = express.Router();

router.use('/airplanes', airplaneRoute);
router.use('/city', cityRoute);

router.get('/info', InfoController.info);

module.exports = router;
