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
    Button
  } from 'react-native';
import * as Progress from 'react-native-progress';
import {nutrientStyle} from '~/Components/NutrientsBar/Nutrients/nutrientStyle';




const Cal = () => {
  
    const cal = [
    {
    id: 1,
    boolean: false,
    },
    {
      id: 2,
      boolean: true,
    }
  ]
  
    const tasksValue = Object.values(cal);
    const length = tasksValue.length;
    const completed = tasksValue.filter((task) => task.boolean === true).length;
    return (
      <nutrientStyle.BarView>
        <nutrientStyle.BarText>
          칼로리(kcal)
        </nutrientStyle.BarText>
        <nutrientStyle.Bar>
          <Progress.Bar
            progress={completed / length}
            width={null}
            height={8}
            color='red'
          />
        </nutrientStyle.Bar>
        <nutrientStyle.BarNumber>
          {completed}/{length}
        </nutrientStyle.BarNumber>
      </nutrientStyle.BarView>
    );
  };


export default Cal;