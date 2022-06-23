import { keysToCamel } from '~/utils/converter';
import { CLEAR_ERRORS, GET_ERRORS } from './errorTypes';

export const returnErrors = (
  errors: any,
  status: number,
  id: any = null,
  action = (params?: any) => {},
  params?: any
) => async (dispatch:any) => {
  try {
    dispatch({
      type: GET_ERRORS,
      payload: { errors: keysToCamel(errors), status, id },
    });

    if (errors?.type === 'auth_exception_token_expired') {
      // dispatch(refreshToken(action, params));
    }
  } catch (error) {
    console.log(error);
  }
};

export const clearErrors = () => async (dispatch: any) => {
  try {
    dispatch({
      type: CLEAR_ERRORS,
    });
  } catch (error) {
    console.log(error);
  }
};
