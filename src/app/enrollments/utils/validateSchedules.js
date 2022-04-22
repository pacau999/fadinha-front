import { weekDays } from 'utils/format';

const validateSchedules = (form, notify) => formData => {
  var errors = {};
  var errorCount = 0;
  weekDays.forEach(day => {
    if (formData[day] && formData[day].length && formData[day].length > 0) {
      if (!errors[day]) errors[day] = [];
      formData[day].forEach((validatingSchedule, validatingScheduleI) => {
        if (!errors[day][validatingScheduleI])
          errors[day][validatingScheduleI] = {};
        let overlappingStart = null;
        if (validatingSchedule && validatingSchedule.start) {
          overlappingStart = formData[day].reduce((acc, schedule, i) => {
            if (!schedule) return acc;
            if (validatingScheduleI === i) return acc;
            if (
              validatingSchedule.start === schedule.start ||
              (validatingSchedule.start > schedule.start &&
                validatingSchedule.start < schedule.end)
            )
              return acc + 1;
            return acc;
          }, 0);
        }
        let overlappingEnd = null;
        if (validatingSchedule && validatingSchedule.end) {
          overlappingEnd = formData[day].reduce((acc, schedule, i) => {
            if (!schedule) return acc;
            if (validatingScheduleI === i) return acc;
            if (
              validatingSchedule.end === schedule.end ||
              (validatingSchedule.end > schedule.start &&
                validatingSchedule.start < schedule.start)
            )
              return acc + 1;
            return acc;
          }, 0);
        }

        if (overlappingStart) {
          errorCount++;
          errors[day][validatingScheduleI].start = 'Overllaping Schedule';
        }
        if (overlappingEnd) {
          errorCount++;
          errors[day][validatingScheduleI].end = 'Overllaping Schedule';
        }
        if (
          validatingSchedule &&
          validatingSchedule.end &&
          validatingSchedule.start
        ) {
          if (validatingSchedule.start > validatingSchedule.end) {
            errorCount++;
            errors[day][validatingScheduleI].start = "Can't start after ending";
            errors[day][validatingScheduleI].end = "Can't end after starting";
          }
        }
        if (
          validatingSchedule &&
          !(validatingSchedule.end && validatingSchedule.start)
        ) {
          errorCount++;
          errors[day][validatingScheduleI].start = 'Required';
          errors[day][validatingScheduleI].end = 'Required';
        }
      });
    }
  });

  if (errorCount === 0 && formData) {
    //Sort schedules by starting hour if there is no validation error
    let notNullDaysArray = weekDays
      .filter(day =>
        formData[day] && formData[day].length && formData[day].length > 0
          ? true
          : false,
      )
      .map(day => {
        return { name: day, sched: [...formData[day]] };
      });
    let sortedDayScheds = notNullDaysArray.map(dayObj => {
      let sortedSched = [...dayObj.sched].sort((schedA, schedB) =>
        schedA.start < schedB.start ? -1 : 1,
      );

      return {
        name: dayObj.name,
        sched: sortedSched,
      };
    });

    if (JSON.stringify(notNullDaysArray) !== JSON.stringify(sortedDayScheds)) {
      notify('Automatically sorted by start hour');
      form.batch(() => {
        sortedDayScheds.forEach(day => {
          form.change(day.name, day.sched);
        });
      });
    }
    if (notNullDaysArray.length === 0) {
      errors.sun = "Enrollment can't have an empity schedule";
      // notify("Enrollment can't have an empity schedule","error");
    }
    // console.log(form && form.getState());
  }
  //console.log('validated');
  return errors;
};
export default validateSchedules;
