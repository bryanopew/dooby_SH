import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  cartsArray: [],
};

const addDietSlice = createSlice({
  name: 'addDiet',
  initialState,
  reducers: {
    addCart: (state, action) => {
      state.cartsArray = [...state.cartsArray, action.payload];
    },
    removeCart: (state, action) => {
      console.log(action.payload);
    },
    selectCart: (state, action) => {
      //add 된 제품들을 하나의 배열로 생성
      //각 선택된 식단에 해당하는 데이터 불러오기
      //cart[0], cart[1], cart[2],...
    },
  },
});

export default addDietSlice;
export const {addCart, removeCart} = addDietSlice.actions;
