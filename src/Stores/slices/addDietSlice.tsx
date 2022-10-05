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
    //현재 선택된 cart를 가져와서 그 cart에만 제품 추가해주면됨
    //1번 cart인지 , 2번cart인지 어떻게 알지
    //id를 주면 모든게 해결
    //cartsArray에 있는 item의 index가 state.selected가 가리키는 index와 같다면
    //해당 cartsArray에 있는  index 아이템을 state.selected로 변환하면 됨
    addToCartsArray: (state, action) => {
      let i: number;

      const answer = state.cartsArray.filter(
        item => item === state.cartsArray[action.payload - 1],
      );
      const index = state.cartsArray.indexOf(answer[0]);
      // console.log('answer:', answer[0]);
      // console.log('state.cartsArray', state.cartsArray);
      console.log('index:', index);
      // console.log('selecteditem:', state.selected);
      // if (index === -1) {
      //   state.cartsArray[state.cartsArray.length - 1] = state.selected;
      // } else {
      //   state.cartsArray[index] = state.selected;
      // }
      if (index >= 0) {
        state.cartsArray[index] = state.selected;
      }
    },

    removeCart: (state, action) => {
      console.log(action.payload);
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
