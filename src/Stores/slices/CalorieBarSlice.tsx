import React, {Component, useEffect, useState} from 'react';
import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useSelector, useDispatch} from 'react-redux';

type InitialState = {
  basketCalorie: [];
  basketCarb: number;
  basketProtein: number;
  basketFat: number;
};

let initialState: InitialState = {
  basketCalorie: [],
  basketCarb: 0,
  basketProtein: 0,
  basketFat: 0,
};

// 아이템 배열 초기화 로직
// state.basketCalorie = state.basketCalorie.filter(
//   el => el.productNm !== action.payload[0].productNm,
// );

export const loadResult = createAsyncThunk('load/Result', async () => {});

const calorieBarSlice = createSlice({
  name: 'calorieBar',
  initialState,
  reducers: {
    addNutrient: (state, action) => {
      state.basketCalorie = state.basketCalorie.concat(action.payload);
      // state.basketCarb = action.payload[1];
      // state.basketProtein = action.payload[2];
      // state.basketFat = action.payload[3];
    },
    removeNutrient: (state, action) => {
      state.basketCalorie = state.basketCalorie.concat(-action.payload);
    },
  },
  extraReducers: {},
});

// state.basketCalorie = action.payload[0];
//       state.basketCarb = action.payload[1];
//       state.basketProtein = action.payload[2];
//       state.basketFat = action.payload[3];

// state = {
//   ...state,
//   basketCalorie: action.payload[0],
//   basketCarb: action.payload[1],
//   basketProtein: action.payload[2],
//   basketFat: action.payload[3],
// };
export default calorieBarSlice;
export const {addNutrient, removeNutrient} = calorieBarSlice.actions;
