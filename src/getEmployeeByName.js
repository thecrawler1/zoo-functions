const { employees } = require('../data/zoo_data');

function getEmployeeByName(name) {
  return employees.find((e) => [e.firstName, e.lastName].includes(name)) || {};
}

module.exports = getEmployeeByName;
