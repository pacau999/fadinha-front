import { FunctionField, Labeled } from 'react-admin';
import { Link } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import WhatsAppIcon from '@material-ui/icons/WhatsApp';
import { formatPhone } from 'utils/format';

const useStyles = makeStyles({
  icon: {
    width: '0.75em',
    height: '0.75em',
    paddingLeft: 3,
  },
});
const WhatsAppField = props => {
  const { source, ...rest } = props;
  const classes = useStyles();
  return (
    <Labeled label="Whatsapp">
      <FunctionField
        render={record =>
          record[source] && (
            <Link href={`https://wa.me/55${record[source]}`} target="_blank">
              {formatPhone(record[source])}
              <WhatsAppIcon className={classes.icon} />
            </Link>
          )
        }
        {...rest}
      />
    </Labeled>
  );
};
export default WhatsAppField;
