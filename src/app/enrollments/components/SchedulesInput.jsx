import { formatTime, parseTime, weekDays, weekDaysFull } from 'utils/format';
import AddScheduleButton from '../components/AddScheduleButton';
import {
  ArrayInput,
  FormDataConsumer,
  required,
  SimpleFormIterator,
} from 'react-admin';
import { KeyboardTimeInput } from 'react-admin-date-inputs';

const SchedulesInput = props => {
  return weekDays.map((day, i) => (
    <ArrayInput source={day} label={weekDaysFull[i]} key={i} {...props}>
      <SimpleFormIterator
        //style={{ backgroud: 'red' }}
        addButton={<AddScheduleButton i={i} />}
        disableReordering
        getItemLabel={() => null}
      >
        <FormDataConsumer>
          {data => {
            return (
              <>
                <KeyboardTimeInput
                  ampm={false}
                  label="Start"
                  source={data.getSource('start')}
                  options={{ format: 'HH:mm' }}
                  parse={parseTime}
                  format={formatTime}
                  initialValue={null}
                  validate={required()}
                />
                <KeyboardTimeInput
                  ampm={false}
                  label="End"
                  source={data.getSource('end')}
                  options={{ format: 'HH:mm' }}
                  parse={parseTime}
                  format={formatTime}
                  //initialValue={null}
                  validate={required()}
                  disabled={
                    data.scopedFormData && data.scopedFormData.start
                      ? false
                      : true
                  }
                />
              </>
            );
          }}
        </FormDataConsumer>
      </SimpleFormIterator>
    </ArrayInput>
  ));
};
export default SchedulesInput;
