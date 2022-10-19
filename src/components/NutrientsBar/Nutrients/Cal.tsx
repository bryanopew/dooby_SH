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
import {nutrientStyle} from '~/Components/NutrientsBar/Nutrients/nutrientStyle';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useSelector, useDispatch} from 'react-redux';

const Cal = props => {
  const {totalCalorie, calorieData, checkCartPage, lastProduct} = props;
  const selectedCart = useSelector((state: RootState) => {
    return state.addDiet.selected;
  });
  const last = lastProduct?.map(e => {
    return e.calorie;
  });
  const lastCalorie = last?.reduce((a, b) => a + b, 0);

  if (selectedCart?.length > 0 && calorieData) {
    return (
      <nutrientStyle.BarView>
        <nutrientStyle.BarText>칼로리(kcal)</nutrientStyle.BarText>
        <nutrientStyle.Bar>
          <Progress.Bar
            progress={calorieData / totalCalorie}
            width={80}
            height={5}
            color="#590DE1"
          />
        </nutrientStyle.Bar>
        <nutrientStyle.BarNumber>
          {calorieData}/{totalCalorie}
        </nutrientStyle.BarNumber>
      </nutrientStyle.BarView>
    );
  } else if (checkCartPage() === true) {
    //처음에는 0이다가 추가하면 움직이게 하기
    //checkcartpage=> 식단추가하기시에 가장 마지막 식단으로 클릭이됨
    //조건부 렌더링으로
    {
      return (
        <nutrientStyle.BarView>
          <nutrientStyle.BarText>칼로리(kcal)</nutrientStyle.BarText>
          <nutrientStyle.Bar>
            <Progress.Bar
              progress={lastCalorie / totalCalorie}
              width={80}
              height={5}
              color="#590DE1"
            />
          </nutrientStyle.Bar>
          <nutrientStyle.BarNumber>
            {lastCalorie}/{totalCalorie}
          </nutrientStyle.BarNumber>
        </nutrientStyle.BarView>
      );
    }
  } else if (selectedCart.length === 0) {
    return (
      <nutrientStyle.BarView>
        <nutrientStyle.BarText>칼로리(kcal)</nutrientStyle.BarText>
        <nutrientStyle.Bar>
          <Progress.Bar
            progress={calorieData / totalCalorie}
            width={80}
            height={5}
            color="#590DE1"
          />
        </nutrientStyle.Bar>
        <nutrientStyle.BarNumber>
          {calorieData}/{totalCalorie}
        </nutrientStyle.BarNumber>
      </nutrientStyle.BarView>
    );
  }
};

export default Cal;
