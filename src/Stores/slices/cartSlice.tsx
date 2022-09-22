import {createSlice} from '@reduxjs/toolkit';

type InitialState = {
  id: number;
  value: number;
  cart: [];
  total: number;
};

const initialState: InitialState = {
  id: 1,
  value: 1,
  cart: [],
  total: 0,
};
const cartSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    up: (state, action) => {
      state.value = state.value + action.payload;
    },
    down: (state, action) => {
      state.value = state.value - action.payload;
    },
    init: (state, action) => {
      state.value = 1;
    },
  },
});

export default cartSlice;
export const {up, down, init} = cartSlice.actions;
