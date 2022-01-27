const { species } = require('../data/zoo_data');
const getSpecieByName = require('./getSpecieByName');

function reduceCount(count, specie) {
  return {
    ...count,
    [specie.name]: specie.residents.length,
  };
}

function countAnimals(options) {
  if (options === undefined) {
    return species.reduce(reduceCount, {});
  }

  const specie = getSpecieByName(options.specie);
  const residents = options.sex
    ? specie.residents.filter((resident) => resident.sex === options.sex)
    : specie.residents;

  return residents.length;
}

module.exports = countAnimals;
