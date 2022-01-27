function getSpeciesLocations(species) {
  return species.map((specie) => specie.location);
}

module.exports = getSpeciesLocations;
