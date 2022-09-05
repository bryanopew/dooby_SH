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
  const {totalCalorie, addCalorie} = props;
  return (
    <nutrientStyle.BarView>
      <nutrientStyle.BarText>칼로리(kcal)</nutrientStyle.BarText>
      <nutrientStyle.Bar>
        <Progress.Bar
          progress={addCalorie / totalCalorie}
          width={80}
          height={5}
          color="#590DE1"
        />
      </nutrientStyle.Bar>
      <nutrientStyle.BarNumber>
        {addCalorie}/{totalCalorie}
      </nutrientStyle.BarNumber>
    </nutrientStyle.BarView>
  );
};

export default Cal;
