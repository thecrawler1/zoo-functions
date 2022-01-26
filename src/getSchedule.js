const { hours, species } = require('../data/zoo_data');

function getWeekdays() {
  return Object.keys(hours);
}

function getSpeciesNames() {
  return species.map(({ name }) => name);
}

function getSpeciesNamesAvailableOnAWeekday(weekday) {
  const speciesAvailable = species.filter((specie) => specie.availability.includes(weekday));
  const speciesNames = speciesAvailable.map(({ name }) => name);

  return speciesNames;
}

function getWeekdaysWhenASpecieIsAvailable(specieName) {
  const specie = species.find(({ name }) => name === specieName);

  return specie.availability;
}

function getCompleteSchedule() {
  const weekdays = getWeekdays();
  const schedule = {};

  weekdays.forEach((weekday) => {
    const { open, close } = hours[weekday];

    schedule[weekday] = weekday === 'Monday'
      ? {
        officeHour: 'CLOSED',
        exhibition: 'The zoo will be closed!',
      } : {
        officeHour: `Open from ${open}am until ${close}pm`,
        exhibition: getSpeciesNamesAvailableOnAWeekday(weekday),
      };
  });

  return schedule;
}

function getSchedule(scheduleTarget) {
  if (getSpeciesNames().includes(scheduleTarget)) {
    return getWeekdaysWhenASpecieIsAvailable(scheduleTarget);
  }

  const schedule = getCompleteSchedule();

  if (scheduleTarget in schedule) {
    return { [scheduleTarget]: schedule[scheduleTarget] };
  }

  return schedule;
}

module.exports = getSchedule;
