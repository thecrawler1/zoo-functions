const { species } = require('../data/zoo_data');
const getSpecieByName = require('./getSpecieByName');

function reduceCountSpeciesResidents(count, specie) {
  return {
    ...count,
    [specie.name]: specie.residents.length,
  };
}

function countSpeciesResidents() {
  return species.reduce(reduceCountSpeciesResidents, {});
}

function filterSpecieResidentsBySex(specie, sex) {
  return specie.residents.filter((resident) => resident.sex === sex);
}

function getSpecieResidents({ specie: specieName, sex }) {
  const specie = getSpecieByName(specieName);
  const residents = sex
    ? filterSpecieResidentsBySex(specie, sex)
    : specie.residents;

  return residents;
}

function countSpecieResidents(options) {
  const residents = getSpecieResidents(options);

  return residents.length;
}

function countAnimals(options) {
  return options
    ? countSpecieResidents(options)
    : countSpeciesResidents();
}

module.exports = countAnimals;
