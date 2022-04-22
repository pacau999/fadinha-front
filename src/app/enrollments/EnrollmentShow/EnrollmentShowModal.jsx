import ResourceShowModal from 'app/components/ResourceShowModal';
import { EnrollmentShowContent } from 'app/enrollments/EnrollmentShow';

const EnrollmentShowModal = props => (
  <ResourceShowModal
    ShowContent={EnrollmentShowContent}
    resourceName="enrollments"
    {...props}
  />
);
export default EnrollmentShowModal;
