import { NumberInput, useReference } from 'react-admin';
import { InputAdornment } from '@material-ui/core';
import { useFormState } from 'react-final-form';
import { formatTime, weekDays } from 'utils/format';
import React from 'react';

const MonthlyValueWithSuggestionInput = props => {
  const form = useFormState();
  const reference = useReference({
    id: form.values.tutoringTypeId,
    reference: 'tutoringTypes',
  });

  //console.log(form)
  const calcWeekHours = () => {
    //let weekDaysAux = [...weekDays]
    const hours = weekDays.reduce((sum, day, i, weekDays) => {
      if (!(form && form.values)) weekDays.splice(0);
      if (form.values[day] && form.values[day].reduce) {
        const dayHours = form.values[day].reduce((sum, schedule) => {
          return schedule && schedule.end && schedule.start
            ? sum +
                (formatTime(schedule.end).valueOf() -
                  formatTime(schedule.start).valueOf()) /
                  1000 /
                  3600
            : sum;
        }, 0);
        return sum + dayHours;
      }
      return sum;
    }, 0);
    return hours;
  };
  const weekHours = calcWeekHours();
  const suggestionString =
    reference.referenceRecord &&
    reference.referenceRecord.sugestedHourValue &&
    weekHours > 0
      ? 'Suggested: R$ ' +
        (reference.referenceRecord.sugestedHourValue * weekHours * 4).toFixed(0)
      : '';
  return (
    <NumberInput
      source="monthlyValue"
      InputProps={{
        startAdornment: <InputAdornment position="start">R$</InputAdornment>,
      }}
      helperText={suggestionString}
      {...props}
    />
  );
};
export default MonthlyValueWithSuggestionInput;
