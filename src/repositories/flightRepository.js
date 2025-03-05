const CrudRepository = require('./crudRepository');
const { Flight, Airplane, Airport, City } = require('../models');
const { Sequelize } = require('sequelize');
const db = require('../models');
const { addRowLockOnFlights } = require('./queries');

class FlightRepository extends CrudRepository {
  constructor() {
    super(Flight);
  }

  async getAllFlights(filter, sort) {
    const response = await Flight.findAll({
      where: filter,
      order: sort,
      include: [
        {
          model: Airplane,
          required: true,
          as: 'airplaneDetail',
        },
        {
          model: Airport,
          required: true,
          as: 'departureAirport',
          on: {
            col1: Sequelize.where(
              Sequelize.col('Flight.departureAirportId'),
              '=',
              Sequelize.col('departureAirport.code')
            ),
          },
          include: {
            model: City,
            required: true,
          },
        },
        {
          model: Airport,
          required: true,
          as: 'arrivalAirport',
          on: {
            col1: Sequelize.where(
              Sequelize.col('Flight.arrivalAirportId'),
              '=',
              Sequelize.col('arrivalAirport.code')
            ),
          },
          include: {
            model: City,
            required: true,
          },
        },
      ],
    });
    return response;
  }

  async updateRemainingSeats(flightId, seats, dec = true) {
    await db.sequelize.query(addRowLockOnFlights(flightId));
    if (dec) {
      await Flight.decrement('totalSeats', {
        by: seats,
        where: { id: flightId },
      });
    } else {
      await Flight.increment('totalSeats', {
        by: seats,
        where: { id: flightId },
      });
    }
    const updatedFlight = await Flight.findOne({
      where: { id: flightId },
    });

    return updatedFlight;
  }
}

module.exports = FlightRepository;
