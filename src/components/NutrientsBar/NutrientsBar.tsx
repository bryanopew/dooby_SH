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
import {useSelector, useDispatch} from 'react-redux';

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
export const getNutrientInfo = () =>
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
getNutrientInfo();
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
  const content = useSelector((state: RootState) => {
    return state.calorieBar;
  });
  console.log('content:', content);

  return (
    <Container>
      <Cal totalCalorie={data.cal} addCalorie={content.basketCalorie} />
      <Carbon totalCarbon={data.carbon} addCarb={content.basketCarb} />
      <Protein totalProtein={data.protein} addProtein={content.basketProtein} />
      <Fat totalFat={data.fat} addFat={content.basketFat} />
    </Container>
  );
};

export default NutrientsBar;
