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
  const {totalProtein, addProtein, proteinData} = props;
  const selectedCart = useSelector((state: RootState) => {
    return state.addDiet.selected;
  });
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
  }
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
