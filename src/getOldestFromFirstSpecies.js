const getEmployeeById = require('./getEmployeeById');
const getSpecieById = require('./getSpecieById');

function getOldestAnimalFromSpecie(specie) {
  const copyOfResidents = [...specie.residents];
  copyOfResidents.sort((a, b) => b.age - a.age);

  return copyOfResidents[0];
}

function getOldestFromFirstSpecies(employeeId) {
  const employee = getEmployeeById(employeeId);
  const firstSpecieId = employee.responsibleFor[0];
  const firstSpecie = getSpecieById(firstSpecieId);
  const oldestAnimal = getOldestAnimalFromSpecie(firstSpecie);

  return Object.values(oldestAnimal);
}

module.exports = getOldestFromFirstSpecies;
