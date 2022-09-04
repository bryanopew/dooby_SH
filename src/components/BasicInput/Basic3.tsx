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
import {ScrollView} from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';

import AutoDo from '~/Components/TargetCal/AutoDo';
import Calcul from '../TargetCal/Calcul';
import Manual from '../TargetCal/Manual';

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: 'white',
  },
  button: {
    marginTop: 50,
    alignItems: 'center',
    backgroundColor: '#590DE1',
    padding: 20,
  },
  boxUnClicked: {
    width: '90%',
    marginBottom: 5,
    marginLeft: 15,
  },
  boxClicked: {
    width: '90%',
    marginBottom: 5,
    marginLeft: 15,
    borderColor: '#590DE1',
    borderRadius: 10,
    borderWidth: 1,
  },
});

const Basic3 = ({route, navigation}) => {
  const {info, target, conTarget} = route.params;
  const [clicked, setClicked] = useState({
    autoDoClicked: false,
    calculClicked: false,
    manualClicked: false,
  });

  const storeData = async () => {
    try {
      await AsyncStorage.setItem('CLICKED', JSON.stringify(clicked));
    } catch (e) {
      console.log('error', e);
    }
  };
  return (
    <SafeAreaView>
      <ScrollView style={styles.wrapper}>
        <Text
          style={{
            fontSize: 30,
            fontWeight: 'bold',
            color: 'black',
            marginBottom: 10,
          }}>
          목표 섭취량을 {'\n'}입력해주세요
        </Text>
        <View style={styles.boxUnClicked}>
          <AutoDo
            info={info}
            target={target}
            conTarget={conTarget}
            clicked={clicked}
            setClicked={setClicked}
          />
        </View>
        <View style={styles.boxUnClicked}>
          <Calcul
            info={info}
            conTarget={conTarget}
            clicked={clicked}
            setClicked={setClicked}
          />
        </View>
        <View style={styles.boxUnClicked}>
          <Manual
            info={info}
            conTarget={conTarget}
            clicked={clicked}
            setClicked={setClicked}
          />
        </View>
        <Pressable
          style={styles.button}
          onPress={() => {
            navigation.reset({
              routes: [{name: 'MainTabs', params: {info}}],
            });
            storeData();
          }}>
          <Text style={{color: 'white'}}>완료</Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Basic3;
