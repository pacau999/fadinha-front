import { useState } from 'react';
import {
  Typography,
  Box,
  Paper,
  List,
  ListItem,
  ListItemText,
} from '@material-ui/core';
import TodayIcon from '@material-ui/icons/Today';
import CakeIcon from '@material-ui/icons/Cake';
import ChipTabs from 'app/components/ChipTabs';
import { capitalizeFirstLetter, trimTo } from 'utils/format';
import { EnrollmentShowModal } from 'app/enrollments/EnrollmentShow';
import { StudentShowModal } from 'app/students';
//@param enroolments:array//
const makeReminders = enrollments => {
  let billings = { today: [], yesterday: [], tomorrow: [] };
  let birthdays = { today: [], yesterday: [], tomorrow: [] };
  const now = new Date();
  const todayDate = now.getDate();
  const yesterdayDate = new Date(
    new Date().setDate(now.getDate() - 1),
  ).getDate();
  const tomorrowDate = new Date(
    new Date().setDate(now.getDate() + 1),
  ).getDate();
  const todayYear = now.getFullYear();
  enrollments.forEach(enrollment => {
    let utcBirth = new Date(enrollment.student.birth);
    utcBirth.setMinutes(utcBirth.getMinutes() + now.getTimezoneOffset());
    const birthDate = utcBirth.getDate();
    const birthYear = utcBirth.getFullYear();
    const age = todayYear - birthYear;
    if (todayDate === enrollment.billingDay) {
      billings.today.push(enrollment);
    } else if (yesterdayDate === enrollment.billingDay) {
      billings.yesterday.push(enrollment);
    } else if (tomorrowDate === enrollment.billingDay) {
      billings.tomorrow.push(enrollment);
    }

    if (todayDate === birthDate) {
      birthdays.today.push({ age, ...enrollment.student });
    } else if (yesterdayDate === birthDate) {
      birthdays.yesterday.push({ age, ...enrollment.student });
    } else if (tomorrowDate === birthDate) {
      birthdays.tomorrow.push({ age, ...enrollment.student });
    }
  });
  return { billings, birthdays };
};
const Title = () => (
  <Typography variant="h5" align="center" color="primary">
    Reminders
  </Typography>
);
const Reminders = ({ populatedEnrollments, ...props }) => {
  const [activeRemainderTab, setActiveRemainderTab] = useState('billings');
  const [activeDay, setActiveDay] = useState('today');
  const [enrollmentModal, setEnrollmentModal] = useState({
    open: false,
    data: null,
  });
  const [studentModal, setStudentModal] = useState({ open: false, data: null });
  const toggleEnrollmentModal = (data = enrollmentModal.data) => {
    setEnrollmentModal({ open: !enrollmentModal.open, data });
  };
  const toggleStudentModal = (data = studentModal.data) => {
    setStudentModal({ open: !studentModal.open, data });
  };
  const reminders = makeReminders(populatedEnrollments);
  const ReminderTabs = () => (
    <ChipTabs
      tabs={[
        {
          key: 'billings',
          empity:
            reminders.billings.today.concat(
              reminders.billings.yesterday,
              reminders.billings.tomorrow,
            ).length === 0,
          icon: <TodayIcon />,
        },
        {
          key: 'birthdays',
          empity:
            reminders.birthdays.today.concat(
              reminders.birthdays.yesterday,
              reminders.birthdays.tomorrow,
            ).length === 0,
          icon: <CakeIcon />,
        },
      ]}
      activeTabKey={activeRemainderTab}
      setActiveTab={setActiveRemainderTab}
    />
  );
  const ReminderTitle = () => (
    <Typography align="center" variant="h6" color="textSecondary">
      {capitalizeFirstLetter(activeRemainderTab)}
    </Typography>
  );
  const DayTabs = () => (
    <ChipTabs
      activeTabKey={activeDay}
      setActiveTab={setActiveDay}
      tabs={[
        {
          key: 'yesterday',
          empity: reminders[activeRemainderTab].yesterday.length === 0,
        },
        {
          key: 'today',
          empity: reminders[activeRemainderTab].today.length === 0,
        },

        {
          key: 'tomorrow',
          empity: reminders[activeRemainderTab].tomorrow.length === 0,
        },
      ]}
    />
  );
  return (
    <Box component={Paper} pt={1} {...props}>
      <Title />
      <ReminderTabs />
      <Box my={2}>
        <ReminderTitle />
        <DayTabs />
        <List>
          {reminders[activeRemainderTab][activeDay].map((reminder, i) => {
            const handleClick = () => {
              activeRemainderTab === 'birthdays'
                ? toggleStudentModal(reminder)
                : toggleEnrollmentModal(reminder);
            };
            return (
              <ListItem key={i} button onClick={handleClick}>
                <ListItemText
                  primary={
                    activeRemainderTab === 'birthdays'
                      ? trimTo(reminder.name, 35) + '🎉'
                      : trimTo(reminder.student.name, 40)
                  }
                  secondary={
                    activeRemainderTab === 'birthdays'
                      ? reminder.age + ' years'
                      : reminder.student.liable
                      ? `${reminder.tutoringType.name}, $${
                          reminder.monthlyValue
                        }, Liable: ${trimTo(reminder.student.liable, 20)}`
                      : '[' + reminder.tutoringType.name + ']'
                  }
                />
              </ListItem>
            );
          })}
        </List>
      </Box>
      <EnrollmentShowModal
        data={enrollmentModal.data}
        open={enrollmentModal.open}
        onClose={toggleEnrollmentModal}
      />
      <StudentShowModal
        data={studentModal.data}
        open={studentModal.open}
        resourceLinkText={
          studentModal.data &&
          studentModal.data.name &&
          studentModal.data.name.split(' ')[0]
        }
        onClose={toggleStudentModal}
      />
    </Box>
  );
};
export default Reminders;
