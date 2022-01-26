const { species } = require('../data/zoo_data');
const getSpecieByName = require('./getSpecieByName');

function countAllAnimals() {
  const animals = {};

  species.forEach((specie) => {
    animals[specie.name] = specie.residents.length;
  });

  return animals;
}

function countAnimals(options) {
  if (options === undefined) {
    return countAllAnimals();
  }

  const specie = getSpecieByName(options.specie);
  const residents = options.sex
    ? specie.residents.filter((resident) => resident.sex === options.sex)
    : specie.residents;

  return residents.length;
}

module.exports = countAnimals;
