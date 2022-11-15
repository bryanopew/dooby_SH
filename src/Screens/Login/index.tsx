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

import {
  HEIGHT_SCALE,
  KAKAO_TOKEN_CONTROLLER,
  WIDTH,
} from '~/constants/constants';
import {GET_AUTH} from '~/constants/constants';
import {GET_USER} from '~/constants/constants';
import {RE_ISSUE_TOKEN} from '~/constants/constants';
import styled from 'styled-components/native';
import colors from '~/styles/stylesHS/colors';
import {BtnCTA} from '~/styles/stylesHS/styledConsts';

const Container = styled.View`
  flex: 1;
  align-items: center;
`;

const TitleText = styled.Text`
  font-size: 24px;
  text-align: center;
  font-weight: bold;
  color: #444444;
  margin-top: ${HEIGHT_SCALE * 470}px;
`;

const BtnText = styled.Text`
  font-size: 16px;
  color: ${colors.textMain};
`;

const Login = ({navigation}) => {
  const [result, setResult] = useState<string>('');

  const signInWithKakao = async (): Promise<void> => {
    const token: KakaoOAuthToken = await login();
    setResult(JSON.stringify(token));
    console.log('signInWithKakao: login start');
    const res = await axios.get(
      `${KAKAO_TOKEN_CONTROLLER}/${token.accessToken}`,
    );

    // console.log('login data: ', res.data);

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

    try {
      await AsyncStorage.setItem('ACCESS_TOKEN', ACCESS_TOKEN);
    } catch (e) {
      console.log('ACCESS TOKEN ERROR', e);
    }
    try {
      await AsyncStorage.setItem('REFRESH_TOKEN', REFRESH_TOKEN);
      console.log('Login: stroageSet refreshToken', REFRESH_TOKEN);
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
    <Container>
      <TitleText>식단 조절은 {'\n'} 두비에게</TitleText>
      <BtnCTA
        btnStyle="activated"
        style={{backgroundColor: '#FEE500', marginTop: 70}}
        onPress={() => signInWithKakao()}>
        <BtnText>카카오 로그인</BtnText>
      </BtnCTA>
    </Container>
  );
};

export default Login;
