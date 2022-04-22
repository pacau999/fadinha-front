import EnhancedToolbar from 'app/components/EnhancedToolbar';
import { Edit, useGetManyReference } from 'react-admin';
import StudentCreateAndEditForm from './commom/StudentCreateAndEditForm';
import StudentFirstName from './commom/StudentFirstName';

const StudentEdit = props => {
  const { total, loaded } = useGetManyReference(
    'enrollments',
    'studentId',
    props.id,
    { page: 1, perPage: 1 },
    {},
    {},
    'students',
  );
  return (
    <Edit {...props} title={<StudentFirstName />}>
      <StudentCreateAndEditForm
        toolbar={
          <EnhancedToolbar
            disableDeleteButtonIfHaveRelatedRecords
            total={total}
            loaded={loaded}
          />
        }
        enrollments={total}
      />
    </Edit>
  );
};
export default StudentEdit;
