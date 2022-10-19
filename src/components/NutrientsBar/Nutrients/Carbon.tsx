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
import {useSelector, useDispatch} from 'react-redux';

import {nutrientStyle} from '~/Components/NutrientsBar/Nutrients/nutrientStyle';

const Carbon = props => {
  const {totalCarbon, addCarb, carbData, checkCartPage, lastProduct} = props;
  const selectedCart = useSelector((state: RootState) => {
    return state.addDiet.selected;
  });
  const last = lastProduct?.map(e => {
    return e.carb;
  });
  const lastCarbon = last?.reduce((a, b) => a + b, 0);

  if (selectedCart.length > 0 && carbData) {
    return (
      <nutrientStyle.BarView>
        <nutrientStyle.BarText>탄수화물(g)</nutrientStyle.BarText>
        <nutrientStyle.Bar>
          <Progress.Bar
            progress={carbData / totalCarbon}
            width={80}
            height={5}
            color="#3D9AFF"
          />
        </nutrientStyle.Bar>
        <nutrientStyle.BarNumber>
          {carbData}/{totalCarbon}
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
          <nutrientStyle.BarText>탄수화물(g)</nutrientStyle.BarText>
          <nutrientStyle.Bar>
            <Progress.Bar
              progress={lastCarbon / totalCarbon}
              width={80}
              height={5}
              color="#3D9AFF"
            />
          </nutrientStyle.Bar>
          <nutrientStyle.BarNumber>
            {lastCarbon}/{totalCarbon}
          </nutrientStyle.BarNumber>
        </nutrientStyle.BarView>
      );
    }
  } else if (selectedCart.length === 0) {
    return (
      <nutrientStyle.BarView>
        <nutrientStyle.BarText>탄수화물(g)</nutrientStyle.BarText>
        <nutrientStyle.Bar>
          <Progress.Bar
            progress={carbData / totalCarbon}
            width={80}
            height={5}
            color="#3D9AFF"
          />
        </nutrientStyle.Bar>
        <nutrientStyle.BarNumber>
          {carbData}/{totalCarbon}
        </nutrientStyle.BarNumber>
      </nutrientStyle.BarView>
    );
  } else {
    return (
      <nutrientStyle.BarView>
        <nutrientStyle.BarText>탄수화물(g)</nutrientStyle.BarText>
        <nutrientStyle.Bar>
          <Progress.Bar
            progress={addCarb / totalCarbon}
            width={80}
            height={5}
            color="#3D9AFF"
          />
        </nutrientStyle.Bar>
        <nutrientStyle.BarNumber>
          {addCarb}/{totalCarbon}
        </nutrientStyle.BarNumber>
      </nutrientStyle.BarView>
    );
  }
};

export default Carbon;
