import {combineReducers} from 'redux';
import basicInfoReducer from './basicInfoReducer';
import {persistReducer} from 'redux-persist';
import FilesystemStorage from 'redux-persist-filesystem-storage';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Dimensions, Platform} from 'react-native';
import authReducer from './authReducer';

export const IS_ANDROID = Platform.OS === 'android';

const rootReducer = combineReducers({
  authReducer: persistReducer(
    {
      key: 'authReducer',
      storage: IS_ANDROID ? FilesystemStorage : AsyncStorage,
    },
    authReducer,
  ),
});

export default rootReducer;
