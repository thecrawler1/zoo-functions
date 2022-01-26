const { species } = require('../data/zoo_data');

function getSpecieByName(name) {
  return species.find((specie) => specie.name === name);
}

module.exports = getSpecieByName;
