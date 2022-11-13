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
import NutrientsProgress from './NutrientsProgress';

const Container = styled.View`
  height: 70px;
  flex-direction: row;
  justify-content: space-between;
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
  const cartPage = useSelector((state: RootState) => {
    return state.addDiet.selectedCartPage;
  });
  const basketProduct = useSelector((state: RootState) => {
    return state.basketProduct.cart;
  });

  const findProductArray = e => {
    return cartsArray[e - 1];
  };
  const checkCartPage = () => {
    if (cartPage === cartsArray.length + 1) {
      return true;
    } else {
      return false;
    }
  };
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

  // 카트에 담긴 식품들의 각 영양성분 총합??
  const addCalorie = newCalorieArray?.reduce((a, b) => a + b, 0);
  const addCarb = newCarbArray?.reduce((a, b) => a + b, 0);
  const addProtein = newProteinArray?.reduce((a, b) => a + b, 0);
  const addFat = newFatArray?.reduce((a, b) => a + b, 0);

  const currentAddCalorie = content.basketCalorie.reduce((a, b) => a + b, 0);
  const currentAddCarb = content.basketCarb.reduce((a, b) => a + b, 0);
  const currentAddProtein = content.basketProtein.reduce((a, b) => a + b, 0);
  const currentAddFat = content.basketFat.reduce((a, b) => a + b, 0);

  // console.log(
  //   'nutrientsBar/currentAdd',
  //   currentAddCalorie,
  //   currentAddCarb,
  //   currentAddProtein,
  //   currentAddFat,
  // );

  // console.log('nutrientsBar/add', addCalorie, addCarb, addProtein, addFat);

  // 현재 diet(식단정보 -> 식단1, 2 등)에 들어있는 식품들 데이터를 store에서
  // 현재 컴포넌트인 NutrientsBar.tsx로 가져와서 progressBar하나씩 return하면 안되나?
  // 식품 추가하면 store에 저장하고 렌더링 하면서 progressBar에 적용되지 않나
  return (
    // <Container>
    //   <Cal
    //     totalCalorie={data.cal}
    //     calorieData={addCalorie}
    //     checkCartPage={checkCartPage}
    //     lastProduct={basketProduct}
    //   />
    //   <Carbon
    //     totalCarbon={data.carbon}
    //     addCarb={currentAddCarb}
    //     carbData={addCarb}
    //     checkCartPage={checkCartPage}
    //     lastProduct={basketProduct}
    //   />
    //   <Protein
    //     totalProtein={data.protein}
    //     addProtein={currentAddProtein}
    //     proteinData={addProtein}
    //     checkCartPage={checkCartPage}
    //     lastProduct={basketProduct}
    //   />
    //   <Fat
    //     totalFat={data.fat}
    //     addFat={currentAddFat}
    //     fatData={addFat}
    //     checkCartPage={checkCartPage}
    //     lastProduct={basketProduct}
    //   />
    // </Container>
    <Container>
      <NutrientsProgress title="칼로리(g)" numerator={70} denominator={100} />
      <NutrientsProgress title="탄수화물(g)" numerator={70} denominator={100} />
      <NutrientsProgress title="단백질(g)" numerator={70} denominator={100} />
      <NutrientsProgress title="지방(g)" numerator={70} denominator={100} />
    </Container>
  );
};

export default NutrientsBar;
