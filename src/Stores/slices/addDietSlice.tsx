import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  cartsArray: [],
  selected: [
    {
      basketCalorie: [],
      basketCarb: [],
      basketProtein: [],
      basketFat: [],
    },
  ],
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
      state.selected = state.cartsArray[action.payload - 1];
      console.log('un', action.payload);
    },
  },
});

export default addDietSlice;
export const {addCart, removeCart, selectCart} = addDietSlice.actions;
