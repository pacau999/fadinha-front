import {
  Create,
  ReferenceInput,
  SelectInput,
  SimpleForm,
  useNotify,
  required,
} from 'react-admin';
import RichTextInput from 'ra-input-rich-text';
import MonthlyValueWithSuggestionInput from '../components/MonthlyValueWithSuggestionInput';
import BillingDayInput from '../components/BillingDayInput';
import SchedulesInput from '../components/SchedulesInput';
import FormCatcher from '../components/FormCatcher';
import validateSchedules from '../utils/validateSchedules';
import { useState } from 'react';

const EnrollmentCreate = props => {
  const [form, setForm] = useState(null);
  const notify = useNotify();
  return (
    <Create {...props}>
      <SimpleForm validate={validateSchedules(form, notify)}>
        <FormCatcher set={setForm} />
        <ReferenceInput
          source="studentId"
          reference="students"
          validate={required()}
        >
          <SelectInput optionText="name" />
        </ReferenceInput>
        <ReferenceInput
          source="tutoringTypeId"
          reference="tutoringTypes"
          validate={required()}
        >
          <SelectInput optionText="name" />
        </ReferenceInput>
        <SchedulesInput />
        <MonthlyValueWithSuggestionInput validate={required()} />
        <BillingDayInput validate={required()} />
        <RichTextInput source="note" />
      </SimpleForm>
    </Create>
  );
};
export default EnrollmentCreate;
