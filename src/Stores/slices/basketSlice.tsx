import {createSlice} from '@reduxjs/toolkit';
import {useSelector, useDispatch} from 'react-redux';

type InitialState = {
  cart: [];
  total: number;
  currentCartPage: [];
  cartsArray: number;
};

//장바구니 제품
const initialState: InitialState = {
  cart: [],
  total: 0,
  currentCartPage: [],
  cartsArray: 1,
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

    //cartsArray안에서 이동이 있을경우 해당 cart를 찾아서 productNm가 맞는애 조절할수있게
    remove: (state, action) => {
      state.cart = state.cart.filter(
        el => el.productNm !== action.payload[0].productNm,
      );
      console.log('basketremove/action', action.payload);
    },
    removeAll: (state, action) => {
      state.cart = [];
    },
    checkCurrentPage: (state, action) => {},
    //! cartsArray안에서 이동이 있을경우 해당 cart를 찾아서 productNm가 맞는애 조절할수있게
    //cartpage값을 가져오는 방법
    increment: (state, action) => {
      const index = state.currentCartPage;
      const cartsArray = state.currentCartPage;
      console.log('cartsArray:', cartsArray);

      console.log('index:', index);

      const plus = cartsArray.find(item => {
        if (item.productNm === action.payload.productNm) {
          return true;
        }
      });
      console.log('plus:', plus);
      if (plus) {
        plus.quantity += 1;
      }
      console.log('action.payload:', action.payload);
    },
    //   if (index === -1) {
    //     const plus = state.cart.find(item => {
    //       if (item.productNm === action.payload.productNm) {
    //         return true;
    //       }
    //     });
    //     if (plus) {
    //       plus.quantity += 1;
    //     }
    //     console.log('increment:', action.payload);
    //   } else if (index >= 0) {
    //     const plus = state.cart.find(item => {
    //       if (item.productNm === action.payload.productNm) {
    //         return true;
    //       }
    //     });
    //     if (plus) {
    //       plus.quantity += 1;
    //     }
    //     console.log('increment:', action.payload);

    //   }
    // },

    // 원래 추가 로직
    // const plus = state.cart.find(item => {
    //   if (item.productNm === action.payload.productNm) {
    //     return true;
    //   }
    // });
    // if (plus) {
    //   plus.quantity += 1;
    // }
    // console.log('payload:', action.payload);

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
export const {add, remove, increment, decrement, checkCurrentPage, removeAll} =
  basketSlice.actions;
