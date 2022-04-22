import { Box, Chip } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { capitalizeFirstLetter } from 'utils/format';

const useStyles = ({ justify, wrap, spacing }) =>
  makeStyles(theme => ({
    chipContainer: {
      display: 'flex',
      justifyContent: justify,
      flexWrap: wrap,
      '& > *': {
        margin: theme.spacing(spacing),
      },
    },
  }))();

const ChipTabs = ({
  activeTabKey,
  tabs,
  setActiveTab,
  justify = 'center',
  wrap = 'wrap',
  spacing = 0.15,
}) => {
  const classes = useStyles({ justify, wrap, spacing });
  return (
    <Box className={classes.chipContainer} px={2} pt={2}>
      {tabs.map(({ key, label, empity, icon }) => {
        const handleTabClick = () => {
          setActiveTab(key);
        };
        return (
          <Chip
            variant={key === activeTabKey ? 'default' : 'outlined'}
            color={!empity > 0 ? 'primary' : 'default'}
            label={label ? label : capitalizeFirstLetter(key)}
            clickable
            key={key}
            onClick={handleTabClick}
            icon={icon ? icon : null}
          />
        );
      })}
    </Box>
  );
};

export default ChipTabs;
