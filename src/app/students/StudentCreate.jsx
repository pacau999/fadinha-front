import { Create } from 'react-admin';

import StudentCreateAndEditForm from './commom/StudentCreateAndEditForm';

const StudentCreate = props => (
  <Create {...props}>
    <StudentCreateAndEditForm />
  </Create>
);
export default StudentCreate;
