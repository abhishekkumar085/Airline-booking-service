const { StatusCodes } = require('http-status-codes');
const { CityRepository } = require('../repositories');
const { AppError } = require('../utils');

const cityRepository = new CityRepository();

async function createCity(data) {
  try {
    if (!data.name || data.name.trim() === '') {
      throw new Error('City name cannot be empty');
    }
    const city = await cityRepository.create(data);
    return city;
  } catch (error) {
    if (error.name === 'SequelizeUniqueConstraintError') {
      throw error.errors[0].message;
    }
    if (error.name === 'SequelizeValidationError') {
      let explanation = [];
      error.errors.forEach((err) => {
        explanation.push(err.message);
      });
      throw new AppError(explanation, StatusCodes.BAD_REQUEST);
    }
    throw new AppError(
      'Cannot create a new resource!',
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

async function getallCity() {
  try {
    const cities = await cityRepository.getAll();
    return cities;
  } catch (error) {
    throw new AppError(
      'Cannot fetch data of all the resource',
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

async function getCity(id) {
  try {
    const airplane = await cityRepository.get(id);
    return airplane;
  } catch (error) {
    if (error.statusCode === StatusCodes.NOT_FOUND) {
      throw new AppError(
        'The resource you requested is not present',
        error.statusCode
      );
    }
    throw new AppError(
      'something went wrong on getting resource!',
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

async function deleteCity(id) {
  try {
    const response = await cityRepository.destroy(id);
    return response;
  } catch (error) {
    if (error.statusCode == StatusCodes.NOT_FOUND) {
      throw new AppError(
        error.message,
        error.statusCode
      );
    }
    throw new AppError(error.message, StatusCodes.INTERNAL_SERVER_ERROR);
  }
}
async function updateCity(id, data) {
  try {
    const response = await cityRepository.update(id, data);
    return response;
  } catch (error) {
    if (error.statusCode == StatusCodes.NOT_FOUND) {
      throw new AppError(error.message, error.statusCode);
    }
    if (error.statusCode == StatusCodes.CONFLICT) {
      throw new AppError(error.message, error.statusCode);
    }
    throw new AppError(error.message, StatusCodes.INTERNAL_SERVER_ERROR);
  }
}

module.exports = {
  createCity,
  getallCity,
  getCity,
  deleteCity,
  updateCity,
};
