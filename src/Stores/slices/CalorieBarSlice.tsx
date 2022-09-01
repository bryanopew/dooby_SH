import React, {Component, useEffect, useState} from 'react';
import {createSlice} from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';

type InitialState = {
  meal: number;
  cal: number;
  carbon: number;
  protein: number;
  fat: number;
};

let initialState: InitialState = {
  meal: 0,
  cal: 0,
  carbon: 0,
  protein: 0,
  fat: 0,
};

const getAutoDoData = async () => {
  try {
    let result = AsyncStorage.getItem('AUTODO_RESULT');
    return result;
  } catch (e: any) {
    console.log(e.message);
  }
};
getAutoDoData().then(result => JSON.parse(result));

const getCalculData = async () => {
  try {
    let result = AsyncStorage.getItem('CALCUL_RESULT');
    return result;
  } catch (e: any) {
    console.log(e.message);
  }
};
getCalculData().then(result => console.log('calcul', result));

const getManualData = async () => {
  try {
    let result = AsyncStorage.getItem('MANUAL_RESULT');
    return result;
  } catch (e: any) {
    console.log(e.message);
  }
};
getManualData().then(result => console.log('manual', result));

const getClickedData = async () => {
  try {
    let result = AsyncStorage.getItem('CLICKED');
    return result;
  } catch (e: any) {
    console.log(e.message);
  }
};

//true인 값을 가지고 칼로리바에 표시
//auto, calcul, manual
getClickedData()
  .then(result => JSON.parse(result))
  .then(result => console.log(result.autoDoClicked));

const calorieBarSlice = createSlice({
  name: 'calorieBar',
  initialState,
  reducers: {
    log: (state, action) => {
      state.cal = state.cal + action.payload;
    },
  },
});

export default calorieBarSlice;
