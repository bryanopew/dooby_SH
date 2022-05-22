import React, {useContext, useEffect} from 'react';
import {StackNavigationProp} from '@react-navigation/stack';
import {Text, View, TextInput,Button, StyleSheet, TouchableOpacity } from 'react-native';

import {UserContext} from '~/Context/User';

import Basic1 from '~/Components/Basic1';

type NavigationProp = StackNavigationProp<LoginNaviParamList, 'Login'>;
interface Props{
    navigation: NavigationProp;
}

const styles = StyleSheet.create({
    button: {
        borderRadius: 8,
        paddingVertical: 14,
        paddingHorizontal: 10,
        backgroundColor: '#FEE500',
    },
    buttonText: {
        color: 'black',
        fontWeight: 'bold',
        fontSize: 16,
        textAlign: 'center',
    }
});

const Login = ({ navigation}: Props) => {
    const {login} = useContext<IUserContext>(UserContext);
    return(
        <View>
        <Text style ={{ fontSize: 100}}>Dooby</Text>
        <TextInput style={{marginBottom: 16}} placeholder="이메일" />
        <TextInput style={{marginBottom: 16}} placeholder="비밀번호" />
        <TouchableOpacity onPress={() => navigation.navigate('Basic1')}>
            <View style={styles.button}>
                <Text style={styles.buttonText}>카카오 로그인</Text>
            </View>
        </TouchableOpacity>
        </View>
    )
}

export default Login;