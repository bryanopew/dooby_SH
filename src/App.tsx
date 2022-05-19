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
import Basic1 from './components/Basic1';
import Location from './components/Location';
import Date from './components/Date';

const styles = StyleSheet.create({
  wrap: {
    flex: 1,
  },
  header: {
    height: 60,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
    lineHeight: 24
  },
  empty: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'powderblue',
  }
});

const App: () => Node = () => {
  return (
    <SafeAreaView>
    <View style={styles.header}>
      <Text style={styles.headerText}>기본 정보를 입력해주세요</Text>
    </View>
    <Basic1/>
    </SafeAreaView>
  );
};


export default App;
