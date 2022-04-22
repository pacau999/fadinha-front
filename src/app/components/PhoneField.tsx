import { FunctionField, Labeled } from 'react-admin';
import { formatPhone } from 'utils/format';
import * as React from 'react';
import { Link } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import PhoneIcon from '@material-ui/icons/Phone';
const useStyles = makeStyles({
  icon: {
    width: '.75em',
    height: '.75em',
    paddingLeft: 3,
  },
});
const PhoneField = props => {
  const { source, label, ...rest } = props;
  const classes = useStyles();
  return (
    <Labeled label={label}>
      <FunctionField
        render={record =>
          record[source] && (
            <Link href={`tel:${record[source]}`} target="_blank">
              {formatPhone(record[source])}
              <PhoneIcon className={classes.icon} />
            </Link>
          )
        }
        {...rest}
      />
    </Labeled>
  );
};
export default PhoneField;
