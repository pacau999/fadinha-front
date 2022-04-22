import {
  FunctionField,
  ReferenceField,
  RichTextField,
  SimpleShowLayout,
  TextField,
} from 'react-admin';

import SchedulesField from '../components/SchedulesField';

const EnrollmentShowContent = props => {
  return (
    <SimpleShowLayout {...props}>
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
      <FunctionField
        label="Schedules"
        render={record => <SchedulesField record={record} multiline />}
      />
      <FunctionField
        label="Monthly Value"
        render={record => 'R$ ' + record.monthlyValue}
      />

      <TextField source="billingDay" />
      <RichTextField source="note" />
    </SimpleShowLayout>
  );
};
export default EnrollmentShowContent;
