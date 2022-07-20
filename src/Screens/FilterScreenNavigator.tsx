import React, {useEffect, useRef, useState, Component} from 'react';
import {
  View,
  StyleSheet,
  Text,
  Modal,
  Animated,
  TouchableWithoutFeedback,
  Dimensions,
  PanResponder,
  Button,
  TouchableOpacity,
} from 'react-native';
import Styled from 'styled-components/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

import CategoryFilter from '~/Components/HomeCompo/FilterSubComponent/CategoryFilter';
import NutrientFilter from '~/Components/HomeCompo/FilterSubComponent/NutrientFilter';
import MenuFilterModal from '~/Components/HomeCompo/MenuFilter';

const Tab = createMaterialTopTabNavigator();
const FilterScreenStack = createStackNavigator();

const MenuFilterScreenStack = ({navigation}) => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarLabelStyle: [{fontSize: 15}, {fontWeight: 'bold'}],
        tabBarIndicatorStyle: false,
      }}>
      <Tab.Screen name="카테고리" component={CategoryFilter} />
      <Tab.Screen name="영양성분" component={NutrientFilter} />
      <Tab.Screen name="가격" component={NutrientFilter} />
      <Tab.Screen name="식단구성" component={NutrientFilter} />
    </Tab.Navigator>
  );
};

export default MenuFilterScreenStack;
