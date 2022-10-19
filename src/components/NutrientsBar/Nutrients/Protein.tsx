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
import {useSelector, useDispatch} from 'react-redux';

import {nutrientStyle} from '~/Components/NutrientsBar/Nutrients/nutrientStyle';

const Protein = props => {
  const {totalProtein, addProtein, proteinData, checkCartPage, lastProduct} =
    props;
  const selectedCart = useSelector((state: RootState) => {
    return state.addDiet.selected;
  });
  const last = lastProduct?.map(e => {
    return e.protein;
  });
  const lastProtein = last?.reduce((a, b) => a + b, 0);
  if (selectedCart.length > 0 && proteinData) {
    return (
      <nutrientStyle.BarView>
        <nutrientStyle.BarText>단백질(g)</nutrientStyle.BarText>
        <nutrientStyle.Bar>
          <Progress.Bar
            progress={proteinData / totalProtein}
            width={80}
            height={5}
            color="#00E297"
          />
        </nutrientStyle.Bar>
        <nutrientStyle.BarNumber>
          {proteinData}/{totalProtein}
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
          <nutrientStyle.BarText>단백질(g)</nutrientStyle.BarText>
          <nutrientStyle.Bar>
            <Progress.Bar
              progress={lastProtein / totalProtein}
              width={80}
              height={5}
              color="#00E297"
            />
          </nutrientStyle.Bar>
          <nutrientStyle.BarNumber>
            {lastProtein}/{totalProtein}
          </nutrientStyle.BarNumber>
        </nutrientStyle.BarView>
      );
    }
  } else if (selectedCart.length === 0) {
    return (
      <nutrientStyle.BarView>
        <nutrientStyle.BarText>단백질(g)</nutrientStyle.BarText>
        <nutrientStyle.Bar>
          <Progress.Bar
            progress={proteinData / totalProtein}
            width={80}
            height={5}
            color="#00E297"
          />
        </nutrientStyle.Bar>
        <nutrientStyle.BarNumber>
          {proteinData}/{totalProtein}
        </nutrientStyle.BarNumber>
      </nutrientStyle.BarView>
    );
  } else
    return (
      <nutrientStyle.BarView>
        <nutrientStyle.BarText>단백질(g)</nutrientStyle.BarText>
        <nutrientStyle.Bar>
          <Progress.Bar
            progress={addProtein / totalProtein}
            width={80}
            height={5}
            color="#00E297"
          />
        </nutrientStyle.Bar>
        <nutrientStyle.BarNumber>
          {addProtein}/{totalProtein}
        </nutrientStyle.BarNumber>
      </nutrientStyle.BarView>
    );
};

export default Protein;
