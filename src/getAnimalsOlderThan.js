const getSpecieByName = require('./getSpecieByName');

function getAnimalsOlderThan(name, age) {
  const { residents } = getSpecieByName(name);

  return residents.every((resident) => resident.age >= age);
}

module.exports = getAnimalsOlderThan;
