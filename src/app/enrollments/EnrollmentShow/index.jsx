import { Show } from 'react-admin';

import EnrollmentShowContent from './EnrollmentShowContent';
import EnrollmentShowModal from './EnrollmentShowModal';

const EnrollmentShow = props => {
  return (
    <Show {...props}>
      <EnrollmentShowContent />
    </Show>
  );
};
export { EnrollmentShowContent, EnrollmentShowModal };
export default EnrollmentShow;
