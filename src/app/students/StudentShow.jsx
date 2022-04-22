import {
  ShowController,
  ShowView,
  EditButton,
  TopToolbar,
  Button,
} from 'react-admin';
import { Link } from 'react-router-dom';

import StudentFirstName from './commom/StudentFirstName';
import React from 'react';
import SchoolIcon from '@material-ui/icons/School';
import StudentShowContent from './commom/StudentShowContent';

const CreateEnrollmentButton = ({ basePath, record }) => {
  return (
    record && (
      <Button
        color="primary"
        size="small"
        component={Link}
        to={{
          pathname: '/enrollments/create',
          search: `?source=${JSON.stringify({ studentId: record.id })}`,
        }}
        label="New ENrollment"
      >
        <SchoolIcon />
      </Button>
    )
  );
};
const StudentShowActions = ({ basePath, data, resource }) => {
  return (
    <TopToolbar>
      <EditButton basePath={basePath} record={data} />
      <CreateEnrollmentButton record={data} />
    </TopToolbar>
  );
};
const StudentShow = props => {
  return (
    <ShowController {...props}>
      {controllerProps => {
        const { record } = controllerProps;
        return (
          <ShowView
            {...props}
            {...controllerProps}
            title={<StudentFirstName />}
            translate=""
            actions={<StudentShowActions />}
          >
            <StudentShowContent record={record} />
          </ShowView>
        );
      }}
    </ShowController>
  );
};
export default StudentShow;
