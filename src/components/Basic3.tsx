
import React, { Component, useState } from 'react';
import { StyleSheet, SafeAreaView, View, Text, Button, Switch, Alert, TextInput, Pressable } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';

import AutoDo from './TargetCal/AutoDo';
import Calcul from './TargetCal/Calcul';
import Manual from './TargetCal/Manual';

const styles = StyleSheet.create({
  button: {
    marginTop: 50,
    alignItems: "center",
    backgroundColor: '#590DE1',
    padding: 20
  },

});

const Basic3 = ({navigation}) => {
    return (
      <SafeAreaView>
      <Text style={{fontSize: 30, fontWeight: 'bold', color: 'black', marginBottom: 20}}>목표 섭취량을 {"\n"}입력해주세요</Text>
      <AutoDo />         
      <Calcul />
      <Manual />
        <Pressable
        style={styles.button}
        onPress={()=> navigation.navigate('MainTabs')}
        >
        <Text style={{color: 'white'}}>다음</Text>
      </Pressable>
      </SafeAreaView>
    );
  };

export default Basic3;