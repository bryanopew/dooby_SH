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
import CategoryFilter from '~/Components/HomeCompo/FilterSubComponent/CategoryFilter';
import NutrientFilter from '~/Components/HomeCompo/FilterSubComponent/NutrientFilter';
import MenuFilterModal from '~/Components/HomeCompo/MenuFilter';

const Stack = createStackNavigator();
const FilterScreenStack = createStackNavigator();
const BottomTab = createBottomTabNavigator();

const LoginNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: true,
      }}>
      {/* <Stack.Screen name="로그인" component={Login} />
      <Stack.Screen
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

const HomeTab = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="식단" component={Home} />
      <Stack.Screen
        name="modal"
        component={MenuFilterModal}
        options={{
          presentation: 'modal',
        }}
      />
    </Stack.Navigator>
  );
};

//현재 4개로 이루어진 필터 스택 생성
//MenuFilterScreenStack(카테고리,영양성분,가격,자동구성)
//그런데 4개의  LIST가 현재 MODAL 컴포넌트인 MenuFilterModal 내부에 있어야함

const MenuFilterScreenStack = () => {
  return (
    <FilterScreenStack.Navigator>
      <FilterScreenStack.Screen
        name="CategoryFilter"
        component={CategoryFilter}
      />
      <FilterScreenStack.Screen
        name="NutrientFilter"
        component={NutrientFilter}
      />
      <FilterScreenStack.Screen name="PriceFilter" component={NutrientFilter} />
      <FilterScreenStack.Screen name="DietFilter" component={NutrientFilter} />
    </FilterScreenStack.Navigator>
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
        name="장바구니"
        component={Basket}
        options={{
          headerShown: true,
          tabBarShowLabel: false,
          tabBarIcon: ({color, focused}) => (
            <Image
              source={
                focused
                  ? require('~/Assets/Images/36_paymentPage_selected.png')
                  : require('~/Assets/Images/24_paymentPage.png')
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
    <NavigationContainer>
      {userInfo ? <MainNavigator /> : <LoginNavigator />}
    </NavigationContainer>
  );
};
