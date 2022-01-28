const getEmployeeById = require('./getEmployeeById');
const getSpecieById = require('./getSpecieById');

function reduceOldestAnimal(oldestAnimal, currentAnimal) {
  return oldestAnimal.age > currentAnimal.age
    ? oldestAnimal
    : currentAnimal;
}

function getOldestAnimal(animals) {
  return animals.reduce(reduceOldestAnimal);
}

function getOldestFromFirstSpecies(employeeId) {
  const employee = getEmployeeById(employeeId);
  const firstSpecieId = employee.responsibleFor[0];
  const firstSpecie = getSpecieById(firstSpecieId);
  const oldestAnimal = getOldestAnimal(firstSpecie.residents);

  return Object.values(oldestAnimal);
}

module.exports = getOldestFromFirstSpecies;
