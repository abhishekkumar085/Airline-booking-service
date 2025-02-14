const { StatusCodes } = require('http-status-codes');
const { AppError } = require('../utils');
const { AirportRepository } = require('../repositories');

const airportRepository = new AirportRepository();

async function createAirport(data) {
  try {
    const airport = await airportRepository.create(data);
    return airport;
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

async function getAirports() {
  try {
    const airports = await airportRepository.getAll();
    return airports;
  } catch (error) {
    throw new AppError(error.message, StatusCodes.INTERNAL_SERVER_ERROR);
  }
}

async function getAirport(id) {
  try {
    const airport = await airportRepository.get(id);
    return airport;
  } catch (error) {
    console.log('Statusfrom', error.statusCode);
    if (error.statusCode === StatusCodes.NOT_FOUND) {
      throw new AppError(error.message, error.statusCode);
    }
    throw new AppError(error.message, StatusCodes.INTERNAL_SERVER_ERROR);
  }
}

async function destroyAirport(id) {
  try {
    const response = await airportRepository.destroy(id);
    return response;
  } catch (error) {
    if (error.statusCode == StatusCodes.NOT_FOUND) {
      throw new AppError(
        'The airplane you requested to delete is not present',
        error.statusCode
      );
    }
    throw new AppError(
      'Cannot fetch data of all the airplanes',
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

async function updateAirport(id, data) {
  try {
    const response = await airportRepository.update(id, data);
    return response;
  } catch (error) {
    if (error.statusCode == StatusCodes.NOT_FOUND) {
      throw new AppError(
        'The resource you requested to update is not present',
        error.statusCode
      );
    }
    if (error.statusCode == StatusCodes.CONFLICT) {
      throw new AppError(error.message, error.statusCode);
    }
    throw new AppError(error.message, StatusCodes.INTERNAL_SERVER_ERROR);
  }
}

module.exports = {
  createAirport,
  getAirports,
  getAirport,
  destroyAirport,
  updateAirport,
};
