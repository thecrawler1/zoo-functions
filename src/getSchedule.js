const { hours, species } = require('../data/zoo_data');
const getSpecieByName = require('./getSpecieByName');
const getNames = require('./getNames');

function getWeekdays() {
  return Object.keys(hours);
}

function getSpeciesNamesAvailableOnAWeekday(weekday) {
  const speciesAvailable = species.filter((specie) => specie.availability.includes(weekday));
  const speciesNames = getNames(speciesAvailable);

  return speciesNames;
}

function getWeekdaySchedule(weekday) {
  const { open, close } = hours[weekday];

  return weekday === 'Monday'
    ? {
      officeHour: 'CLOSED',
      exhibition: 'The zoo will be closed!',
    } : {
      officeHour: `Open from ${open}am until ${close}pm`,
      exhibition: getSpeciesNamesAvailableOnAWeekday(weekday),
    };
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

function getSchedule(scheduleTarget) {
  const speciesNames = getNames(species);

  if (speciesNames.includes(scheduleTarget)) {
    const specie = getSpecieByName(scheduleTarget);

    return specie.availability;
  }

  const schedule = getCompleteSchedule();

  if (scheduleTarget in schedule) {
    return { [scheduleTarget]: schedule[scheduleTarget] };
  }

  return schedule;
}

module.exports = getSchedule;
