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
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

import CategoryFilter from '~/Components/HomeCompo/FilterSubComponent/CategoryFilter';
import NutrientFilter from '~/Components/HomeCompo/FilterSubComponent/NutrientFilter';
import PriceFilter from '~/Components/HomeCompo/FilterSubComponent/PriceFilter';
import AutoDietFilter from '~/Components/HomeCompo/FilterSubComponent/AutoDietFilter';

const Tab = createMaterialTopTabNavigator();

const MenuFilterScreenStack = props => {
  const {index} = props;
  const userClick = () => {
    if (index === 0) {
      return '카테고리';
    } else if (index === 1) {
      return '영양성분';
    } else if (index === 2) {
      return '가격';
    } else if (index === 3) {
      return '식단구성';
    }
  };

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarLabelStyle: [{fontSize: 15}, {fontWeight: 'bold'}],
        tabBarIndicatorStyle: false,
      }}
      initialRouteName={userClick()}>
      <Tab.Screen name="카테고리" component={CategoryFilter} />
      <Tab.Screen name="영양성분" component={NutrientFilter} />
      <Tab.Screen name="가격" component={PriceFilter} />
      <Tab.Screen name="식단구성" component={AutoDietFilter} />
    </Tab.Navigator>
  );
};

export default MenuFilterScreenStack;
