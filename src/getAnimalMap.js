const data = require('../data/zoo_data');
const getSpeciesLocations = require('./getSpeciesLocations');
const getNames = require('./getNames');

function getUniqueSpeciesLocations() {
  const locations = getSpeciesLocations(data.species);
  const uniqueLocations = [...new Set(locations)];

  return uniqueLocations;
}

function getSpeciesFromLocation(location) {
  return data.species.filter((specie) => specie.location === location);
}

function getResidentsNamesWithSexFilter(residents, sex) {
  const animals = sex
    ? residents.filter((resident) => resident.sex === sex)
    : residents;

  return getNames(animals);
}

function getSpeciesWithResidentsNames(species, { sorted, sex }) {
  return species.map((specie) => {
    const names = getResidentsNamesWithSexFilter(specie.residents, sex);

    if (sorted) names.sort();

    return { [specie.name]: names };
  });
}

function getAnimalsFromLocation(location, options) {
  const speciesFromLocation = getSpeciesFromLocation(location);

  return options.includeNames
    ? getSpeciesWithResidentsNames(speciesFromLocation, options)
    : getNames(speciesFromLocation);
}

function reduceAnimalMap(options) {
  return (animalMap, location) => ({
    ...animalMap,
    [location]: getAnimalsFromLocation(location, options),
  });
}

function getAnimalMap(options = {}) {
  const locations = getUniqueSpeciesLocations();

  return locations.reduce(reduceAnimalMap(options), {});
}

module.exports = getAnimalMap;
