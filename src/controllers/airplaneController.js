const { AirplaneService } = require('../services');
const { StatusCodes } = require('http-status-codes');

async function createAirplane(req, res) {
  try {
    const airplane = await AirplaneService.createAirplane({
      modelNumber: req.body.modelNumber,
      capacity: req.body.capacity,
    });
    return res.status(StatusCodes.CREATED).json({
      success: true,
      message: 'Successfully created an airplane',
      data: airplane,
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
async function getAirplanes(req, res) {
  try {
    const airplanes = await AirplaneService.getallAirplane();
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
    const airplane = await AirplaneService.getAirplane(req.params.id);
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
    const airplane = await AirplaneService.destroyAirplane(req.params.id);
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
    const airplane = await AirplaneService.updateAirplane(req.params.id,req.body);
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

module.exports = { createAirplane, getAirplanes,getAirplane,destroyAirplane ,updateAirplane};
