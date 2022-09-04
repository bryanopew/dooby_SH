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

const Fat = props => {
  const {totalFat} = props;
  const totalCalories = 42;
  let fat = 0;
  return (
    <nutrientStyle.BarView>
      <nutrientStyle.BarText>지방(g)</nutrientStyle.BarText>
      <nutrientStyle.Bar>
        <Progress.Bar
          progress={fat / totalFat}
          width={80}
          height={5}
          color="green"
        />
      </nutrientStyle.Bar>
      <nutrientStyle.BarNumber>
        {fat}/{totalFat}
      </nutrientStyle.BarNumber>
    </nutrientStyle.BarView>
  );
};

export default Fat;
