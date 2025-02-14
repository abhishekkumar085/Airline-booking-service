const { AirportService } = require('../services');
const { StatusCodes } = require('http-status-codes');

async function createAirport(req, res) {
  try {
    const airport = await AirportService.createAirport({
      name: req.body.name,
      code: req.body.code,
      address: req.body.address,
      cityId: req.body.cityId,
    });
    return res.status(StatusCodes.CREATED).json({
      success: true,
      message: 'Successfully created the resource',
      data: airport,
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
async function getAirports(req, res) {
  try {
    const airports = await AirportService.getAirports();
    return res.status(StatusCodes.OK).json({
      success: true,
      message: 'successfully getting resource!',
      data: airports,
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
async function getAirport(req, res) {
  try {
    const airport = await AirportService.getAirport(req.params.id);
    return res.status(StatusCodes.OK).json({
      success: true,
      message: 'successfully getting resource!',
      data: airport,
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
async function destroyAirport(req, res) {
  try {
    const response = await AirportService.destroyAirport(req.params.id);
    return res.status(StatusCodes.OK).json({
      success: true,
      message: 'successfully deleted resource!',
      data: response,
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
async function updateAirport(req, res) {
  try {
    const response = await AirportService.updateAirport(
      req.params.id,
      req.body
    );
    return res.status(StatusCodes.OK).json({
      success: true,
      message: 'successfully updated resource!',
      data: response,
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
  createAirport,
  getAirport,
  getAirports,
  destroyAirport,
  updateAirport,
};
