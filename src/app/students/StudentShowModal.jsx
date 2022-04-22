import ResourceShowModal from 'app/components/ResourceShowModal';
import StudentShowContent from './commom/StudentShowContent';

const StudentShowModal = props => (
  <ResourceShowModal
    ShowContent={StudentShowContent}
    resourceName="students"
    {...props}
  />
);
export default StudentShowModal;
