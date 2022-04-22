import {
  Datagrid,
  FunctionField,
  List,
  ReferenceField,
  SimpleList,
  TextField,
  TextInput,
} from 'react-admin';
import { useMediaQuery } from '@material-ui/core';
import { scheduleFormat, trimTo } from 'utils/format';
import SchedulesField from '../components/SchedulesField';
const enrollmentsFilters = [<TextInput source="q" label="Search" alwaysOn />];

export const EnrollmentList = props => {
  const isSmall = useMediaQuery(theme => theme.breakpoints.down('sm'));
  return (
    <List {...props} bulkActionButtons={false} filters={enrollmentsFilters}>
      {isSmall ? (
        <SimpleList
          primaryText={
            <ReferenceField
              link={false}
              source="studentId"
              reference="students"
            >
              <FunctionField
                label="student"
                render={record => trimTo(record.name, 30)}
              />
              {/* <TextField source="name" /> */}
            </ReferenceField>
          }
          secondaryText={record => scheduleFormat(record)}
          tertiaryText={
            <ReferenceField
              link={false}
              source="tutoringTypeId"
              reference="tutoringTypes"
            >
              <TextField source="name" style={{ float: 'right' }} />
            </ReferenceField>
          }
          linkType="show"
        />
      ) : (
        <Datagrid rowClick="show">
          <ReferenceField source="tutoringTypeId" reference="tutoringTypes">
            <TextField source="name" />
          </ReferenceField>
          <ReferenceField source="studentId" reference="students">
            <TextField source="name" />
          </ReferenceField>
          <FunctionField
            label="Schedule"
            render={record => <SchedulesField record={record} />}
          />
        </Datagrid>
      )}
    </List>
  );
};
export default EnrollmentList;
