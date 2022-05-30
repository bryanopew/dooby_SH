import axios from 'axios';

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