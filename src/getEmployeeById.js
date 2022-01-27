const { employees } = require('../data/zoo_data');

function getEmployeeById(id) {
  return employees.find((employee) => employee.id === id);
}

module.exports = getEmployeeById;
