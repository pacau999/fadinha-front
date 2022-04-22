import jsonServerProvider from 'ra-data-json-server';
import { fetchUtils } from 'react-admin';

const httpClient = (url, options = {}) => {
  if (!options.headers) {
    options.headers = new Headers({ Accept: 'application/json' });
  }
  // add your own headers here
  options.credentials = 'include';
  return fetchUtils.fetchJson(url, options);
};
const dataProvider = jsonServerProvider(
  process.env.REACT_APP_APIURL,
  httpClient,
);
export default dataProvider;
