const { StatusCodes } = require('http-status-codes');
const { FlightService } = require('../services');

async function createFlight(req, res) {
  try {
    const flight = await FlightService.createFlight({
      flightNumber: req.body.flightNumber,
      airplaneId: req.body.airplaneId,
      departureAirportId: req.body.departureAirportId,
      arrivalAirportId: req.body.arrivalAirportId,
      arrivalTime: req.body.arrivalTime,
      departureTime: req.body.departureTime,
      price: req.body.price,
      boardingGate: req.body.boardingGate,
      totalSeats: req.body.totalSeats,
    });
    return res.status(StatusCodes.CREATED).json({
      success: true,
      message: 'Successfully created the resource!',
      data: flight,
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

async function getAllFlights(req, res) {
  try {
    const flights = await FlightService.getAllFlights(req.query);
    return res.status(StatusCodes.OK).json({
      success: true,
      message: 'Successfully getting the resource!',
      data: flights,
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
async function getFlightById(req, res) {
  try {
    const id = req.params.id;
    const flights = await FlightService.getFlightById(id);
    return res.status(StatusCodes.OK).json({
      success: true,
      message: 'Successfully getting the resource!',
      data: flights,
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
async function updateSeats(req, res) {
  try {
    const response = await FlightService.updateSeats({
      flightId: req.params.id,
      seats: req.body.seats,
      dec: req.body.dec,
    });
    return res.status(StatusCodes.OK).json({
      success: true,
      message: 'Successfully updated the resource!',
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
  createFlight,
  getAllFlights,
  getFlightById,
  updateSeats,
};
