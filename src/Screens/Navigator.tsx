import React, {useContext} from 'react';
import {Image, useColorScheme} from 'react-native';
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {ThemeProvider} from 'styled-components';

import Loading from '../Components/Loading';
import Basic1 from '~/Components/BasicInput/Basic1';
import Basic2 from '~/Components/BasicInput/Basic2';
import Basic3 from '~/Components/BasicInput/Basic3';
import Login from './Login';
import Home from '../Components/Home';
import Profile from '../Components/Profile';
import Basket from '../Components/HomeCompo/Basket';
import Search from '../Components/HomeCompo/Search';
import {UserContext} from '~/Context/User';

const Stack = createStackNavigator();
const BottomTab = createBottomTabNavigator();
const light = {
  color: {
    main: 'white',
    backgroundColor: 'white',
  },
};
const LoginNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: true,
      }}>
      {/* <Stack.Screen name="로그인" component={Login} /> */}
      {/* <Stack.Screen
        name="Basic1"
        component={Basic1}
        options={{headerShown: false}}
      />
      <Stack.Screen name="Basic2" component={Basic2} options={{title: ''}} />
      <Stack.Screen name="Basic3" component={Basic3} options={{title: ''}} /> */}
      <Stack.Screen
        name="MainTabs"
        component={MainTabs}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

const BasketTab = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Basket"
        component={Basket}
        options={{
          headerShown: false,
          title: '장바구니',
        }}
      />
    </Stack.Navigator>
  );
};

const SearchTab = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Search"
        component={Search}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

const HomeTab = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="식단" component={Home} />
      <Stack.Screen
        name="BasketTab"
        component={BasketTab}
        options={{
          title: '장바구니',
        }}
      />
      <Stack.Screen
        name="SearchTab"
        component={SearchTab}
        options={{
          title: '검색',
        }}
      />
    </Stack.Navigator>
  );
};

const MainTabs = () => {
  return (
    <BottomTab.Navigator>
      <BottomTab.Screen
        name="Home"
        component={HomeTab}
        options={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarIcon: ({color, focused}) => (
            <Image
              source={
                focused
                  ? require('~/Assets/Images/36_icon=home_check.png')
                  : require('~/Assets/Images/36_icon=home.png')
              }
            />
          ),
        }}
      />

      <BottomTab.Screen
        name="Profile"
        component={Profile}
        options={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarIcon: ({color, focused}) => (
            <Image
              source={
                focused
                  ? require('~/Assets/Images/36_icon=profile_check.png')
                  : require('~/Assets/Images/36_icon=profile.png')
              }
            />
          ),
        }}
      />
      <BottomTab.Screen
        name="BasketTab"
        component={Basket}
        options={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarIcon: ({color, focused}) => (
            <Image
              source={
                focused
                  ? require('~/Assets/Images/36_icon=basket.png')
                  : require('~/Assets/Images/36_icon=basket.png')
              }
            />
          ),
        }}
      />
      <BottomTab.Screen
        name="search"
        component={Search}
        options={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarIcon: ({color, focused}) => (
            <Image
              source={
                focused
                  ? require('~/Assets/Images/36_icon=basket.png')
                  : require('~/Assets/Images/36_icon=basket.png')
              }
            />
          ),
        }}
      />
    </BottomTab.Navigator>
  );
};

const MainNavigator = () => {
  return <MainTabs />;
};

export default () => {
  const {isLoading, userInfo} = useContext<IUserContext>(UserContext);
  useColorScheme();
  if (isLoading === true) {
    return <Loading />;
  }
  return (
    <ThemeProvider theme={light}>
      <NavigationContainer>
        {userInfo ? <MainNavigator /> : <LoginNavigator />}
      </NavigationContainer>
    </ThemeProvider>
  );
};
