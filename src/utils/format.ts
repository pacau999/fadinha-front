const formatPhone = (phone: string): string => {
  if (phone.length === 11)
    return phone.replace(/(\d{2})(\d{1})(\d{4})(\d{4})/, '($1) $2 $3-$4');
  else if (phone.length === 10)
    return phone.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
  else return phone;
};
const formatCPF = (cpf: string): string => {
  if (cpf.length === 11)
    return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
  else return cpf;
};
const parseTime = (dateString: string): string => {
  const fullDate = new Date(dateString);
  if (isNaN(fullDate.valueOf())) return dateString;
  let hours = String(fullDate.getHours());
  let minutes = String(fullDate.getMinutes());
  if (hours.length < 2) hours = '0' + hours;
  if (minutes.length < 2) minutes = '0' + minutes;
  return `${hours}:${minutes}`;
};
const formatTime = (hourString: string): any => {
  let now = new Date();
  if (!hourString) return '';
  now.setHours(Number(hourString.split(':')[0]));
  now.setMinutes(Number(hourString.split(':')[1]));
  return now;
};

const weekDays = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];

const weekDaysFull = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];

const capitalizeFirstLetter = word =>
  word.charAt(0).toUpperCase() + word.slice(1);

const scheduleFormat = record => {
  if (!record) return;
  let daysSchedules = [];

  weekDays.forEach(day => {
    if (record[day] && record[day].length > 0) {
      const startingHours = record[day]
        .filter(e => e)
        .map(schedule => schedule.start)
        .join('|');
      daysSchedules.push(`${capitalizeFirstLetter(day)} [${startingHours}] `);
    }
  });
  return daysSchedules;
};
const trimTo = (string, maxLength) =>
  string.length && string.length > maxLength
    ? string.slice(0, maxLength).trim() + '...'
    : string;

export {
  formatPhone,
  formatTime,
  formatCPF,
  parseTime,
  capitalizeFirstLetter,
  weekDays,
  weekDaysFull,
  scheduleFormat,
  trimTo,
};
