import Modal from 'app/components/Modal';
import { Button, Typography, Box, LinearProgress } from '@material-ui/core';
import { TextField } from 'mui-rff';
import { Form } from 'react-final-form';
import { Notification } from 'react-admin';

const SingUpModal = ({ open, onCreateNewTeacher, onClose, loading }) => {
  const handleClose = (event, why) => {
    if (why && why === 'backdropClick') return;
    onClose();
  };

  const validate = ({ password, name, email, passwordConfirm }) => {
    const errors = {};
    if (!email) errors.email = 'Email is required';
    if (!name) errors.name = 'Name is required';
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
          Sing up for a new teacher account
        </Typography>
        <Form
          onSubmit={onCreateNewTeacher}
          validate={validate}
          render={({ handleSubmit }) => (
            <form onSubmit={handleSubmit}>
              <TextField name="name" label="Name" margin="normal" required />
              <TextField
                name="email"
                type="email"
                label="Email"
                margin="normal"
                required
              />
              <TextField
                name="password"
                type="password"
                label="New password"
                margin="normal"
                required
              />
              <TextField
                name="passwordConfirm"
                type="password"
                label="Confirm your new password"
                margin="normal"
                required
              />
              <Box mt={2} />
              <Button color="primary" disabled={loading} type="submit">
                Sing up!
              </Button>
            </form>
          )}
        />

        {loading && <LinearProgress />}
      </Box>
    </Modal>
  );
};
export default SingUpModal;
