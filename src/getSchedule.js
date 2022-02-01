const { hours, species } = require('../data/zoo_data');
const getSpecieByName = require('./getSpecieByName');
const getNames = require('./getNames');

function isTargetASpecieName(target) {
  const speciesNames = getNames(species);

  return speciesNames.includes(target);
}

function getSpecieAvailabilityByName(name) {
  const specie = getSpecieByName(name);

  return specie.availability;
}

function getWeekdays() {
  return Object.keys(hours);
}

function isTargetAWeekday(target) {
  const weekdays = getWeekdays();

  return weekdays.includes(target);
}

function filterSpeciesAvailableOnAWeekday(weekday) {
  return species.filter((s) => s.availability.includes(weekday));
}

function getWeekdaySchedule(weekday) {
  const { open, close } = hours[weekday];
  const speciesAvailable = filterSpeciesAvailableOnAWeekday(weekday);

  return weekday === 'Monday'
    ? {
      officeHour: 'CLOSED',
      exhibition: 'The zoo will be closed!',
    } : {
      officeHour: `Open from ${open}am until ${close}pm`,
      exhibition: getNames(speciesAvailable),
    };
}

function getSingleWeekdayShedule(weekday) {
  return { [weekday]: getWeekdaySchedule(weekday) };
}

function reduceSchedule(schedule, weekday) {
  return {
    ...schedule,
    [weekday]: getWeekdaySchedule(weekday),
  };
}

function getCompleteSchedule() {
  const weekdays = getWeekdays();

  return weekdays.reduce(reduceSchedule, {});
}

function getSchedule(target) {
  if (isTargetASpecieName(target)) {
    return getSpecieAvailabilityByName(target);
  }

  if (isTargetAWeekday(target)) {
    return getSingleWeekdayShedule(target);
  }

  return getCompleteSchedule();
}

module.exports = getSchedule;
