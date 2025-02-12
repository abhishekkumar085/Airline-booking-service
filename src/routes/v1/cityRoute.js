const express = require('express');
const { CityController } = require('../../controllers');

const router = express.Router();

router.post('/', CityController.createCity);
router.get('/', CityController.getCities);
router.get('/:id', CityController.getAirplane);
router.delete('/:id', CityController.destroyAirplane);
router.patch('/:id', CityController.updateAirplane);

module.exports = router;
