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
import * as Progress from 'react-native-progress';

import Header from '../Components/HomeCompo/Header';
 

  const Nutrient = () => {
    return(
    <>
    <Progress.Bar progress={0.3} width={200} />
    </>)
  }

  const Category = () => {
    return(<Text>카테고리</Text>)
  }

  const Menus =() => {
      return(
        <Text>식단 1</Text>
      )
  }
  
  const Home = () => {
      return(
        <>
        <Header />
        <Nutrient />
        <Category />
        <Menus />
        </>
      )
  }

  export default Home;