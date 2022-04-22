import * as React from 'react';
import { Layout } from 'react-admin';
import useThemeStore, { dark, light } from 'styles/theme';
import CustomAppBar from './CustomAppBar';
import { useMediaQuery } from '@material-ui/core';
import CustomMenu from './CustomMenu';

const CustomLayout = props => {
  const mode = useThemeStore(store => store.mode);
  const theme = mode === 'light' ? light : dark;
  const isSystemDefault = useThemeStore(store => store.isSystemDefault);
  const toggleThemeMode = useThemeStore(store => store.toggle);
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  React.useEffect(() => {
    if (
      isSystemDefault &&
      ((prefersDarkMode && mode === 'light') ||
        (!prefersDarkMode && mode === 'dark'))
    ) {
      toggleThemeMode(true);
    }
  }, [prefersDarkMode]);
  return (
    <Layout {...props} appBar={CustomAppBar} theme={theme} menu={CustomMenu} />
  );
};

export default CustomLayout;
