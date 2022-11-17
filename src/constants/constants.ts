import {Dimensions, Platform} from 'react-native';
// import deviceInfoModule from 'react-native-device-info';
import {PERMISSIONS} from 'react-native-permissions';
import Config from 'react-native-config';

export const DEBUG = __DEV__ ? true : false;

export const BASE_URL = `http://13.125.244.117:8080`;
export const KAKAO_TOKEN_CONTROLLER =
  `${BASE_URL}/api/every/token/get-token`; //토큰 조회
export const GET_AUTH = `${BASE_URL}/api/member/auth/get-auth`; //인증 여부 조회
export const RE_ISSUE_TOKEN =
  `${BASE_URL}/api/member/auth/re-issue-token`;
export const GET_USER = `${BASE_URL}/api/member/user/get-user`; //사용자 정보 조회
export const CREATE_BASE_LINE = //기본 정보 생성
  `${BASE_URL}/api/member/baseline/create-base-line`;
export const GET_BASE_LINE = //기본 정보 조회
  `${BASE_URL}/api/member/baseline/get-base-line`;
export const CREATE_DIET = //식단정보생성
  `${BASE_URL}/api/member/diet/create-diet`;
export const LIST_DIET = `${BASE_URL}/api/member/diet/list-diet`; //식단 정보 목록 조회
export const PRODUCT_LIST =
  'http://13.125.244.117:8080/api/member/product/list-product';
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

export const colors = {
  white: '#FFFFFF',
  inActivated: '#E5E5E5',
  black: '#000000',
  backgroundLight: '#F8F8F8',
  main: '#590DE1',
  blue: '#3D9AFF',
  green: '#00E297',
  orange: '#FFBD60',
  textMain: '#444444',
  textSub: '#8f8f8f',
  warning: '#FF6060',
  highlight: '#F9F6FF',
  line: '#F0F0F0',
  modalBg: '#000000A6',
  kakaoColor: '#ffe812',
};
