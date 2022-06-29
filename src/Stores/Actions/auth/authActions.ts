import axios from 'axios';
import {AuthType, LOGIN_USER} from './authTypes';
import {keysToCamel, keysToSnake, wasFailed} from '~/utils/converter';
import {UserType} from '~/stores/actions/user/userTypes';
import {returnErrors} from '~/stores/actions/error/errorActions';

const initializeAxios = () => {
  // const accessToken = localStorage.getItem('accessToken')
  const headers: any = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  };
  // if (accessToken) {
  //   headers['Authorization'] = `Bearer ${accessToken}`
  // }

  return axios.create({
    baseURL: BASE_URL + '/api/' + version,
    timeout: 60000,
    headers,
    validateStatus: () => true,
  });
};

export const onLoginSuccess =
  (
    result: any,
    token: string,
    onDoneFunc = (isSuccess: boolean, result: any) => {},
  ) =>
  (dispatch: any) => {
    // res?.data?.results?.object
    try {
      const auth: AuthType = keysToCamel({
        id: result?.id,
        accessToken: token,
      });
      dispatch({
        type: LOGIN_USER,
        payload: auth,
      });
    } catch (error: any) {
      console.log('errorAuthActions', error);
      onDoneFunc(false, error?.response?.message);
    }
  };

export const loginWithKakaoTalk =
  (
    body: any,
    onDoneFunc: (isSuccess: boolean, result: any) => void = () => {},
  ) =>
  async (dispatch: any) => {
    try {
      const res = await axios.post(
        'http://61.100.16.155:8080/api/every/oauth/get-kakao-token/',
        body,
      );
      if (res?.data?.code === 200) {
        const token = res?.data?.results?.token;
        dispatch(onLoginSuccess(res?.data?.results?.object, token, onDoneFunc));
      } else {
        console.log('res' + res.data.message);
        onDoneFunc(false, res?.data?.message);
      }
    } catch (error: any) {
      returnErrors(
        error?.response?.data,
        error?.response?.status,
        wasFailed(LOGIN_USER),
      );
      onDoneFunc(false, error.response?.message);
    }
  };
