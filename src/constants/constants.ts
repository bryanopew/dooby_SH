import {Dimensions, Platform} from 'react-native';
// import deviceInfoModule from 'react-native-device-info';
import {PERMISSIONS} from 'react-native-permissions';
import Config from 'react-native-config';

export const DEBUG = __DEV__ ? true : false;

export const BASE_URL = 'http://61.100.16.155:8080';
export const KAKAO_TOKEN_CONTROLLER =
  'http://61.100.16.155:8080/api/every/token/get-token'; //토큰 조회
export const GET_AUTH = 'http://61.100.16.155:8080/api/member/auth/get-auth'; //인증 여부 조회
export const RE_ISSUE_TOKEN =
  'http://61.100.16.155:8080/api/member/auth/re-issue-token';
export const CREATE_BASE_LINE =
  'http://61.100.16.155:8080/api/member/baseline/create-base-line';
export const DIET_PURPOSE_CD = {
  1: 'SP002001',
  2: 'SP002002',
  3: 'SP002003',
  4: 'SP002004',
  5: 'SP002005',
};

export const {width, height} = Dimensions.get('screen');
export const WIDTH = Math.min(width, height);
export const HEIGHT = Math.max(width, height);

export const IS_ANDROID = Platform.OS === 'android';
export const IS_IOS = Platform.OS === 'ios';
// export const IS_TABLET = deviceInfoModule.isTablet();

export const baseWidth = 375;
export const baseHeight = 812;
export const WIDTH_SCALE = WIDTH / baseWidth;
export const HEIGHT_SCALE = HEIGHT / baseHeight;

export const headerHeight = WIDTH_SCALE * 60;
export const heightBottomBar = WIDTH_SCALE * 69;
export const textInputHeight = WIDTH_SCALE * 54;
export const heightButton = WIDTH_SCALE * 48;
export const REST_THRESHOLD_TIME = 5;
export const REST_THRESHOLD_DISTANCE = 100;
export const MAX_WIDTH = 400;
