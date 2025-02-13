const express = require('express');
const { CityController } = require('../../controllers');

const router = express.Router();

router.post('/', CityController.createCity);
router.get('/', CityController.getCities);
router.get('/:id', CityController.getCity);
router.delete('/:id', CityController.destroyCity);
router.patch('/:id', CityController.updateCity);

module.exports = router;
