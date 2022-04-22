import Modal from 'app/components/Modal';
import { Button, Typography, Box, LinearProgress } from '@material-ui/core';
import { Notification } from 'react-admin';

const UnconfirmedEmailModal = ({ open, onResend, onClose, loading }) => {
  const handleClose = (event, why) => {
    if (why && why === 'backdropClick') return;
    onClose();
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Notification />
      <Box p={3}>
        <Typography variant="h6" gutterBottom>
          Please verify your email
        </Typography>
        <Typography variant="body1" gutterBottom>
          You need to verify your email first! Please follow the instructions on
          the email we sent to you.
        </Typography>
        <Typography variant="body2">Did not receive our email?</Typography>
        <Button color="primary" disabled={loading} onClick={onResend}>
          Resend email
        </Button>
        {loading && <LinearProgress />}
      </Box>
    </Modal>
  );
};
export default UnconfirmedEmailModal;
