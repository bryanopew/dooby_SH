import React, {useContext} from 'react';
import {Image} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import {UserContext} from '~/Context/User';
import Loading from '../Components/Loading';
import Basic1 from '../Components/Basic1'
import Basic2 from '../Components/Basic2'
import Basic3 from '../Components/Basic3'
import Login from './Login';
import Home from '../Components/Home';
import Profile from '../Components/Profile';

const Stack = createStackNavigator();
const BottomTab = createBottomTabNavigator();

const LoginNavigator = () => {
    return(
        <Stack.Navigator screenOptions = {{headerShown: false}}>
            <Stack.Screen name="로그인" component={Login}/>
            <Stack.Screen name="Basic1" component={Basic1}/>
            <Stack.Screen name="Basic2" component={Basic2}/>
            <Stack.Screen name="Basic3" component={Basic3}/>
            <Stack.Screen name="MainTabs" component={MainTabs}/>
        </Stack.Navigator>
    );
};

const BasketTab = () => {
    return(
        <Stack.Navigator>
            <Stack.Screen
                name="Basket"
                component={Basket}
                options={{title: "장바구니"}}
            />
        </Stack.Navigator>
    );
};

const MainTabs = () => {
    return(
        <BottomTab.Navigator>
            <BottomTab.Screen 
                name="Home"
                component={Home}
                options={{
                    tabBarIcon: ({color, focused}) => (
                        <Image
                          source={
                              focused
                                ? require('~/Assets/Images/36_icon=home_check.png')
                                : require('~/Assets/Images/36_icon=home.png')  
                          }
                        />
                     )
                }}
            />
       
            <BottomTab.Screen
                name="Profile"
                component={Profile}
                options={{
                    tabBarIcon: ({color, focused}) => (
                        <Image
                          source={
                              focused
                                ? require('~/Assets/Images/36_icon=profile_check.png')
                                : require('~/Assets/Images/36_icon=profile.png')  
                          }
                        />
                    )
                }}
            />
        </BottomTab.Navigator>
    );
};

const MainNavigator = () => {
    return(
        <MainTabs />
    )
}

export default () => {
    const {isLoading, userInfo} = useContext<IUserContext>(UserContext);
    if (isLoading === true ) {
        return <Loading />;
    }
    return(
        <NavigationContainer>
            {userInfo ?  <MainNavigator/> : <LoginNavigator />}
        </NavigationContainer>
    );
};
