const { employees } = require('../data/zoo_data');

function isManager(id) {
  return employees.some((e) => e.managers.includes(id));
}

function getRelatedEmployees(managerId) {
  if (!isManager(managerId)) {
    throw new Error('O id inserido não é de uma pessoa colaboradora gerente!');
  }

  const relatedEmployees = employees.filter((e) => e.managers.includes(managerId));
  const relatedEmployeesNames = relatedEmployees.map((e) => `${e.firstName} ${e.lastName}`);

  return relatedEmployeesNames;
}

module.exports = { isManager, getRelatedEmployees };
