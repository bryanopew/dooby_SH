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
  const cartsArray = useSelector((state: RootState) => {
    return state.addDiet.cartsArray;
  });
  const selectedCart = useSelector((state: RootState) => {
    return state.addDiet.selected;
  });
  // console.log('NutrientsBar/content:', content);
  // console.log('NutrientsBar/selectedCart:', selectedCart);
  // console.log('NutrientsBar/cartsArray:', cartsArray);
  // console.log('NutrientsBar/content:', content);
  //   const addCalorie = content.basketCalorie.reduce((a, b) => a + b, 0);
  //   const addCarb = content.basketCarb.reduce((a, b) => a + b, 0);
  //   const addProtein = content.basketProtein.reduce((a, b) => a + b, 0);
  //   const addFat = content.basketFat.reduce((a, b) => a + b, 0);

  //   return (
  //     <Container>
  //       <Cal totalCalorie={data.cal} addCalorie={addCalorie} />
  //       <Carbon totalCarbon={data.carbon} addCarb={addCarb} />
  //       <Protein totalProtein={data.protein} addProtein={addProtein} />
  //       <Fat totalFat={data.fat} addFat={addFat} />
  //     </Container>
  //   );

  const newCalorieArray = selectedCart?.map(e => {
    return e.calorie;
  });
  const newCarbArray = selectedCart?.map(e => {
    return e.carb;
  });
  const newProteinArray = selectedCart?.map(e => {
    return e.protein;
  });
  const newFatArray = selectedCart?.map(e => {
    return e.fat;
  });
  const addCalorie = newCalorieArray?.reduce((a, b) => a + b, 0);
  const addCarb = newCarbArray?.reduce((a, b) => a + b, 0);
  const addProtein = newProteinArray?.reduce((a, b) => a + b, 0);
  const addFat = newFatArray?.reduce((a, b) => a + b, 0);

  const currentAddCalorie = content.basketCalorie.reduce((a, b) => a + b, 0);
  const currentAddCarb = content.basketCarb.reduce((a, b) => a + b, 0);
  const currentAddProtein = content.basketProtein.reduce((a, b) => a + b, 0);
  const currentAddFat = content.basketFat.reduce((a, b) => a + b, 0);
  //보여주는 부분이랑 장바구니 데이터 분리시켜서
  //첫화면에서는 보여주기만,
  //식단추가하고 식단 페이지 이동할때는 저장된 데이터 가져와서 보여주기
  return (
    <Container>
      <Cal
        totalCalorie={data.cal}
        addCalorie={currentAddCalorie}
        calorieData={addCalorie}
      />
      <Carbon
        totalCarbon={data.carbon}
        addCarb={currentAddCarb}
        carbData={addCarb}
      />
      <Protein
        totalProtein={data.protein}
        addProtein={currentAddProtein}
        proteinData={addProtein}
      />
      <Fat totalFat={data.fat} addFat={currentAddFat} fatData={addFat} />
    </Container>
  );
};

export default NutrientsBar;
