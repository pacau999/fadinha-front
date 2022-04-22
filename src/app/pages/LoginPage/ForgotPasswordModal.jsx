import Modal from 'app/components/Modal';
import { Button, Typography, Box, LinearProgress } from '@material-ui/core';
import { TextField } from 'mui-rff';
import { Form } from 'react-final-form';
import { Notification } from 'react-admin';

const ForgotPasswordModal = ({
  open,
  onRequestReset,
  onClose,
  loading,
  initialValue,
}) => {
  const handleClose = (event, why) => {
    if (why && why === 'backdropClick') return;
    onClose();
  };
  const handleRequest = ({ email }) => {
    onRequestReset(email);
  };
  return (
    <Modal open={open} onClose={handleClose}>
      <Notification />
      <Box p={3}>
        <Typography variant="h6" gutterBottom>
          Password reset request
        </Typography>
        <Typography variant="body1" gutterBottom>
          Enter your account email to receive a link to change your password
        </Typography>
        <Form
          initialValues={{ email: initialValue }}
          onSubmit={handleRequest}
          render={({ handleSubmit }) => (
            <form onSubmit={handleSubmit}>
              <TextField
                name="email"
                type="email"
                placeholder="your@email.com"
                label="Email"
                margin="normal"
              />
              <Box mt={2} />
              <Button color="primary" disabled={loading} type="submit">
                Request password reset
              </Button>
            </form>
          )}
        />

        {loading && <LinearProgress />}
      </Box>
    </Modal>
  );
};
export default ForgotPasswordModal;
