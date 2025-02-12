const { AirplaneRepository } = require('../repositories');

const airplaneRepository = new AirplaneRepository();

async function createAirplane(data) {
  try {
    const airplane = await airplaneRepository.create(data);
    return airplane;
  } catch (error) {
    throw error;
  }
}

async function getallAirplane() {
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

module.exports = {
  createAirplane,
  getallAirplane,
  getAirplane,
};
