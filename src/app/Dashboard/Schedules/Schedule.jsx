import { formatTime, trimTo } from 'utils/format';
import { Typography, Box, ListItem, ListItemText } from '@material-ui/core';

const Schedule = ({
  data: schedule,
  toggleModal,
  activeTab,
  free,
  ...props
}) => {
  if (free)
    return (
      <ListItem>
        <ListItemText
          primaryTypographyProps={{
            color: 'textSecondary',
            align: 'center',
            variant: 'body2',
          }}
          primary="Free"
        />
      </ListItem>
    );
  const now = new Date();
  var start = formatTime(schedule.appointment.start);
  var end = formatTime(schedule.appointment.end);
  var currentDay = now.getDay();
  var distance = activeTab - currentDay;
  end.setDate(end.getDate() + distance);
  start.setDate(start.getDate() + distance);
  const openEnrollmentModal = () => {
    toggleModal(schedule.enrollment);
  };
  return (
    <Box color={now >= end ? 'text.disabled' : 'text.secondary'} {...props}>
      <ListItem button onClick={openEnrollmentModal}>
        <ListItemText
          disableTypography
          primary={
            <Box minWidth={'200px'}>
              <Box
                color={
                  now >= end
                    ? 'text.disabled'
                    : now >= start
                    ? 'warning.main'
                    : 'info.main'
                }
                display="inline-block"
              >
                <Typography variant="body1">
                  <strong>
                    {schedule.appointment.start}{' '}
                    <span style={{ opacity: '0.35' }}>| </span>
                    <small>{schedule.appointment.end}</small>
                  </strong>
                </Typography>
              </Box>
              <span style={{ float: 'right' }}>
                <Typography variant="body1">
                  {schedule.tutoringType.name}
                </Typography>
              </span>
            </Box>
          }
          secondary={
            <Box width={'100%'} display="flex" justifyContent={'space-between'}>
              <Typography variant="body2">
                {trimTo(schedule.student.name, 45)}
              </Typography>
              {/* {schedule.enrollment.billingDay &&
              schedule.enrollment.billingDay === now.getDate() ? (
                <Box
                  display="inline-flex"
                  color="warning.main"
                  borderColor="warning.main"
                  border="1px solid"
                  borderRadius=".5em"
                  px={0.5}
                >
                  <Typography variant="caption">Billing day</Typography>
                </Box>
              ) : null} */}
            </Box>
          }
        />
      </ListItem>
    </Box>
  );
};

export default Schedule;
