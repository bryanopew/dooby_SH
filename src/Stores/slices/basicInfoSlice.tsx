import {createSlice, PayloadAction} from '@reduxjs/toolkit';

const initialState = {
  companyCd: '',
  userId: '',
  gender: '',
  age: '',
  height: '',
  weight: '',
  dietPurposeCd: '',
  weightPurposeCd: '',
  aerobicTimeCd: '',
  calorie: '',
  carb: '',
  protein: '',
  fat: '',
};

export const basicInfoInputSlice = createSlice({
  name: 'basicInfoInput',
  initialState,
  reducers: {
    setBasicInfoInput(state, action) {
      state.companyCd = action.payload;
    },
  },
});

export const {setBasicInfoInput} = basicInfoInputSlice.actions;

export default basicInfoInputSlice;
