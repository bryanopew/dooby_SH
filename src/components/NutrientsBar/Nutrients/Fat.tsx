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

const Fat = () => {
  const fat = [
    {
      id: 1,
      boolean: false,
    },
    {
      id: 2,
      boolean: false,
    },
  ];

  const tasksValue = Object.values(fat);
  const length = tasksValue.length;
  const completed = tasksValue.filter(task => task.boolean === true).length;
  return (
    <nutrientStyle.BarView>
      <nutrientStyle.BarText>지방(g)</nutrientStyle.BarText>
      <nutrientStyle.Bar>
        <Progress.Bar
          progress={completed / length}
          width={80}
          height={5}
          color="green"
        />
      </nutrientStyle.Bar>
      <nutrientStyle.BarNumber>
        {completed}/{length}
      </nutrientStyle.BarNumber>
    </nutrientStyle.BarView>
  );
};

export default Fat;
