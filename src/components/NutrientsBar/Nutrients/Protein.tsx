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
import {nutrientStyle} from '~/Components/NutrientsBar/Nutrients/nutrientStyle';

const Protein = props => {
  const {totalProtein} = props;
  const totalCalories = 21;
  let protein = 0;
  return (
    <nutrientStyle.BarView>
      <nutrientStyle.BarText>단백질(g)</nutrientStyle.BarText>
      <nutrientStyle.Bar>
        <Progress.Bar
          progress={protein / totalProtein}
          width={80}
          height={5}
          color={'rgba(51, 65, 159, 0.8)'}
        />
      </nutrientStyle.Bar>
      <nutrientStyle.BarNumber>
        {protein}/{totalProtein}
      </nutrientStyle.BarNumber>
    </nutrientStyle.BarView>
  );
};

export default Protein;
