import * as React from 'react';
import { Title, useNotify } from 'react-admin';
import usePopulatedEnrollments from './usePopulatedEnrollments';
import {
  Box,
  Paper,
  useMediaQuery,
  Typography,
  LinearProgress,
} from '@material-ui/core';
import Schedules from './Schedules';
import Numbers from './Numbers';
import Reminders from './Reminders';
const test = process.env.REACT_APP_TEST;
const Dashboard = () => {
  const {
    data: populatedEnrollments,
    loaded,
    error,
  } = usePopulatedEnrollments();
  const notify = useNotify();
  const isSmall = useMediaQuery(theme => theme.breakpoints.down('sm'));
  if (error) notify('Failed to Fetch', 'error');

  return (
    <Box
      display={'flex'}
      flexWrap="wrap"
      justifyContent={isSmall ? 'center' : 'start'}
      pt={1}
    >
      <Title title="Dashboard" />
      {test}
      {populatedEnrollments && populatedEnrollments.length && loaded ? (
        <Box mb={1}>
          <Box width="100%" display="flex" justifyContent="center" mb={1}>
            <Numbers populatedEnrollments={populatedEnrollments} />
          </Box>
          <Box width="100%" display="flex" justifyContent="center" mb={1}>
            <Reminders
              populatedEnrollments={populatedEnrollments}
              width="100%"
            />
          </Box>
          <Schedules populatedEnrollments={populatedEnrollments} />
        </Box>
      ) : !loaded && !error ? (
        <LinearProgress style={{ width: '100%' }} />
      ) : error ? (
        <Typography variant="body1"> Failed to load data</Typography>
      ) : (
        <Typography variant="body1"> Nothing to show</Typography>
      )}
    </Box>
  );
};
export default Dashboard;
