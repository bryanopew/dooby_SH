import {createSlice} from '@reduxjs/toolkit';

type InitialState = {
  cart: [];
  total: number;
};

//장바구니 제품
const initialState: InitialState = {
  cart: [],
  total: 0,
};
//add 했을때 home 컴포넌트꺼 가져다 쓰고
//remove했을때  delete하는 함수 넣고
const basketSlice = createSlice({
  name: 'basketProduct',
  initialState,
  reducers: {
    add: (state, action) => {
      state.cart = state.cart.concat(action.payload);
    },
    remove: (state, action) => {
      state.cart = state.cart.filter(
        el => el.productNm !== action.payload[0].productNm,
      );
    },
    removeAll: (state, action) => {
      state.cart = [];
    },
    addCart: (state, action) => {
      //addDiet버튼 눌렀을때 이벤트 발생
      //cart값을 가져와 cartArray를 만들고 새로운 배열 생성
      //reducer의 add버튼을 눌렀을때 새로운 배열에 추가하게 로직 구성
      //
    },
    selectCart: (state, action) => {
      //add 된 제품들을 하나의 배열로 생성
      //각 선택된 식단에 해당하는 데이터 불러오기
      //cart[0], cart[1], cart[2],...
    },
    increment: (state, action) => {
      // function ok(e) {
      //   if (e.productNm === action.payload.productNm) {
      //     return true;
      //   }
      // }
      // const plus = state.cart.find(ok);
      // console.log(plus);
      const plus = state.cart.find(item => {
        if (item.productNm === action.payload.productNm) {
          return true;
        }
      });
      if (plus) {
        plus.quantity += 1;
      }
    },

    decrement: (state, action) => {
      const minus = state.cart.find(item => {
        if (item.productNm === action.payload.productNm) {
          return true;
        }
      });
      if (minus) {
        minus.quantity -= 1;
      }
    },
  },
});

export default basketSlice;
export const {add, remove, increment, decrement, selectCart, removeAll} =
  basketSlice.actions;
