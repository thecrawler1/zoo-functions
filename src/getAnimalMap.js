const data = require('../data/zoo_data');

function getAllSpeciesLocations() {
  const locations = data.species.map(({ location }) => location);
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

  const names = animals.map((animal) => animal.name);

  return names;
}

function getSpeciesWithResidentsNames(species, { sorted, sex }) {
  return species.map((specie) => {
    const names = getResidentsNamesWithSexFilter(specie.residents, sex);

    if (sorted) names.sort();

    return { [specie.name]: names };
  });
}

function getSpeciesNames(species) {
  return species.map((specie) => specie.name);
}

function getAnimalsFromLocation(location, options) {
  const speciesFromLocation = getSpeciesFromLocation(location);

  return options.includeNames
    ? getSpeciesWithResidentsNames(speciesFromLocation, options)
    : getSpeciesNames(speciesFromLocation);
}

function reduceAnimalMap(options) {
  return (animalMap, location) => ({
    ...animalMap,
    [location]: getAnimalsFromLocation(location, options),
  });
}

function getAnimalMap(options = {}) {
  const locations = getAllSpeciesLocations();

  return locations.reduce(reduceAnimalMap(options), {});
}

module.exports = getAnimalMap;
