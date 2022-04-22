import Modal from 'app/components/Modal';
import { Button, Typography, Box, LinearProgress } from '@material-ui/core';
import { TextField } from 'mui-rff';
import { Form } from 'react-final-form';
import { Notification } from 'react-admin';

const ResetPasswordModal = ({
  open,
  onSetPassword,
  onClose,
  loading,
  initialValue,
}) => {
  const handleClose = (event, why) => {
    if (why && why === 'backdropClick') return;
    onClose();
  };
  const handleRequest = ({ password }) => {
    onSetPassword(password);
  };
  const validate = ({ password, passwordConfirm }) => {
    const errors = {};
    if (!password || password.length < 6)
      errors.password = 'Password must have at least 6 chars';
    if (passwordConfirm !== password)
      errors.passwordConfirm = "Passwords doesn't match";
    return errors;
  };
  return (
    <Modal open={open} onClose={handleClose}>
      <Notification />
      <Box p={3}>
        <Typography variant="h5" gutterBottom>
          Set a new password
        </Typography>
        <Form
          initialValues={{ email: initialValue }}
          onSubmit={handleRequest}
          validate={validate}
          render={({ handleSubmit }) => (
            <form onSubmit={handleSubmit}>
              <TextField
                name="password"
                type="password"
                label="New password"
                margin="normal"
              />
              <TextField
                name="passwordConfirm"
                type="password"
                label="Confirm your new password"
                margin="normal"
              />
              <Box mt={2} />
              <Button color="primary" disabled={loading} type="submit">
                Save
              </Button>
            </form>
          )}
        />

        {loading && <LinearProgress />}
      </Box>
    </Modal>
  );
};
export default ResetPasswordModal;
