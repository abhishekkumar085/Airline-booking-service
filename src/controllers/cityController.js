const { CityService } = require('../services');
const { StatusCodes } = require('http-status-codes');

async function createCity(req, res) {
  try {
    const city = await CityService.createCity({
      name: req.body.name,
    });
    return res.status(StatusCodes.CREATED).json({
      success: true,
      message: 'city created successfully!',
      data: city,
      error: {},
    });
  } catch (error) {
    res.status(error.statusCode).json({
      success: false,
      message: error.message,
      data: {},
      error: error,
    });
  }
}
async function getCities(req, res) {
  try {
    const airplanes = await CityService.getallCity();
    return res.status(StatusCodes.OK).json({
      success: true,
      message: 'all city getting successfully!',
      data: airplanes,
      error: {},
    });
  } catch (error) {
    res.status(error.statusCode).json({
      success: false,
      message: error.message,
      data: {},
      error: error,
    });
  }
}
async function getCity(req, res) {
  try {
    const airplane = await CityService.getCity(req.params.id);
    return res.status(StatusCodes.OK).json({
      success: true,
      message: 'city getting successfully!',
      data: airplane,
      error: {},
    });
  } catch (error) {
    res.status(error.statusCode).json({
      success: false,
      message: error.message,
      data: {},
      error: error,
    });
  }
}
async function destroyCity(req, res) {
  try {
    const airplane = await CityService.deleteCity(req.params.id);
    return res.status(StatusCodes.OK).json({
      success: true,
      message: 'city deleted successfully',
      data: airplane,
      error: {},
    });
  } catch (error) {
    res.status(error.statusCode).json({
      success: false,
      message: error.message,
      data: {},
      error: error,
    });
  }
}
async function updateCity(req, res) {
  try {
    const airplane = await CityService.updateCity(req.params.id, req.body);
    return res.status(StatusCodes.OK).json({
      success: true,
      message: 'city updated successfully',
      data: airplane,
      error: {},
    });
  } catch (error) {
    res.status(error.statusCode).json({
      success: false,
      message: error.message,
      data: {},
      error: error,
    });
  }
}

module.exports = {
  createCity,
  getCities,
  getCity,
  destroyCity,
  updateCity,
};
