import { defaultTheme } from 'react-admin';
import merge from 'lodash/merge';
import { createTheme, responsiveFontSizes } from '@material-ui/core/styles';
import create from 'zustand';
import { persist } from 'zustand/middleware';

const dark = createTheme({
  palette: {
    secondary: {
      main: '#3f5016',
    },
    primary: {
      main: '#e0a35f',
    },
    type: 'dark',
  },
});
const light = createTheme({
  palette: {
    secondary: {
      main: '#59721f',
    },
    primary: {
      main: '#c75300',
    },
  },
});
const useThemeStore = create(
  persist(
    (set, get) => ({
      mode: 'dark',
      isSystemDefault: true,
      toggle: (followSystemDefault = false) =>
        set({
          mode: get().mode === 'light' ? 'dark' : 'light',
          theme: get().mode === 'light' ? dark : light,
          isSystemDefault:
            typeof followSystemDefault === 'boolean' &&
            followSystemDefault === true
              ? true
              : false,
        }),
    }),
    { name: 'theme-storage' },
  ),
);
export { dark, light };
export default useThemeStore;
const bkp = {
  palette: {
    primary: {
      light: '#88a14c',
      main: '#59721f',
      dark: '#2d4600',
      contrastText: '#fff',
    },
    secondary: {
      light: '#ffd28d',
      main: '#dda15e',
      dark: '#a87232',
      contrastText: '#000',
    },
    type: 'dark',
  },
};
