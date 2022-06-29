import {KakaoOAuthToken, login, logout} from '@react-native-seoul/kakao-login';
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
import {loginWithKakaoTalk} from '~/stores/actions/auth/authActions';

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

const Login = props => {
  //   const [result, setResult] = useState<string>('');

  //   const signInWithKakao = async (): Promise<void> => {
  //     try {
  //       const token: KakaoOAuthToken = await login();

  //       setResult(JSON.stringify(token));
  //       console.log(token);
  //     } catch (e) {
  //       throw e;
  //     }
  //   };
  const dispatch = useDispatch();
  const {navigation} = props;

  const onHandleLoginWithKakaoTalk = useCallback(async (): Promise<void> => {
    try {
      const token: KakaoOAuthToken = await login();
      const kakaotalkToken = token.accessToken;
      requestAnimationFrame(() => {
        dispatch(
          loginWithKakaoTalk({kakaotalkToken}, (isSuccess, errMessage) => {
            try {
              logout();
            } catch (error) {}
            if (isSuccess) {
              onMovePage();
            }
            console.log(token);
          }),
        );
      });
    } catch (error) {
      if (error) {
        console.log('error: ', error);
      }
    }
  }, []);
  const onMovePage = useCallback(() => {
    navigation.navigate('Basic1');
  }, []);
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
      <TouchableOpacity onPress={() => onHandleLoginWithKakaoTalk()}>
        <View style={styles.button}>
          <Text style={styles.buttonText}>카카오 로그인</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default Login;
