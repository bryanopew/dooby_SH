import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  check: false,
};

const checkBoxSlice = createSlice({
  name: 'checkBox',
  initialState,
  reducers: {
    checkAll: (state, action) => {
      state.check = action.payload;
    },
  },
});

export default checkBoxSlice;
export const {checkAll} = checkBoxSlice.actions;
