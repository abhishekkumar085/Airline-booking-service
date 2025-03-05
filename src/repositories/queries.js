function addRowLockOnFlights(flightId) {
  return `SELECT * from flights WHERE id = ${flightId} FOR UPDATE`;
}

module.exports = {
  addRowLockOnFlights,
};
