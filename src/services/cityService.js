const { CityRepository } = require('../repositories');

const cityRepository = new CityRepository();

async function createCity(data) {
  try {
    if (!data.name || data.name.trim() === '') {
      throw new Error('City name cannot be empty');
    }
    const city = await cityRepository.create(data);
    return city;
  } catch (error) {
    if (
      error.name === 'SequelizeValidationError' ||
      error.name === 'SequelizeUniqueConstraintError'
    ) {
      throw error.errors[0].message;
    }

    throw error.message;
  }
}

async function getallCity() {
  try {
    const airplanes = await airplaneRepository.getAll();
    return airplanes;
  } catch (error) {
    throw error;
  }
}

async function getAirplane(id) {
  try {
    const airplane = await airplaneRepository.get(id);
    return airplane;
  } catch (error) {
    throw error;
  }
}

async function destroyAirplane(id) {
  try {
    const response = await airplaneRepository.destroy(id);
    return response;
  } catch (error) {
    throw error;
  }
}
async function updateAirplane(id, data) {
  try {
    const response = await airplaneRepository.update(id, data);
    return response;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  createCity,
  getallCity,
  getAirplane,
  destroyAirplane,
  updateAirplane,
};
