import useThemeStore from 'styles/theme';
import { IconButton } from '@material-ui/core';
import Brightness4Icon from '@material-ui/icons/Brightness4';
import Brightness7Icon from '@material-ui/icons/Brightness7';
// import NightsStayIcon from '@material-ui/icons/NightsStay';
const ToggleDarkModeButton = props => {
  const toggleDarkMode = useThemeStore(store => store.toggle);
  const mode = useThemeStore(store => store.mode);
  return (
    <IconButton onClick={toggleDarkMode} {...props}>
      {mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
    </IconButton>
  );
};
export default ToggleDarkModeButton;
