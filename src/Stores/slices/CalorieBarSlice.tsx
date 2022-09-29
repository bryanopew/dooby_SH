import React, {Component, useEffect, useState} from 'react';
import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useSelector, useDispatch} from 'react-redux';

type InitialState = {
  basketCalorie: [];
  basketCarb: [];
  basketProtein: [];
  basketFat: [];
};

let initialState: InitialState = {
  basketCalorie: [],
  basketCarb: [],
  basketProtein: [],
  basketFat: [],
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
      state.basketCalorie = state.basketCalorie.concat(action.payload[0]);
      state.basketCarb = state.basketCarb.concat(action.payload[1]);
      state.basketProtein = state.basketProtein.concat(action.payload[2]);
      state.basketFat = state.basketFat.concat(action.payload[3]);
    },
    addCarb: (state, action) => {},
    removeNutrient: (state, action) => {
      state.basketCalorie = state.basketCalorie.concat(-action.payload[0]);
      state.basketCarb = state.basketCarb.concat(-action.payload[1]);
      state.basketProtein = state.basketProtein.concat(-action.payload[2]);
      state.basketFat = state.basketFat.concat(-action.payload[3]);
    },
    newDietNutrient: (state, action) => {},
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
export const {addNutrient, addCarb, removeNutrient} = calorieBarSlice.actions;
