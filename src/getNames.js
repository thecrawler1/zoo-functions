// This function is used to filter names of species or names of specie residents
function getNames(arrayOfObjectsWithName) {
  return arrayOfObjectsWithName.map(({ name }) => name);
}

module.exports = getNames;
