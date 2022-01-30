const { prices } = require('../data/zoo_data');
const isUndefinedOrEmpty = require('./isUndefinedOrEmpty');

function getAgeCategory(age) {
  if (age < 18) return 'child';
  if (age < 50) return 'adult';
  return 'senior';
}

function reduceCountEntrants(count, { age }) {
  const ageCategory = getAgeCategory(age);

  return {
    ...count,
    [ageCategory]: count[ageCategory] + 1,
  };
}

function countEntrants(entrants) {
  return entrants.reduce(reduceCountEntrants, { child: 0, adult: 0, senior: 0 });
}

function reducePriceTotal(count) {
  return (total, ageCategory) => total + prices[ageCategory] * count[ageCategory];
}

function calculateEntry(entrants) {
  if (isUndefinedOrEmpty(entrants)) {
    return 0;
  }

  const count = countEntrants(entrants);

  return ['child', 'adult', 'senior'].reduce(reducePriceTotal(count), 0);
}

module.exports = { calculateEntry, countEntrants };
