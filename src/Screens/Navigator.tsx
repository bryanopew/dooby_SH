import React, {useContext} from 'react';
import {Image} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import {UserContext} from '~/Context/User';
import Loading from '../Components/Loading';
import Basic1 from '../Components/Basic1'
import Login from './Login';

const Stack = createStackNavigator();
const BottomTab = createBottomTabNavigator();

const LoginNavigator = () => {
    return(
        <Stack.Navigator screenOptions = {{headerShown: false}}>
            <Stack.Screen name="로그인" component={Login}/>
            <Stack.Screen name="Basic1" component={Basic1}/>
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
        <BottomTab.Navigator
            tabBarOptions={{showLabel: false}}>
            <BottomTab.Screen 
                name="Home"
                component={Home}
                options={{
                    tabBarIcon: ({color, focused}) => {
                        <Image
                          source={
                              focused
                                ? require('../Assets/Images/Tabs/ic_home.png')
                                : require('../Assets/Images/Tabs/ic_home.png')  
                          }
                        />
                    }
                }}
            />
       
            <BottomTab.Screen
                name="Profile"
                component={Profile}
                options={{
                    tabBarIcon: ({color, focused}) => {
                        <Image
                          source={
                              focused
                                ? require('../Assets/Images/Tabs/ic_profile.png')
                                : require('../Assets/Images/Tabs/ic_profile.png')  
                          }
                        />
                    }
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
