import Config from 'react-native-config';

export const basicAuthConfig: any = {
  auth: {
    username: process.env.OAUTH_CLIENT_KEY,
    password: process.env.OAUTH_CLIENT_SECRET,
  },
};

export const accessTokenConfig = getState => {
  const accessToken = getState().authReducer.data.accessToken;
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  if (accessToken) {
    config.headers['Authorization'] = `Bearer ${accessToken}`;
  }
  return config;
};

export const refreshTokenConfig = getState => {
  const refreshToken = getState().authReducer.data.refreshToken;
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  if (refreshToken) {
    config.headers['Authorization'] = `Bearer ${refreshToken}`;
  }
  return config;
};
