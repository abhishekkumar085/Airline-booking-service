const { StatusCodes } = require('http-status-codes');
const { AirplaneRepository } = require('../repositories');
const { AppError } = require('../utils');

const airplaneRepository = new AirplaneRepository();

async function createAirplane(data) {
  try {
    const airplane = await airplaneRepository.create(data);
    return airplane;
  } catch (error) {
    console.log(error.message);
    if (error.name === 'SequelizeValidationError') {
      let explanation = [];
      error.errors.forEach((err) => {
        explanation.push(err.message);
      });
      throw new AppError(explanation, StatusCodes.BAD_REQUEST);
    }
    throw new AppError(
      'Cannot create a new Airplane object',
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

async function getallAirplane() {
  try {
    const airplanes = await airplaneRepository.getAll();
    return airplanes;
  } catch (error) {
    throw new AppError(
      'Cannot fetch data of all the airplanes',
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

async function getAirplane(id) {
  try {
    const airplane = await airplaneRepository.get(id);
    return airplane;
  } catch (error) {
    console.log("Statusfrom",error.statusCode)
    if (error.statusCode === StatusCodes.NOT_FOUND) {
      throw new AppError(
        'The airplane you requested is not present',
        error.statusCode
      );
    }
    throw new AppError(
      'Cannot fetch data of  the airplanes',
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

async function destroyAirplane(id) {
  try {
    const response = await airplaneRepository.destroy(id);
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

async function updateAirplane(id, data) {
  try {
    const response = await airplaneRepository.update(id, data);
    return response;
  } catch (error) {
    if (error.statusCode == StatusCodes.NOT_FOUND) {
      throw new AppError(
        'The airplane you requested to update is not present',
        error.statusCode
      );
    }
    if (error.statusCode == StatusCodes.CONFLICT) {
      throw new AppError(error.message, error.statusCode);
    }
    throw new AppError(
      'Cannot fetch data of all the airplanes',
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

module.exports = {
  createAirplane,
  getallAirplane,
  getAirplane,
  destroyAirplane,
  updateAirplane,
};
