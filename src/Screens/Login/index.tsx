import React, {useContext, useEffect} from 'react';
import {StackNavigationProp} from '@react-navigation/stack';
import {Text, View, TextInput,Button } from 'react-native';

import {UserContext} from '~/Context/User';

import Basic1 from '~/Components/Basic1';

type NavigationProp = StackNavigationProp<LoginNaviParamList, 'Login'>;
interface Props{
    navigation: NavigationProp;
}



const Login = ({ navigation}: Props) => {
    const {login} = useContext<IUserContext>(UserContext);
    return(
        <View>
        <Text style ={{ fontSize: 100}}>Dooby</Text>
        <TextInput style={{marginBottom: 16}} placeholder="이메일" />
        <TextInput style={{marginBottom: 16}} placeholder="비밀번호" />
        <Button  
          title="Login"
          onPress={() => navigation.navigate('Basic1')}
          
          //() =>{login('subply@gmail.com', 'password')}
          />
        </View>
    )
}

export default Login;