const { hours, species } = require('../data/zoo_data');
const getSpecieByName = require('./getSpecieByName');
const getNames = require('./getNames');

function getWeekdays() {
  return Object.keys(hours);
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
