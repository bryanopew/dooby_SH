import React, {Component, useState, useEffect} from 'react';
import {
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  Button,
  Switch,
  Alert,
  TextInput,
  Pressable,
} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import {ScrollView} from 'react-native-gesture-handler';

import AutoDo from '~/Components/TargetCal/AutoDo';
import Calcul from '../TargetCal/Calcul';
import Manual from '../TargetCal/Manual';

const styles = StyleSheet.create({
  button: {
    marginTop: 50,
    alignItems: 'center',
    backgroundColor: '#590DE1',
    padding: 20,
  },
  box: {
    marginBottom: 10,
  },
});

const Basic3 = ({route, navigation}) => {
  const {info, target, conTarget} = route.params;
  const [open, setOpen] = useState({
    autoOpen: false,
    calOpen: false,
    manual: false,
  });

  console.log(target);
  return (
    <SafeAreaView>
      <ScrollView>
        <Text
          style={{
            fontSize: 30,
            fontWeight: 'bold',
            color: 'black',
            marginBottom: 10,
          }}>
          목표 섭취량을 {'\n'}입력해주세요
        </Text>
        <View style={styles.box}>
          <AutoDo info={info} target={target} conTarget={conTarget} />
        </View>
        <View style={styles.box}>
          <Calcul />
        </View>
        <View style={styles.box}>
          <Manual />
        </View>
        <Pressable
          style={styles.button}
          onPress={() => navigation.reset({routes: [{name: 'MainTabs'}]})}>
          <Text style={{color: 'white'}}>다음</Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Basic3;
