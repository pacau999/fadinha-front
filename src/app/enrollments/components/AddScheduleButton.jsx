import { weekDaysFull } from 'utils/format';
import AddCircleOutlinedIcon from '@material-ui/icons/AddCircleOutlined';
import { Typography, IconButton } from '@material-ui/core';
const AddScheduleButton = props => {
  return (
    <div
      style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}
      {...props}
    >
      <IconButton color="primary">
        <AddCircleOutlinedIcon />
      </IconButton>
      <Typography color="primary" variant="body2">
        Add {weekDaysFull[props.i]} Sched.
      </Typography>
    </div>
  );
};
export default AddScheduleButton;
