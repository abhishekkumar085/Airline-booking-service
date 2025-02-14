const { StatusCodes } = require('http-status-codes');
const { FlightRepository } = require('../repositories');
const { AppError } = require('../utils');
const { Op } = require('sequelize');
const { compareTime } = require('../utils/helpers/datetimeHelper');

const flightRepository = new FlightRepository();

async function createFlight(data) {
  try {
    console.log(data.arrivalTime);
    console.log(data.departureTime);
    const response = compareTime(data.arrivalTime, data.departureTime);
    if (!response) {
      throw new AppError(
        'Arrival time must be greater than departure time',
        StatusCodes.BAD_REQUEST
      );
    }
    const flight = await flightRepository.create(data);
    return flight;
  } catch (error) {
    console.log(error);
    if (error.name === 'SequelizeValidationError') {
      let explanation = [];
      error.errors.forEach((err) => {
        explanation.push(err.message);
      });
      throw new AppError(explanation, StatusCodes.BAD_REQUEST);
    }
    if (error.name === 'SequelizeUniqueConstraintError') {
      let explanation = [];
      error.errors.forEach((err) => {
        explanation.push(err.message);
      });
      throw new AppError(explanation, StatusCodes.BAD_REQUEST);
    }
    throw new AppError(error.message, StatusCodes.INTERNAL_SERVER_ERROR);
  }
}

async function getAllFlights(query) {
  let customFilter = {};
  let sortFilter = [];

  const endingTripTime = ' 23:59:00';
  // trips=BLR-UDR
  if (query.trips) {
    [departureAirportId, arrivalAirportId] = query.trips.split('-');
    customFilter.departureAirportId = departureAirportId;
    customFilter.arrivalAirportId = arrivalAirportId;
  }

  if (query.price) {
    [minPrice, maxPrice] = query.price.split('-');
    customFilter.price = {
      [Op.between]: [minPrice, maxPrice == undefined ? 20000 : maxPrice],
    };
  }

  if (query.travellers) {
    customFilter.totalSeats = {
      [Op.gte]: query.travellers,
    };
  }
  if (query.tripDate) {
    customFilter.departureTime = {
      [Op.between]: [query.tripDate, query.tripDate + endingTripTime],
    };
  }
  if (query.sort) {
    const params = query.sort.split(',');
    console.log('Params', params);
    const sortFilters = params.map((param) => param.split('_'));
    console.log('Filtersss', sortFilters);
    sortFilter = sortFilters;
  }
  console.log(customFilter, sortFilter);
  try {
    const flights = await flightRepository.getAllFlights(
      customFilter,
      sortFilter
    );
    return flights;
  } catch (error) {
    throw new AppError(
      'cannot fetch data of the flights',
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

module.exports = {
  createFlight,
  getAllFlights,
};
