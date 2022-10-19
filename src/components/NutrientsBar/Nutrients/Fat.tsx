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

const Fat = props => {
  const {totalFat, addFat, fatData, checkCartPage, lastProduct} = props;
  const selectedCart = useSelector((state: RootState) => {
    return state.addDiet.selected;
  });
  const last = lastProduct?.map(e => {
    return e.fat;
  });
  const lastFat = last?.reduce((a, b) => a + b, 0);
  if (selectedCart.length > 0 && fatData) {
    return (
      <nutrientStyle.BarView>
        <nutrientStyle.BarText>지방(g)</nutrientStyle.BarText>
        <nutrientStyle.Bar>
          <Progress.Bar
            progress={fatData / totalFat}
            width={80}
            height={5}
            color="#FFBD60"
          />
        </nutrientStyle.Bar>
        <nutrientStyle.BarNumber>
          {fatData}/{totalFat}
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
          <nutrientStyle.BarText>지방(g)</nutrientStyle.BarText>
          <nutrientStyle.Bar>
            <Progress.Bar
              progress={lastFat / totalFat}
              width={80}
              height={5}
              color="#FFBD60"
            />
          </nutrientStyle.Bar>
          <nutrientStyle.BarNumber>
            {lastFat}/{totalFat}
          </nutrientStyle.BarNumber>
        </nutrientStyle.BarView>
      );
    }
  } else if (selectedCart.length === 0) {
    return (
      <nutrientStyle.BarView>
        <nutrientStyle.BarText>지방(g)</nutrientStyle.BarText>
        <nutrientStyle.Bar>
          <Progress.Bar
            progress={fatData / totalFat}
            width={80}
            height={5}
            color="#FFBD60"
          />
        </nutrientStyle.Bar>
        <nutrientStyle.BarNumber>
          {fatData}/{totalFat}
        </nutrientStyle.BarNumber>
      </nutrientStyle.BarView>
    );
  } else
    return (
      <nutrientStyle.BarView>
        <nutrientStyle.BarText>지방(g)</nutrientStyle.BarText>
        <nutrientStyle.Bar>
          <Progress.Bar
            progress={addFat / totalFat}
            width={80}
            height={5}
            color="#FFBD60"
          />
        </nutrientStyle.Bar>
        <nutrientStyle.BarNumber>
          {addFat}/{totalFat}
        </nutrientStyle.BarNumber>
      </nutrientStyle.BarView>
    );
};

export default Fat;
