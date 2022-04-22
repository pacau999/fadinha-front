/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import * as React from 'react';
// import { GlobalStyle } from 'styles/global-styles';
// import { LoginPage } from './pages/LoginPage/Loadable';
// import { NotFoundPage } from './components/NotFoundPage/Loadable';
// import { useTranslation } from 'react-i18next';
import { Admin, Login, Resource } from 'react-admin';
import { createHashHistory } from 'history';
//import { HelmetProvider } from 'react-helmet-async';
import { Provider } from 'react-redux';
import { configureAppStore } from 'store/configureStore';
import {
  StudentCreate,
  StudentEdit,
  StudentList,
  StudentShow,
} from './students';
//import { BrowserRouter } from 'react-router-dom';
import GroupIcon from '@material-ui/icons/Group';
import SchoolIcon from '@material-ui/icons/School';
import ClassIcon from '@material-ui/icons/Class';
import {
  EnrollmentCreate,
  EnrollmentEdit,
  EnrollmentList,
  EnrollmentShow,
} from './enrollments';
import {
  TutoringTypeCreate,
  TutoringTypeEdit,
  TutoringTypeList,
  TutoringTypeShow,
} from './tutoringTypes';
import CustomLayout from './layout/CustomLayout';
import Dashboard from './Dashboard';
import { LoginPage } from './pages/LoginPage';
import dataProvider from './dataProvider';
import authProvider from './authProvider';
const history = createHashHistory();

function App() {
  // console.log('render');
  return (
    <Provider
      store={configureAppStore({
        authProvider,
        dataProvider,
        history,
      })}
    >
      <Admin
        dataProvider={dataProvider}
        authProvider={authProvider}
        history={history}
        title="Fadinha Teacher"
        layout={CustomLayout}
        dashboard={Dashboard}
        loginPage={LoginPage}
      >
        <Resource
          name="students"
          list={StudentList}
          show={StudentShow}
          edit={StudentEdit}
          create={StudentCreate}
          icon={GroupIcon}
        />
        <Resource
          name="enrollments"
          list={EnrollmentList}
          icon={SchoolIcon}
          edit={EnrollmentEdit}
          create={EnrollmentCreate}
          show={EnrollmentShow}
        />
        <Resource
          name="tutoringTypes"
          options={{ label: 'Tutoring Types' }}
          list={TutoringTypeList}
          edit={TutoringTypeEdit}
          create={TutoringTypeCreate}
          show={TutoringTypeShow}
          icon={ClassIcon}
        />
      </Admin>
    </Provider>
  );
}
export default App;
