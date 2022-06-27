import axios from 'axios';
import {AuthType, LOGIN_USER} from './authTypes';
import {keysToCamel, keysToSnake, wasFailed} from '~/utils/converter';
import {UserType} from '~/stores/actions/user/userTypes';
import {returnErrors} from '~/stores/actions/error/errorActions';

const STATUS_ENUM = {
  SUCCESS: 1,
  FAILED: 0,
  LOADING: -1,
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
      const user: UserType = keysToCamel(result);
      dispatch({
        type: LOGIN_USER,
        payload: auth,
      });
    } catch (error: any) {
      console.log('error', error);
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
      const res = await axios.post('auth/login_with_kakaotalk', body);
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
