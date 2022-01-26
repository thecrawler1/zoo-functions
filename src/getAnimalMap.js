const data = require('../data/zoo_data');

function getAllSpeciesLocations() {
  const allLocations = data.species.map(({ location }) => location);
  const uniqueLocations = [...new Set(allLocations)];

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

function getAnimalMap(options = {}) {
  const locations = getAllSpeciesLocations();
  const animalMap = {};

  locations.forEach((location) => {
    animalMap[location] = getAnimalsFromLocation(location, options);
  });

  return animalMap;
}

module.exports = getAnimalMap;
