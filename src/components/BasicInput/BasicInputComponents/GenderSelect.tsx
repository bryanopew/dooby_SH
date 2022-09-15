import React, {Component, useState, useEffect} from 'react';
import {
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  Button,
  Alert,
  TextInput,
  Pressable,
  Dimensions,
} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import {ScrollView} from 'react-native-gesture-handler';
import {accessTokenConfig} from '~/utils/config';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styled from 'styled-components/native';
import {useForm, Controller, useWatch} from 'react-hook-form';

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: 'white',
  },
  textInput: {
    borderBottomWidth: 0.2,
    borderColor: '#E5E5E5',
    justifyContent: 'center',
    alignItems: 'flex-start',
    fontWeight: 'bold',
  },
  onTextInput: {
    borderBottomWidth: 1,
    borderColor: '#590DE1',
    justifyContent: 'center',
    alignItems: 'flex-start',
    fontWeight: 'bold',
  },
  headerText: {
    fontSize: 15,
    fontWeight: 'bold',
    color: 'white',
    marginTop: 10,
  },
  onHeaderText: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#590DE1',
    marginTop: 10,
  },
  button: {
    marginTop: 80,
    alignItems: 'center',
    backgroundColor: '#590DE1',
    padding: 20,
  },
  disabledButton: {
    marginTop: 80,
    alignItems: 'center',
    backgroundColor: 'grey',
    padding: 20,
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: '#590DE1',
    paddingRight: 50,
    paddingLeft: 50,
    marginLeft: 10,
  },
  unClickText: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'grey',
    paddingRight: 50,
    paddingLeft: 50,
    marginLeft: 10,
  },
  clicked: {
    borderRadius: 4,
    alignItems: 'center',
    borderColor: '#590DE1',
    borderWidth: 1,
    padding: 10,
    marginLeft: 8,
    marginRight: 16,
  },
  unClicked: {
    borderRadius: 4,
    alignItems: 'center',
    borderColor: 'grey',
    borderWidth: 1,
    padding: 10,
    marginLeft: 8,
    marginRight: 16,
  },
});

const GenderSelect = ({control, setValue}) => {
  const genderValue = useWatch({
    control,
    name: 'gender',
  });

  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 10,
        padding: 20,
      }}>
      <Pressable
        style={genderValue === 'M' ? styles.clicked : styles.unClicked}
        onPress={e => {
          setValue('gender', 'M');
        }}>
        <Text style={genderValue === 'M' ? styles.text : styles.unClickText}>
          남성
        </Text>
      </Pressable>
      <Pressable
        style={genderValue === 'F' ? styles.clicked : styles.unClicked}
        onPress={e => setValue('gender', 'F')}>
        <Text style={genderValue === 'F' ? styles.text : styles.unClickText}>
          여성
        </Text>
      </Pressable>
    </View>
  );
};

export default GenderSelect;
