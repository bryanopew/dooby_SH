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

const Cal = () => {
  const totalCalories = 832;
  const calories = 521;
  return (
    <nutrientStyle.BarView>
      <nutrientStyle.BarText>칼로리(kcal)</nutrientStyle.BarText>
      <nutrientStyle.Bar>
        <Progress.Bar
          progress={calories / totalCalories}
          width={80}
          height={5}
          color="red"
        />
      </nutrientStyle.Bar>
      <nutrientStyle.BarNumber>
        {calories}/{totalCalories}
      </nutrientStyle.BarNumber>
    </nutrientStyle.BarView>
  );
};

export default Cal;
