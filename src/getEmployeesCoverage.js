const { employees } = require('../data/zoo_data');
const getSpeciesByIds = require('./getSpeciesByIds');
const getSpeciesLocations = require('./getSpeciesLocations');
const getNames = require('./getNames');
const getEmployeeById = require('./getEmployeeById');
const getEmployeeByName = require('./getEmployeeByName');
const isUndefinedOrEmpty = require('./isUndefinedOrEmpty');

function getEmployeeCoverage(employee) {
  const species = getSpeciesByIds(...employee.responsibleFor);
  const locations = getSpeciesLocations(species);

  return {
    id: employee.id,
    fullName: `${employee.firstName} ${employee.lastName}`,
    species: getNames(species),
    locations,
  };
}

function getEmployeesCoverage(options) {
  if (options === undefined) {
    return employees.map((employee) => getEmployeeCoverage(employee));
  }

  const employee = options.id
    ? getEmployeeById(options.id)
    : getEmployeeByName(options.name);

  if (isUndefinedOrEmpty(employee)) {
    throw new Error('Informações inválidas');
  }

  return getEmployeeCoverage(employee);
}

module.exports = getEmployeesCoverage;
