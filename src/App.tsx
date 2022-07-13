/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {Provider} from 'react-redux';
import store from './stores/store';
import Navigator from './Screens/Navigator';
import Login from './Screens/Login';
import {SafeAreaView, StyleSheet, Text} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#3143e8',
  },
});

const App: () => Node = () => {
  return (
    <Provider store={store}>
      <SafeAreaView style={styles.container}>
        <Navigator />
      </SafeAreaView>
    </Provider>
  );
};

export default App;
