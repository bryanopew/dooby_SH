import {createSlice} from '@reduxjs/toolkit';

type InitialState = {
  value: [];
};

//장바구니 제품
const initialState: InitialState = {
  value: [],
};

//add 했을때 home 컴포넌트꺼 가져다 쓰고
//remove했을때  delete하는 함수 넣고
const basketSlice = createSlice({
  name: 'basketProduct',
  initialState,
  reducers: {
    add: (state, action) => {
      state.value = state.value.concat(action.payload);
    },
    remove: (state, action) => {
      state.value = state.value.filter(
        el => el.productNm !== action.payload[0].productNm,
      );
    },
  },
});

export default basketSlice;
export const {add, remove} = basketSlice.actions;
