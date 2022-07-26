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
import MenuFilterModal from '~/Components/HomeCompo/MenuFilter';

const Tab = createMaterialTopTabNavigator();
const FilterScreenStack = createStackNavigator();

const NutrientFilter = ({navigation}) => {
  return <Text>영양성분</Text>;
};

export default NutrientFilter;
