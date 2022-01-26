const { employees } = require('../data/zoo_data');
const getSpeciesByIds = require('./getSpeciesByIds');

function getEmployeeById(id) {
  return employees.find((employee) => employee.id === id);
}

function getEmployeeByFirstOrLastName(name) {
  return employees.find((e) => e.firstName === name || e.lastName === name);
}

function getSpeciesLocations(species) {
  return species.map((specie) => specie.location);
}

function getSpeciesNames(species) {
  return species.map((specie) => specie.name);
}

function getEmployeeCoverage(employee) {
  const species = getSpeciesByIds(...employee.responsibleFor);
  const locations = getSpeciesLocations(species);

  return {
    id: employee.id,
    fullName: `${employee.firstName} ${employee.lastName}`,
    species: getSpeciesNames(species),
    locations,
  };
}

function getEmployeesCoverage(options) {
  if (options === undefined) {
    return employees.map((employee) => getEmployeeCoverage(employee));
  }

  const employee = options.id
    ? getEmployeeById(options.id)
    : getEmployeeByFirstOrLastName(options.name);

  if (employee === undefined) {
    throw new Error('Informações inválidas');
  }

  return getEmployeeCoverage(employee);
}

module.exports = getEmployeesCoverage;
