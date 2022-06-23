import {KakaoOAuthToken, login} from '@react-native-seoul/kakao-login';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
  Text,
  View,
  TextInput,
  Button,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {useDispatch} from 'react-redux';
import {Edge, useSafeAreaInsets} from 'react-native-safe-area-context';
import {loginWithKaKaoTalk} from '~/stores/actions/auth/authActions';

import MySpinner from '~/Components/my-spinner';

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
  },
});

const Login = () => {
  const [result, setResult] = useState<string>('');

  const signInWithKakao = async (): Promise<void> => {
    const token: KakaoOAuthToken = await login();

    setResult(JSON.stringify(token));
  };

  return (
    <View>
      <Text
        style={{
          fontSize: 30,
          marginTop: 300,
          textAlign: 'center',
          marginBottom: 20,
        }}>
        식단 조절은 {'\n'} 두비에게
      </Text>
      <TouchableOpacity onPress={() => signInWithKakao()}>
        <View style={styles.button}>
          <Text style={styles.buttonText}>카카오 로그인</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default Login;
