import basicInfoInputReducer from '~/stores/reducers/basicInfoReducer';
import {combineReducers, configureStore} from '@reduxjs/toolkit';
import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';
import rootReducer from '~/stores/reducers/rootReducer';

import cartSlice from './slices/cartSlice';
import calorieBarSlice from './slices/calorieBarSlice';
import basketProductSlice from './slices/basketSlice';
import addDietSlice from './slices/addDietSlice';
import checkBoxSlice from './slices/checkBoxSlice';
import filterSlice from './slices/filterSlice';

const store = configureStore({
  reducer: {
    counter: cartSlice.reducer,
    calorieBar: calorieBarSlice.reducer,
    basketProduct: basketProductSlice.reducer,
    addDiet: addDietSlice.reducer,
    checkBox: checkBoxSlice.reducer,
    filter: filterSlice.reducer,
  },
});

// export type RootState = ReturnType<typeof store.getState>;
// export type AppDispatch = typeof store.dispatch;
// export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

// useAppSelector와 useAppDispatch는 기존의 useSelector와 useDispatch hooks를 추상화한 것 입니다.
//이와 같이 사용하면 각각의 컴포넌트에서 useSelector나 useDispatch를 매번 설정하지 않고 애플리케이션 전역에서 사용이 가능합니다.

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
