import {
  Edit,
  ReferenceField,
  SimpleForm,
  TextField,
  useNotify,
  required,
} from 'react-admin';
import RichTextInput from 'ra-input-rich-text';
import MonthlyValueWithSuggestionInput from '../components/MonthlyValueWithSuggestionInput';
import BillingDayInput from '../components/BillingDayInput';
import SchedulesInput from '../components/SchedulesInput';
import { useState } from 'react';
import validateSchedules from '../utils/validateSchedules';
import FormCatcher from '../components/FormCatcher';

const EnrollmentEdit = props => {
  const [form, setForm] = useState(null);
  const notify = useNotify();
  return (
    <Edit {...props}>
      <SimpleForm validate={validateSchedules(form, notify)}>
        <FormCatcher set={setForm} />
        <ReferenceField source="studentId" reference="students" link="show">
          <TextField source="name" />
        </ReferenceField>
        <ReferenceField
          source="tutoringTypeId"
          reference="tutoringTypes"
          link="show"
        >
          <TextField source="name" />
        </ReferenceField>
        <SchedulesInput />
        <MonthlyValueWithSuggestionInput validate={required()} />
        <BillingDayInput validate={required()} />
        <RichTextInput source="note" />
      </SimpleForm>
    </Edit>
  );
};
export default EnrollmentEdit;
