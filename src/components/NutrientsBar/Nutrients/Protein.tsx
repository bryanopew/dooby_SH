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
  const {totalProtein, addProtein} = props;

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
