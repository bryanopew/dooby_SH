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
import styled from "styled-components/native";
import {nutrientStyle} from '~/Components/NutrientsBar/Nutrients/nutrientStyle';


const Protein = () => {
  
    const protein = [
    {
    id: 1,
    boolean: false,
    },
    {
      id: 2,
      boolean: true,
    }
  ]
  
    const tasksValue = Object.values(protein);
    const length = tasksValue.length;
    const completed = tasksValue.filter((task) => task.boolean === true).length;
    return (
      <nutrientStyle.BarView>
          <nutrientStyle.BarText>
          단백질(g)
        </nutrientStyle.BarText>
        <nutrientStyle.Bar>
          <Progress.Bar
            progress={completed / length}
            width={null}
            height={10}
            color={"rgba(51, 65, 159, 0.8)"}
          />
        </nutrientStyle.Bar>
        <nutrientStyle.BarNumber>
          {completed}/{length}
        </nutrientStyle.BarNumber>
      </nutrientStyle.BarView>
    );
  };

export default Protein;