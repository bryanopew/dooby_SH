import React from 'react';
import {
  FlatList,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Button,
} from 'react-native';
import * as Progress from 'react-native-progress';
import styled from 'styled-components/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Cal from './Nutrients/Cal';
import Carbon from './Nutrients/Carbon';
import Protein from './Nutrients/Protein';
import Fat from './Nutrients/Fat';

const Container = styled.View`
  background-color: white;
  flex-direction: row;
`;

let data = {
  cal: 0,
  carbon: 0,
  protein: 0,
  fat: 0,
};

//클릭 data

const getClickedData = async () => {
  try {
    let result = AsyncStorage.getItem('CLICKED');
    return result;
  } catch (e: any) {
    console.log(e.message);
  }
};
getClickedData()
  .then(result => JSON.parse(result))
  .then(result => {
    if (result.autoDoClicked === true) {
      getAutoDoData()
        .then(result => JSON.parse(result))
        .then(result => {
          data.cal = result.meal;
          data.carbon = result.c;
          data.protein = result.p;
          data.fat = result.f;
        });
    } else if (result.calculClicked === true) {
      getCalculData()
        .then(result => JSON.parse(result))
        .then(result => {
          data.cal = result.meal;
          data.carbon = result.c;
          data.protein = result.p;
          data.fat = result.f;
        });
    } else if (result.manualClicked === true) {
      getManualData()
        .then(result => JSON.parse(result))
        .then(result => {
          data.cal = result.meal;
          data.carbon = result.c;
          data.protein = result.p;
          data.fat = result.f;
        });
    }
  });

//autoDo 가져오기
const getAutoDoData = async () => {
  try {
    let result = AsyncStorage.getItem('AUTODO_RESULT');
    return result;
  } catch (e: any) {
    console.log(e.message);
  }
};
// getAutoDoData()
//   .then(result => JSON.parse(result))
//   .then(result => {
//     data.cal = result.meal;
//     data.carbon = result.c;
//     data.protein = result.p;
//     data.fat = result.f;
//   })
//   .then(() => console.log(data));

//calcul 가져오기
const getCalculData = async () => {
  try {
    let result = AsyncStorage.getItem('CALCUL_RESULT');
    return result;
  } catch (e: any) {
    console.log(e.message);
  }
};
// getCalculData()
//   .then(result => JSON.parse(result))
//   .then(result => {
//     data.cal = result.meal;
//     data.carbon = result.c;
//     data.protein = result.p;
//     data.fat = result.f;
//   })
//   .then(() => console.log(data));

//manual 가져오기
const getManualData = async () => {
  try {
    let result = AsyncStorage.getItem('MANUAL_RESULT');
    return result;
  } catch (e: any) {
    console.log(e.message);
  }
};
// getManualData()
//   .then(result => JSON.parse(result))
//   .then(result => {
//     data.cal = result.meal;
//     data.carbon = result.c;
//     data.protein = result.p;
//     data.fat = result.f;
//   });

const NutrientsBar = () => {
  return (
    <Container>
      <Cal totalCalorie={data.cal} />
      <Carbon totalCarbon={data.carbon} />
      <Protein totalProtein={data.protein} />
      <Fat totalFat={data.fat} />
    </Container>
  );
};

export default NutrientsBar;
