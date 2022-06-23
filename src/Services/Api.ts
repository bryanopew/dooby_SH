import axios from 'axios';
import Config from 'react-native-config';


export const BASE_URL = Config.API_URL;

const version = 'v1';
const initializeAxios = () => {
  // const accessToken = localStorage.getItem('accessToken')
  const headers: any = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  };
  return axios.create({
    baseURL: BASE_URL + '/api/' + version,
    timeout: 60000,
    headers,
    validateStatus: () => true,
  });
};
let API = initializeAxios();

API.interceptors.response.use((response) => {
    if (response?.request?.responseURL) {
      console.log(
        'URL ->',
        '\u001b[34m' +
          decodeURI(response?.request?.responseURL.replace(BASE_URL, '')),
      );
    }
    return response;
  });
  export default API;