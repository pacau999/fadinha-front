import { scheduleFormat } from 'utils/format';
import { Typography, Box } from '@material-ui/core';

const SchedulesField = ({ record, multiline }) => (
  <div style={{ display: 'flex', flexWrap: 'wrap' }}>
    {scheduleFormat(record).map((daySchedule, i) => (
      <Box key={i} width={multiline ? '100%' : 'initial'}>
        <Typography variant="caption">
          {daySchedule}
          &nbsp;
        </Typography>
      </Box>
    ))}
  </div>
);
export default SchedulesField;
