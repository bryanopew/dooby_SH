import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  carts: [],
};

const addDietSlice = createSlice({
  name: 'addDiet',
  initialState,
  reducers: {
    addDiet: (state, action) => {
      console.log(action.payload);
    },
    removeDiet: (state, action) => {
      console.log(action.payload);
    },
  },
});

export default addDietSlice;
export const {addDiet, removeDiet} = addDietSlice.actions;
