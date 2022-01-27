const { species } = require('../data/zoo_data');

function getSpecieById(id) {
  return species.find((specie) => specie.id === id);
}

module.exports = getSpecieById;
