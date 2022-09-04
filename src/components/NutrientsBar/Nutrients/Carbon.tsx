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
  const {totalCarbon} = props;
  console.log(totalCarbon);
  let calories = 0;
  return (
    <nutrientStyle.BarView>
      <nutrientStyle.BarText>탄수화물(g)</nutrientStyle.BarText>
      <nutrientStyle.Bar>
        <Progress.Bar
          progress={calories / totalCarbon}
          width={80}
          height={5}
          color="orange"
        />
      </nutrientStyle.Bar>
      <nutrientStyle.BarNumber>
        {calories}/{totalCarbon}
      </nutrientStyle.BarNumber>
    </nutrientStyle.BarView>
  );
};

export default Carbon;
