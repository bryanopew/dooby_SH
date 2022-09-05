import React, {Component, useEffect, useState} from 'react';
import {createSlice} from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useSelector, useDispatch} from 'react-redux';

type InitialState = {
  basketCalorie: number;
  basketCarb: number;
  basketProtein: number;
  basketFat: number;
};

let initialState: InitialState = {
  basketCalorie: 0,
  basketCarb: 0,
  basketProtein: 0,
  basketFat: 0,
};

const calorieBarSlice = createSlice({
  name: 'calorieBar',
  initialState,
  reducers: {
    addNutrient: (state, action) => {
      state.basketCalorie = action.payload[0];
      state.basketCarb = action.payload[1];
      state.basketProtein = action.payload[2];
      state.basketFat = action.payload[3];
    },
  },
});

export default calorieBarSlice;
export const {addNutrient} = calorieBarSlice.actions;
