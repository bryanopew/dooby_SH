import {createSlice} from '@reduxjs/toolkit';

type InitialState = {
  cal: number;
  carbon: number;
  protein: number;
  fat: number;
};

//유저의 입력값을 넣어야함
const initialState: InitialState = {
  cal: 0,
  carbon: 0,
  protein: 0,
  fat: 0,
};

const calorieBarSlice = createSlice({
  name: 'calorieBar',
  initialState,
  reducers: {
    log: (state, action) => {
      state.cal = state.cal + action.payload;
    },
  },
});

export default calorieBarSlice;
