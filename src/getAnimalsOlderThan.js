const getSpecieByName = require('./getSpecieByName');

function getAnimalsOlderThan(name, age) {
  const specie = getSpecieByName(name);

  return specie.residents.every((resident) => resident.age >= age);
}

module.exports = getAnimalsOlderThan;
