export const LOGIN_USER = 'LOGIN_USER';
export const REGISTER_USER = 'REGISTER_USER';

export type AuthType = {
  id: string;
  accessToken: string;
  refreshToken: string;
};

export interface LoginUser {
  type: typeof LOGIN_USER;
  payload: AuthType;
}

export interface RegisterUser {
  type: typeof REGISTER_USER;
  payload: AuthType;
}

export type AuthDispatchTypes = LoginUser | RegisterUser;

