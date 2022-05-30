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


import Header from '../Components/HomeCompo/Header'; 
import NutrientsBar from '~/Components/NutrientsBar/NutrientsBar'

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
        <NutrientsBar />
        <Category />
        <Menus />
        </>
      )
  }

  export default Home;