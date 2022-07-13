import basicInfoInputReducer from '~/stores/reducers/basicInfoReducer';
import {combineReducers, configureStore} from '@reduxjs/toolkit';
import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';

const rootReducer = combineReducers({
  // basicInfo: basicInfoSlice.reducer
});

const store = configureStore({
  reducer: {basicInfoInputReducer},
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

// useAppSelector와 useAppDispatch는 기존의 useSelector와 useDispatch hooks를 추상화한 것 입니다.
//이와 같이 사용하면 각각의 컴포넌트에서 useSelector나 useDispatch를 매번 설정하지 않고 애플리케이션 전역에서 사용이 가능합니다.

export default store;
