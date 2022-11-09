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
import {getNutrientInfo} from '../NutrientsBar/NutrientsBar';

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
  disabledButton: {
    marginTop: 80,
    alignItems: 'center',
    backgroundColor: 'grey',
    padding: 20,
  },
});

const Basic3 = ({route, navigation}) => {
  const {info, target, conTarget} = route.params;
  const [clicked, setClicked] = useState({
    autoDoClicked: false,
    calculClicked: false,
    manualClicked: false,
  });
  let isValid;
  const check = () => {
    if (
      clicked.autoDoClicked === false &&
      clicked.calculClicked === false &&
      clicked.manualClicked === false
    ) {
      return (isValid = false);
    } else {
      return (isValid = true);
    }
  };
  check();
  console.log(isValid);
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
            fontSize: 24,
            fontWeight: 'bold',
            color: '#444444',
            marginBottom: 15,
            padding: 15,
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
          disabled={!isValid}
          style={!isValid ? styles.disabledButton : styles.button}
          onPress={() => {
            navigation.reset({
              routes: [{name: 'MainTabs', params: {info}}],
            });
            storeData();
            getNutrientInfo();
          }}>
          <Text style={{color: 'white'}}>완료</Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Basic3;
