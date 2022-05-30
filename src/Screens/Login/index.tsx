import {
    KakaoOAuthToken,
    login
  } from '@react-native-seoul/kakao-login';
import React, {useState} from 'react';
import {Text, View, TextInput,Button, StyleSheet, TouchableOpacity } from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';

import Basic1 from '~/Components/InputInformation/Basic1';

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

  const Login = () => { 
    const [result, setResult] = useState<string>('');
  
    const signInWithKakao = async (): Promise<void> => {
      const token: KakaoOAuthToken = await login();
  
      setResult(JSON.stringify(token));
    };
  
   
    return (
        <View>
        <Text style ={{ fontSize: 100}}>Dooby</Text>
        <TextInput style={{marginBottom: 16}} placeholder="이메일" />
        <TextInput style={{marginBottom: 16}} placeholder="비밀번호" />
        <TouchableOpacity onPress={() => signInWithKakao()}>
            <View style={styles.button}>
                <Text style={styles.buttonText}>카카오 로그인</Text>
            </View>
        </TouchableOpacity>
        </View>
    );
  }
  
  export default Login;