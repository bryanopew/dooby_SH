import React, {Component, useEffect, useState} from 'react';
import {createSlice} from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {result} from '~/Components/Home';

type InitialState = {
  cal: number;
  carbon: number;
  protein: number;
  fat: number;
};

let initialState: InitialState = {
  cal: 0,
  carbon: 0,
  protein: 0,
  fat: 0,
};

let autoDoData = {
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
getAutoDoData()
  .then(result => JSON.parse(result))
  .then(result => {
    autoDoData.cal = result.meal;
    autoDoData.carbon = result.c;
    autoDoData.protein = result.p;
    autoDoData.fat = result.f;
  });
// const getCalculData = async () => {
//   try {
//     let result = AsyncStorage.getItem('CALCUL_RESULT');
//     return result;
//   } catch (e: any) {
//     console.log(e.message);
//   }
// };
// getCalculData().then(result => console.log('calcul', result));

// const getManualData = async () => {
//   try {
//     let result = AsyncStorage.getItem('MANUAL_RESULT');
//     return result;
//   } catch (e: any) {
//     console.log(e.message);
//   }
// };
// getManualData().then(result => console.log('manual', result));

const getClickedData = async () => {
  try {
    let result = AsyncStorage.getItem('CLICKED');
    return result;
  } catch (e: any) {
    console.log(e.message);
  }
};

// switch(clicked){
//   case 'autoDoClicked':
//     cal: result.cal,
//     carbon: result.carbon,
//     protein: result.protein,
//     fat: result.fat,
//     break
//     case 'caculClicked':
//       cal: result.cal,
//       carbon: result.carbon,
//       protein: result.protein,
//       fat: result.fat,
//       break
//   case 'manaulClicked':
//     cal: result.cal,
//     carbon: result.carbon,
//     protein: result.protein,
//     break
// }

// getClickedData()
//   .then(result => JSON.parse(result))
//   .then(result => {
//     if (result.autoDoClicked === true) {
//       (initialState.cal = result.cal),
//         (initialState.carbon = result.carbon),
//         (initialState.protein = result.protein),
//         (initialState.fat = result.fat);
//     } else {
//       console.log(result);
//     }
//   });

const calorieBarSlice = createSlice({
  name: 'calorieBar',
  initialState,
  reducers: {
    autoDoData: (state, action) => {
      state = autoDoData;
    },
  },
});

export default calorieBarSlice;
