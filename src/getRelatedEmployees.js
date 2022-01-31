const data = require('../data/zoo_data');

function isManager(id) {
  return data.employees.some((e) => e.managers.includes(id));
}

function filterRelatedEmployees(managerId) {
  return data.employees.filter(({ managers }) => managers.includes(managerId));
}

function getEmployeesFullNames(employees) {
  return employees.map((e) => `${e.firstName} ${e.lastName}`);
}

function getRelatedEmployees(managerId) {
  if (!isManager(managerId)) {
    throw new Error('O id inserido não é de uma pessoa colaboradora gerente!');
  }

  const relatedEmployees = filterRelatedEmployees(managerId);

  return getEmployeesFullNames(relatedEmployees);
}

module.exports = { isManager, getRelatedEmployees };
