import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  cartsArray: [],
  selected: [],
};

const addDietSlice = createSlice({
  name: 'addDiet',
  initialState,
  reducers: {
    addCart: (state, action) => {
      state.cartsArray = [...state.cartsArray, action.payload];
      console.log('addCart:', action.payload);
    },
    selectAddProduct: (state, action) => {
      state.selected = [...state.selected, action.payload];
    },
    removeCart: (state, action) => {
      console.log(action.payload);
    },
    selectCart: (state, action) => {
      if (action.payload > state.cartsArray.length) {
        state.selected = [];
      } else {
        state.selected = state.cartsArray[action.payload - 1];
      }
      console.log('cart page:', action.payload);
    },
  },
});

export default addDietSlice;
export const {addCart, removeCart, selectCart, selectAddProduct} =
  addDietSlice.actions;
