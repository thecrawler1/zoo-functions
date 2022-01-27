const { prices } = require('../data/zoo_data');

function isUndefinedOrEmpty(x) {
  return x === undefined || Object.keys(x).length === 0;
}

function getAgeCategory(age) {
  if (age < 18) return 'child';
  if (age < 50) return 'adult';
  return 'senior';
}

function reduceCount(count, category) {
  return {
    ...count,
    [category]: count[category] + 1,
  };
}

function countEntrants(entrants) {
  const categories = entrants.map(({ age }) => getAgeCategory(age));
  const initialCount = { child: 0, adult: 0, senior: 0 };

  return categories.reduce(reduceCount, initialCount);
}

function reduceTotal(count) {
  return (total, category) => total + prices[category] * count[category];
}

function calculateEntry(entrants) {
  if (isUndefinedOrEmpty(entrants)) {
    return 0;
  }

  const count = countEntrants(entrants);

  return ['child', 'adult', 'senior'].reduce(reduceTotal(count), 0);
}

module.exports = { calculateEntry, countEntrants };
