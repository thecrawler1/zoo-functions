const { employees } = require('../data/zoo_data');

function getEmployeeByName(name) {
  return employees.find((e) => e.firstName === name || e.lastName === name) || {};
}

module.exports = getEmployeeByName;
