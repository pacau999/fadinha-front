import { Typography, Box } from '@material-ui/core';
import { sanitizeFieldRestProps } from 'react-admin';
const LabeledText = ({ text, label, ...props }) => (
  <Box
    display="flex"
    flexWrap="wrap"
    alignItems="baseline"
    height="min-content"
    width="min-content"
    {...props}
  >
    <Typography
      noWrap
      style={{ lineHeight: '1rem' }}
      variant="caption"
      color="textSecondary"
    >
      <small>{label}</small>
    </Typography>

    <Typography style={{ lineHeight: '1rem' }} variant="h6" color="primary">
      {text}
    </Typography>
  </Box>
);
export default LabeledText;
