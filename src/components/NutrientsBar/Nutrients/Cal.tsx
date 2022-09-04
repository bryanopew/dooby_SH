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

const Cal = props => {
  const {totalCalorie} = props;
  let calories = 0;
  return (
    <nutrientStyle.BarView>
      <nutrientStyle.BarText>칼로리(kcal)</nutrientStyle.BarText>
      <nutrientStyle.Bar>
        <Progress.Bar
          progress={calories / totalCalorie}
          width={80}
          height={5}
          color="red"
        />
      </nutrientStyle.Bar>
      <nutrientStyle.BarNumber>
        {calories}/{totalCalorie}
      </nutrientStyle.BarNumber>
    </nutrientStyle.BarView>
  );
};

export default Cal;
