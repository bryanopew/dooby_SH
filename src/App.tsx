/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

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

import Navigator from './Screens/Navigator';
import Login from './Screens/Login';


const App: () => Node = () => {
  return (
    <Navigator />
    );
};


export default App;
