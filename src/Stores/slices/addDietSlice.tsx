import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  cartsArray: [],
  selected: [],
  selectedCartPage: 1,
  pick: [],
};

const addDietSlice = createSlice({
  name: 'addDiet',
  initialState,
  reducers: {
    addCart: (state, action) => {
      state.cartsArray = [...state.cartsArray, action.payload];
    },
    selectAddProduct: (state, action) => {
      state.selected = [...state.selected, action.payload];
    },
    selectRemoveProduct: (state, action) => {
      state.selected = state.selected.filter(
        el => el.productNm !== action.payload,
      );
      state.cartsArray[state.selectedCartPage - 1] = state.selected;
    },
    addToCartsArray: (state, action) => {
      const answer = state.cartsArray.filter(
        item => item === state.cartsArray[action.payload - 1],
      );
      const index = state.cartsArray.indexOf(answer[0]);
      // console.log('answer:', answer[0]);
      // console.log('state.cartsArray', state.cartsArray);
      console.log('index:', index);

      if (index >= 0) {
        state.cartsArray[index] = state.selected;
      }
    },
    removeCart: (state, action) => {
      state.selected = state.selected.filter(
        el => el.prodcutNm !== action.payload[0].productNm,
      );
      console.log('remove/selected:', state.selected);
      console.log('remove/action', action.payload[0].productNm);
    },
    selectCart: (state, action) => {
      if (action.payload > state.cartsArray.length) {
        state.selected = [];
        state.selectedCartPage = action.payload;
      } else {
        state.selected = state.cartsArray[action.payload - 1];
        state.selectedCartPage = action.payload;
      }
    },
    increment: (state, action) => {
      const plus = state.selected.find(item => {
        if (item.productNm === action.payload.productNm) {
          return true;
        }
      });

      if (plus) {
        plus.quantity += 1;
      }
      state.cartsArray[state.selectedCartPage - 1] = state.selected;
    },
    decrement: (state, action) => {
      const minus = state.selected.find(item => {
        if (item.productNm === action.payload.productNm) {
          return true;
        }
      });
      if (minus) {
        minus.quantity -= 1;
      }
      state.cartsArray[state.selectedCartPage - 1] = state.selected;
    },
  },
});

export default addDietSlice;
export const {
  addCart,
  removeCart,
  selectCart,
  selectAddProduct,
  addToCartsArray,
  selectRemoveProduct,
  increment,
  decrement,
} = addDietSlice.actions;
