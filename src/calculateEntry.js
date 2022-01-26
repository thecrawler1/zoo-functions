const { prices } = require('../data/zoo_data');

function countEntrants(entrants) {
  const children = entrants.filter((e) => e.age < 18);
  const adults = entrants.filter((e) => e.age >= 18 && e.age < 50);
  const seniors = entrants.filter((e) => e.age >= 50);

  return {
    child: children.length,
    adult: adults.length,
    senior: seniors.length,
  };
}

function isUndefinedOrEmpty(x) {
  return x === undefined || Object.keys(x).length === 0;
}

function calculateEntry(entrants) {
  if (isUndefinedOrEmpty(entrants)) {
    return 0;
  }

  const counts = countEntrants(entrants);
  let total = 0;

  Object
    .keys(counts)
    .forEach((category) => {
      total += prices[category] * counts[category];
    });

  return total;
}

module.exports = { calculateEntry, countEntrants };
