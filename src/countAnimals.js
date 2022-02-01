const { species } = require('../data/zoo_data');
const getSpecieByName = require('./getSpecieByName');

function reduceCountSpeciesResidents(count, specie) {
  return {
    ...count,
    [specie.name]: specie.residents.length,
  };
}

function countAllSpeciesResidents() {
  return species.reduce(reduceCountSpeciesResidents, {});
}

function filterResidentsBySex(residents, sex) {
  return residents.filter((resident) => resident.sex === sex);
}

function getSpecieResidents({ specie: name, sex }) {
  const { residents } = getSpecieByName(name);

  return sex
    ? filterResidentsBySex(residents, sex)
    : residents;
}

function countSingleSpecieResidents(options) {
  const residents = getSpecieResidents(options);

  return residents.length;
}

function countAnimals(options) {
  return options
    ? countSingleSpecieResidents(options)
    : countAllSpeciesResidents();
}

module.exports = countAnimals;
