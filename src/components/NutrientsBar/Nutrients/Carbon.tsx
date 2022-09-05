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

const Carbon = props => {
  const {totalCarbon, addCarb} = props;
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
};

export default Carbon;
