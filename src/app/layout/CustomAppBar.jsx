import * as React from 'react';
// import AppBar from '@material-ui/core/AppBar';

import { UserMenu, AppBar } from 'react-admin';

import { useMediaQuery } from '@material-ui/core';
import ToggleDarkModeButton from 'app/components/ToggleDarkModeButton';

const CustomUserMenu = props => {
  // console.log(props);
  // const [mode,setMode] = React.useState('light')
  // const toggleDarkMode = ()=> {setMode(mode==='light'?'dark':'light')}

  const isMobile = useMediaQuery(theme => theme.breakpoints.down('xs'));

  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      {isMobile ? null : <ToggleDarkModeButton color="inherit" />}
      <UserMenu {...props} />
    </div>
  );
};

const CustomAppBar = props => (
  <AppBar {...props} userMenu={<CustomUserMenu />} />
);

export default CustomAppBar;
