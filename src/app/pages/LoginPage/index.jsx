import * as React from 'react';
import { Fairy } from './Fairy';
import styles from './LoginPage.module.css';
import {
  ThemeProvider,
  Paper,
  Button,
  Typography,
  Box,
  styled,
} from '@material-ui/core';
import { TextField } from 'mui-rff';
import { Form } from 'react-final-form';
import useThemeStore, { dark, light } from 'styles/theme';
import ToggleDarkModeButton from 'app/components/ToggleDarkModeButton';
import authProvider from 'app/authProvider';
import { useNotify, Notification } from 'react-admin';
import { useToggle } from 'utils/hooks';
import UnconfirmedEmailModal from './UnconfirmedEmailModal';
import ForgotPasswordModal from './ForgotPasswordModal';
import ResetPasswordModal from './ResetPasswordModal';
import SingUpModal from './SingUpModal';

const delay = (ms = 2000) =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(ms);
    }, ms);
  });

const Top = styled('div')(({ theme }) => ({
  '&:after, &:before': {
    background: theme.palette.primary.main,
  },
}));
const Bottom = styled('div')(({ theme }) => ({
  '&:after, &:before': {
    background: theme.palette.secondary.light,
  },
}));

export function LoginPage() {
  const mode = useThemeStore(store => store.mode);
  const theme = mode === 'light' ? light : dark;
  const notify = useNotify();
  const [loading, setLoading] = React.useState(false);
  const [unconfirmedEmailModalOpen, toggleUnconfirmedEmailModalOpen] =
    useToggle();
  const [resetPasswordModalOpen, toggleResetPasswordModalOpen] = useToggle();
  const [forgotPasswordModalOpen, toggleForgotPasswordModalOpen] = useToggle();
  const [singUpModalOpen, toggleSingUpModalOpen] = useToggle();
  const [credentials, setCredentials] = React.useState({});
  const [resetToken, setResetToken] = React.useState();
  const redirToHome = () => {
    window.location.hash = '#/';
  };

  const validate = ({ password }) => {
    let errors = {};
    if (!password || password.length < 6) errors.password = 'Invalid password';
    return errors;
  };

  const handleResendVerificationEmail = async () => {
    setLoading(true);
    try {
      await authProvider.resendConfirmationEmail(credentials);
      notify(
        'The verification email was resent! check your mailbox.',
        'success',
      );
      toggleUnconfirmedEmailModalOpen();
    } catch (e) {
      notify('Could not resend the verification mail', 'error');
    }
    setLoading(false);
  };

  const login = async values => {
    setCredentials(values);
    setLoading(true);
    try {
      await authProvider.login(values);
      redirToHome();
      setLoading(false);
    } catch (e) {
      if (
        e.response &&
        e.response.data &&
        e.response.data.error &&
        e.response.data.error.type &&
        e.response.data.error.type === 'unconfirmedEmail'
      ) {
        toggleUnconfirmedEmailModalOpen();
      } else {
        notify('Login Failed, wrong email/password?', 'error');
      }
      setLoading(false);
    }
  };

  const verifyEmail = async code => {
    setLoading(true);
    try {
      await authProvider.verifyEmail({ code });
      redirToHome();
      notify('Your account is now active!', 'success');
    } catch (e) {
      notify('Invalid verification code', 'error');
    }
    setLoading(false);
  };

  const handleConfirmNewPassword = async password => {
    setLoading(true);
    try {
      await authProvider.resetPassword({
        token: resetToken,
        password,
      });
      notify('Password changed! You can login now', 'success');
      toggleResetPasswordModalOpen();
    } catch (e) {
      notify('Invalid code', 'error');
    }
    setLoading(false);
  };

  const handleSendPasswordResetEmal = async email => {
    setLoading(true);
    try {
      await authProvider.forgotPassword({ email });
      notify(
        'Password reset instructions was sent to your email, check your mailbox',
        'success',
      );
      toggleForgotPasswordModalOpen();
    } catch (e) {
      notify(
        'Error, is this email correct and associated with an account?',
        'error',
      );
    }
    setLoading(false);
  };
  const handleCreateNewTecher = async data => {
    setLoading(true);
    try {
      await authProvider.newTeacher(data);
      notify(
        'Success! Now check your mailbox to verify your account',
        'success',
      );
      toggleSingUpModalOpen();
    } catch (e) {
      notify('Error, could not create a new teacher account with this data');
    }
    setLoading(false);
  };
  const redirIfAuthenticated = async () => {
    try {
      await authProvider.checkAuth();
      redirToHome();
    } catch (e) {}
  };
  const extractParams = () => {
    const search = new URLSearchParams(window.location.search);
    window.history.pushState(
      {},
      null,
      window.location.origin + '/' + window.location.hash,
    );
    return search;
  };

  React.useEffect(() => {
    redirIfAuthenticated();
    const search = extractParams();
    if (search.get('activate')) {
      verifyEmail(search.get('activate'));
    } else if (search.get('resetPassword')) {
      setResetToken(search.get('resetPassword'));
      toggleResetPasswordModalOpen();
    }
  }, []);
  return (
    <ThemeProvider theme={theme}>
      <Paper
        className={styles.container + ' ' + (!loading ? styles.active : '')}
      >
        <Notification />
        <div>
          <div className={styles.fairy}>
            <Fairy noAnimation={!loading} />
          </div>

          <Top className={styles.top} theme={theme} />
          <Bottom className={styles.bottom} theme={theme} />

          <Form
            onSubmit={login}
            validate={validate}
            render={({ handleSubmit }) => (
              <form className={styles.center} onSubmit={handleSubmit}>
                <ToggleDarkModeButton />
                <Typography variant="h4" align="center" gutterBottom>
                  Welcome Back Teacher!
                </Typography>
                <TextField
                  label="Email"
                  name="email"
                  type="email"
                  margin="dense"
                  disabled={loading}
                />
                <TextField
                  label="Password"
                  name="password"
                  type="password"
                  margin="dense"
                  disabled={loading}
                />
                <Box position="relative" width="100%" mx={3}>
                  <Button
                    color="primary"
                    style={{ float: 'right' }}
                    onClick={toggleForgotPasswordModalOpen}
                    size="small"
                  >
                    Forgot password?
                  </Button>
                </Box>
                <Box my={2}>
                  <Button
                    color="primary"
                    variant="contained"
                    disabled={loading}
                    type="submit"
                  >
                    Sign in
                  </Button>
                </Box>
                <Button
                  color="primary"
                  size={'small'}
                  onClick={toggleSingUpModalOpen}
                >
                  New user?
                </Button>
              </form>
            )}
          />
          <UnconfirmedEmailModal
            open={unconfirmedEmailModalOpen}
            onClose={toggleUnconfirmedEmailModalOpen}
            loading={loading}
            onResend={handleResendVerificationEmail}
          />
          <ForgotPasswordModal
            open={forgotPasswordModalOpen}
            onClose={toggleForgotPasswordModalOpen}
            loading={loading}
            onRequestReset={handleSendPasswordResetEmal}
            initialValue={credentials.email}
          />
          <ResetPasswordModal
            open={resetPasswordModalOpen}
            onClose={toggleResetPasswordModalOpen}
            loading={loading}
            onSetPassword={handleConfirmNewPassword}
          />
          <SingUpModal
            open={singUpModalOpen}
            onClose={toggleSingUpModalOpen}
            loading={loading}
            onCreateNewTeacher={handleCreateNewTecher}
          />
        </div>
      </Paper>
    </ThemeProvider>
  );
}
