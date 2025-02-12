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
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: 'Something went wrong!!',
      data: {},
      error: error,
    });
  }
}
async function getCities(req, res) {
  try {
    const airplanes = await CityService.getallAirplane();
    return res.status(StatusCodes.OK).json({
      success: true,
      message: 'All Airplanes getting successfully!',
      data: airplanes,
      error: {},
    });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: 'Something went wrong!!',
      data: {},
      error: error,
    });
  }
}
async function getAirplane(req, res) {
  try {
    const airplane = await CityService.getAirplane(req.params.id);
    return res.status(StatusCodes.OK).json({
      success: true,
      message: 'airplane getting successfully',
      data: airplane,
      error: {},
    });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: `Something went wrong!!`,
      data: {},
      error: error,
    });
  }
}
async function destroyAirplane(req, res) {
  try {
    const airplane = await CityService.destroyAirplane(req.params.id);
    return res.status(StatusCodes.OK).json({
      success: true,
      message: 'airplane deleted successfully',
      data: airplane,
      error: {},
    });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: `Something went wrong!!`,
      data: {},
      error: error,
    });
  }
}
async function updateAirplane(req, res) {
  try {
    const airplane = await CityService.updateAirplane(
      req.params.id,
      req.body
    );
    return res.status(StatusCodes.OK).json({
      success: true,
      message: 'airplane changed successfully',
      data: airplane,
      error: {},
    });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: `Something went wrong!!`,
      data: {},
      error: error,
    });
  }
}

module.exports = {
  createCity,
  getCities,
  getAirplane,
  destroyAirplane,
  updateAirplane,
};
