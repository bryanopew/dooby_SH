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


import NutrientsBar from '~/Components/NutrientsBar/NutrientsBar'
import Category from '~/Components/HomeCompo/Category';
import Menus from '~/Components/HomeCompo/Menus';

import {StackNavigationProp} from '@react-navigation/stack';

import IconButton from '~/Components/IconButton';
import Styled from 'styled-components/native';


const HeaderRightContainer = Styled.View`
  flex-direction: row;
`;

type NavigationProp = StackNavigationProp<HeaderTab, 'Header'>;
interface Props {
  navigation: NavigationProp;
}


  const Home = ({navigation}: Props) => {

    React.useLayoutEffect(() => {
      navigation.setOptions({
        headerRight: () => (
          <HeaderRightContainer>
            <IconButton iconName="search" onPress={() => navigation.navigate('SearchTab')}/>
            <IconButton iconName="filter" />
            <IconButton iconName="basket" onPress={() => navigation.navigate('BasketTab')}/>
          </HeaderRightContainer>
        ),
      });
    }, []);
  
      return(
        <>
        <NutrientsBar />
        <Category />
        <Menus />
        </>
      )
  }

  export default Home;