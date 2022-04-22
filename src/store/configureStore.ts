/**
 * Create the store with dynamic reducers
 */
import { combineReducers } from '@reduxjs/toolkit';
import { InjectedReducersType } from 'utils/types/injector-typings';
import { adminReducer, adminSaga, USER_LOGOUT } from 'react-admin';

import {
  configureStore,
  getDefaultMiddleware,
  StoreEnhancer,
} from '@reduxjs/toolkit';
import { createInjectorsEnhancer } from 'redux-injectors';
import createSagaMiddleware from 'redux-saga';
import { all, fork } from 'redux-saga/effects';
import { routerMiddleware, connectRouter } from 'connected-react-router';
//const history = createHashHistory();

export function configureAppStore({ authProvider, dataProvider, history }) {
  function createReducer(injectedReducers: InjectedReducersType = {}) {
    // Initially we don't have any injectedReducers, so returning identity function to avoid the error

    return combineReducers({
      ...injectedReducers,
      admin: adminReducer,
      router: connectRouter(history),
    });
  }
  const reduxSagaMonitorOptions = {};
  const sagaMiddleware = createSagaMiddleware(reduxSagaMonitorOptions);
  const { run: runSaga } = sagaMiddleware;

  // Create the store with saga middleware
  const middlewares = [sagaMiddleware, routerMiddleware(history)];

  const saga = function* rootSaga() {
    yield all(
      [
        adminSaga(dataProvider, authProvider),
        // add your own sagas here
      ].map(fork),
    );
  };
  const reducer = createReducer();
  const resettableAppReducer = (state, action) =>
    reducer(action.type !== USER_LOGOUT ? state : undefined, action);

  const enhancers = [
    createInjectorsEnhancer({
      createReducer,
      runSaga,
    }),
  ] as StoreEnhancer[];

  const store = configureStore({
    reducer: resettableAppReducer,
    middleware: [
      ...getDefaultMiddleware({ serializableCheck: false }),
      ...middlewares,
    ],
    devTools: process.env.NODE_ENV !== 'production',
    enhancers,
  });
  runSaga(saga);
  return store;
}
//
