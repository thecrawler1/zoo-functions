const { prices } = require('../data/zoo_data');
const isUndefinedOrEmpty = require('./isUndefinedOrEmpty');

function getAgeCategory(age) {
  if (age < 18) return 'child';
  if (age < 50) return 'adult';
  return 'senior';
}

function getEntrantsAgeCategories(entrants) {
  return entrants.map(({ age }) => getAgeCategory(age));
}

function reduceCountEntrants(count, ageCategory) {
  return {
    ...count,
    [ageCategory]: count[ageCategory] + 1,
  };
}

function countEntrants(entrants) {
  const ageCategories = getEntrantsAgeCategories(entrants);
  const initialCount = { child: 0, adult: 0, senior: 0 };

  return ageCategories.reduce(reduceCountEntrants, initialCount);
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
