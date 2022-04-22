import { NumberInput } from 'react-admin';
import { InputAdornment } from '@material-ui/core';
import EventIcon from '@material-ui/icons/Event';

const BillingDayInput = props => (
  <NumberInput
    min={1}
    max={28}
    source="billingDay"
    step={1}
    validate={rec =>
      (28 >= rec && rec >= 1) || rec === null ? false : 'Invalid Day'
    }
    InputProps={{
      startAdornment: (
        <InputAdornment position="start" style={{ color: 'hsl(0deg 0% 44%)' }}>
          <EventIcon />
        </InputAdornment>
      ),
    }}
    {...props}
  />
);
export default BillingDayInput;
