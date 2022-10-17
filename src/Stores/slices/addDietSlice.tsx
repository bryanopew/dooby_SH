import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  cartsArray: [],
  selected: [],
  selectedCartPage: 1,
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
    // [[a], [b,c], [d,e,f]]
    // 현재 index로 몇번째인지 앎
    // 그러면 그 배열안에있는 제품에서 내가 removeCart한 아이템의 productNm을
    // 찾아서 filter해서 새로운 배열로 나타내주면 됨
    // state.cartsArray[index] = state.cartsArray[index].filter(
    // el => el.productNm ! == action.payload[0].productNm)
    removeCart: (state, action) => {
      // const answer = state.cartsArray.filter(
      //   item => item === state.cartsArray[action.payload - 1],
      // );
      // const index = state.cartsArray.indexOf(answer[0]);
      // if (index >= 0) {
      //   state.cartsArray = state.cartsArray.filter(
      //     el => el.productNm !== state.cartsArray[index].productNm,
      //   );
      // }
      // console.log('state.cartsArray:', state.cartsArray);
      // console.log('removed/index:', index);
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
  },
});

export default addDietSlice;
export const {
  addCart,
  removeCart,
  selectCart,
  selectAddProduct,
  addToCartsArray,
} = addDietSlice.actions;
