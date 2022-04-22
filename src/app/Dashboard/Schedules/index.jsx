import * as React from 'react';
import { weekDays, weekDaysFull } from 'utils/format';
import { Typography, Box, Paper, List } from '@material-ui/core';
import { EnrollmentShowModal } from 'app/enrollments/EnrollmentShow';
import Schedule from './Schedule';
import ChipTabs from 'app/components/ChipTabs';

const makeSchedule = populatedEnrollments => {
  var schedules = {};
  weekDays.forEach((day, i) => {
    schedules[day] = [];
  });
  if (populatedEnrollments && populatedEnrollments.length > 0) {
    populatedEnrollments.forEach(enrollment => {
      weekDays.forEach(day => {
        if (enrollment[day] && enrollment[day].length > 0) {
          let { student, tutoringType, id: enrollmentId } = enrollment;
          enrollment[day].forEach(appointment => {
            schedules[day].push({
              appointment,
              student,
              tutoringType,
              enrollmentId,
              enrollment,
            });
          });
        }
      });
    });
    Object.keys(schedules).forEach(day => {
      if (schedules[day] && schedules[day].length > 1) {
        schedules[day].sort((a, b) =>
          a.appointment.start > b.appointment.end ? 1 : -1,
        );
      }
    });
  }
  return schedules;
};

const Schedules = ({ populatedEnrollments }) => {
  const schedules = makeSchedule(populatedEnrollments);
  const [activeTab, setActiveTab] = React.useState(new Date().getDay());
  const [modal, setModal] = React.useState({ data: null, open: false });
  const toggleModal = (data = modal.data) => {
    setModal({ data, open: !modal.open });
  };
  const Title = () => (
    <Typography variant="h5" align="center" color="primary">
      Schedules
    </Typography>
  );
  const DaySchedules = () => (
    <List>
      {schedules[weekDays[activeTab]].length > 0 ? (
        schedules[weekDays[activeTab]].map((schedule, i) => (
          <Schedule
            activeTab={activeTab}
            toggleModal={toggleModal}
            data={schedule}
            key={i}
          />
        ))
      ) : (
        <Schedule free />
      )}
    </List>
  );
  const WeekDaysTabs = () => (
    <ChipTabs
      activeTabKey={activeTab}
      setActiveTab={setActiveTab}
      tabs={weekDays.map((day, i) => ({
        label: day,
        key: i,
        empity: schedules[day].length === 0,
      }))}
    />
  );
  const WeekDayTitle = () => (
    <Typography align="center" variant="h6" color="textSecondary">
      {weekDaysFull[activeTab]}
      {activeTab === new Date().getDay() ? (
        <strong>
          <small> (today)</small>
        </strong>
      ) : null}
    </Typography>
  );

  return (
    <Box
      component={Paper}
      style={{ width: 'max-content', maxWidth: '100%' }}
      pt={1}
    >
      <Title />
      <WeekDaysTabs />
      <Box my={2}>
        <WeekDayTitle />
        <DaySchedules />
      </Box>
      <EnrollmentShowModal
        open={modal.open}
        data={modal.data}
        onClose={toggleModal}
      />
    </Box>
  );
};
export default Schedules;
