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
  const {totalFat, addFat} = props;

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
