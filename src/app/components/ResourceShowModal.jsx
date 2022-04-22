import { Box, Typography } from '@material-ui/core';
import { Link } from 'react-admin';
import { capitalizeFirstLetter } from 'utils/format';
import Modal from './Modal';

const ResourceShowModal = ({
  data,
  open,
  onClose,
  ShowContent,
  resourceName,
  title,
  resourceLinkText,
}) => (
  <Modal open={open} onClose={onClose}>
    {data && (
      <>
        <Box pl={1} mt={1}>
          <Typography variant="h6">
            {title ||
              capitalizeFirstLetter(resourceName).slice(
                0,
                resourceName.length - 1,
              )}
            <Link to={resourceName + '/' + data.id + '/show'}>
              {' '}
              {resourceLinkText || '#' + data.id}
            </Link>
          </Typography>
        </Box>
        <ShowContent
          record={data}
          basePath={'/' + resourceName}
          resource={resourceName}
        />
      </>
    )}
  </Modal>
);
export default ResourceShowModal;
