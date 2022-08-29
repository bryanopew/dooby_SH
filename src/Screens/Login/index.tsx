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
import axios from 'axios';
import {accessTokenConfig} from '~/utils/config';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {KAKAO_TOKEN_CONTROLLER} from '~/constants/constants';
import {GET_AUTH} from '~/constants/constants';
import {GET_USER} from '~/constants/constants';
import {RE_ISSUE_TOKEN} from '~/constants/constants';

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
const Login = ({navigation}) => {
  const [result, setResult] = useState<string>('');

  const signInWithKakao = async (): Promise<void> => {
    const token: KakaoOAuthToken = await login();
    setResult(JSON.stringify(token));

    const res = await axios.get(
      `${KAKAO_TOKEN_CONTROLLER}/${token.accessToken}`,
    );
    const ACCESS_TOKEN = res.data.accessToken;
    if (res?.status === 200) {
      console.log('access success');
      onMovePage();
    } else {
      console.log('access token fail');
    }
    const REFRESH_TOKEN = res.data.refreshToken;
    if (res?.status === 200) {
      console.log('refresh success');
    } else {
      console.log('refresh token fail');
    }
    const getAuth = await axios.get(`${GET_AUTH}`, {
      headers: {
        Authentication: `Bearer ${ACCESS_TOKEN}`,
      },
    });
    const getUser = await axios.get(
      'http://61.100.16.155:8080/api/member/user/get-user',
      {
        headers: {
          Authentication: `Bearer ${ACCESS_TOKEN}`,
        },
      },
    );
    try {
      await AsyncStorage.setItem('ACCESS_TOKEN', ACCESS_TOKEN);
    } catch (e) {
      console.log('ACCESS TOKEN ERROR', e);
    }
    try {
      await AsyncStorage.setItem('REFRESH_TOKEN', REFRESH_TOKEN);
    } catch (e) {
      console.log('REFRESH TOKEN ERROR');
    }
  };
  // const dispatch = useDispatch();
  // const {navigation} = props;

  // const onHandleLoginWithKakaoTalk = useCallback(async (): Promise<void> => {
  //   try {
  //     const token: KakaoOAuthToken = await login();
  //     const kakaotalkToken = token.accessToken;
  //     requestAnimationFrame(() => {
  //       dispatch(
  //         loginWithKakaoTalk({kakaotalkToken}, (isSuccess, errMessage) => {
  //           try {
  //             logout();
  //           } catch (error) {}
  //           if (isSuccess) {
  //             onMovePage();
  //           }
  //           console.log(token);
  //         }),
  //       );
  //     });
  //   } catch (error) {
  //     if (error) {
  //       console.log('error: ', error);
  //     }
  //   }
  // }, []);
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
      <TouchableOpacity onPress={() => signInWithKakao()}>
        <View style={styles.button}>
          <Text style={styles.buttonText}>카카오 로그인</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default Login;
