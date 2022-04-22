import * as React from 'react';
import { formatTime, parseTime, weekDays, weekDaysFull } from 'utils/format';
import { Box, Paper, Typography, LinearProgress } from '@material-ui/core';
import LabeledText from './LabeledText';

const calcTotalHours = enrollments => {
  const calcDayHours = enrollmentDay =>
    enrollmentDay.reduce((sum, schedule) => {
      return schedule && schedule.end && schedule.start
        ? sum +
            (formatTime(schedule.end).valueOf() -
              formatTime(schedule.start).valueOf()) /
              1000 /
              3600
        : sum;
    }, 0);
  const calcEnrollmentHours = enrollment =>
    weekDays.reduce((sum, day, i, weekDays) => {
      if (enrollment[day] && enrollment[day].reduce) {
        let dayHours = calcDayHours(enrollment[day]);
        return sum + dayHours;
      }
      return sum;
    }, 0);
  const totalHours = enrollments.reduce((sum, enrollment, i) => {
    return calcEnrollmentHours(enrollment) + sum;
  }, 0);

  return totalHours;
};
const calcMonthlyIncome = enrollments =>
  enrollments.reduce((sum, enrollment) => sum + enrollment.monthlyValue, 0);
const parseTotalHours = totalHours => {
  return `${(totalHours - (totalHours % 1)).toFixed(0)}h${(
    (totalHours % 1) *
    60
  ).toFixed(0)}m`;
};
const Numbers = ({ populatedEnrollments }) => {
  const totalHours = calcTotalHours(populatedEnrollments);
  const parsedTotalHours = parseTotalHours(totalHours);
  const monthlyIncome = calcMonthlyIncome(populatedEnrollments);
  const parsedMonthlyIncome =
    typeof totalHours === 'number' && totalHours !== 0
      ? '$' + (monthlyIncome / (totalHours * 4)).toFixed(0)
      : '-';
  //   console.log(totalHours)
  return (
    <Box component={Paper} width="min-content" p={1} display="flex">
      <LabeledText text={parsedTotalHours} label="WEEKLY LOAD" />
      <LabeledText text={'$' + monthlyIncome} label="MONTHLY INCOME" ml={1.5} />
      <LabeledText
        text={parsedMonthlyIncome}
        label="AVERAGE HOUR VALUE"
        ml={1.5}
      />
    </Box>
  );
};
export default Numbers;
