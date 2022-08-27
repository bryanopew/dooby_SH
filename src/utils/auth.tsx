import React, {Component, useEffect, useState} from 'react';
import {
  FlatList,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Button,
  Image,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import Styled from 'styled-components/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

import NutrientsBar from '~/Components/NutrientsBar/NutrientsBar';
import Category from '~/Components/HomeCompo/Category';
import Menus from '~/Components/HomeCompo/Menus';
import BottomSheetTestScreen from '~/Components/HomeCompo/MenuFilter';

import {StackNavigationProp} from '@react-navigation/stack';

import IconButton from '~/Components/IconButton';

async function validateToken() {
  const getToken = () => {
    let token = AsyncStorage.getItem('ACCESS_TOKEN');
    return token;
  };
  const getRefreshToken = () => {
    let refreshToken = AsyncStorage.getItem('REFRESH_TOKEN');
    return refreshToken;
  };
  let returnVal = false;
  try {
    getToken()
      .then(token =>
        axios.get('http://61.100.16.155:8080/api/member/user/get-user', {
          headers: {
            Authentication: `Bearer ${token}`,
          },
        }),
      )
      .then(res => console.log('success', res));
  } catch (e) {
    console.log('access error', (returnVal = true));
  }
  if (!returnVal) {
    try {
      getRefreshToken().then(refreshToken =>
        axios.get('http://61.100.16.155:8080/api/member/auth/re-issue-token', {
          headers: {
            Authentication: `Bearer ${refreshToken}`,
          },
        }),
      );
    } catch (e) {
      console.log('refreshToken error');
      returnVal = false;
    }
  }
}
