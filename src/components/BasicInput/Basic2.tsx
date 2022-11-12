import React, {Component, useState, useEffect, useCallback} from 'react';
import {
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  Button,
  Alert,
  TextInput,
  Pressable,
  BackHandler,
  ScrollView,
} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';

import WTimePicker from '~/Components/BasicInput/WTimePicker';
import ATimePicker from '~/Components/BasicInput/ATimePicker';
import styled from 'styled-components/native';
import colors from '~/styles/stylesHS/colors';
import {
  BtnBottomCTA,
  BtnCTA,
  BtnText,
  InputHeaderText,
  UserInfoTextInput,
} from '~/styles/stylesHS/styledConsts';

const Container = styled.SafeAreaView`
  flex: 1;
  background-color: ${colors.white};
  padding: 0px 16px 0px 16px;
`;

const TitleText = styled.Text`
  font-size: 24px;
  font-weight: bold;
  color: ${colors.textMain};
`;

const Basic2 = ({route, navigation}) => {
  const {item, weightValue, target, conTarget} = route.params;
  const [data, setData] = useState('SP003001');
  const [aData, setAData] = useState('SP004001');
  const [base, setBase] = useState('');
  const [disabled, setDisabled] = useState(true);
  let wValue = data;
  let aValue = aData;
  // 1. (활동대사량 = 0.0175 * Mets * 몸무게 * 운동시간(분))
  //  웨이트 운동 METs 값은 6으로 계산
  //  유산소 운동 METs 값은 7로 계산
  // 3. 기초대사량*0.2 (일상생활할 때 평균적으로 쓰이는 칼로리)

  // 30분이하 -> 0
  // 30분~1시간 -> 30
  // 1시간~1시간30분 -> 60
  // 1시간30분~2시간 -> 90
  // 2시간이상 -> 120

  // const AMR = wcal + acal + BMR*0.2
  // wcal = 0.0175*6*weight*wtime
  // acal = 0.0175*7*weight*atime
  // time 값은
  // if(value = w1) => 0
  // if(value = w2) => 30
  // if(value = w3) => 60
  // if(value = w4) => 90
  // if(value = w5) => 120
  function okNext() {
    if (wValue === '' || aValue === '') {
      return setDisabled(true);
    } else {
      return setDisabled(false);
    }
  }
  useEffect(() => {
    okNext();
  }, [aValue]);
  const wTime = () => {
    switch (wValue) {
      case 'SP003001':
        wValue = 0;
        break;
      case 'SP003002':
        wValue = 30;
        break;
      case 'SP003003':
        wValue = 60;
        break;
      case 'SP003004':
        wValue = 90;
        break;
      case 'SP003005':
        wValue = 120;
        break;
      default:
        return;
    }
  };

  const aTime = () => {
    switch (aValue) {
      case 'SP004001':
        aValue = 0;
        break;
      case 'SP004002':
        aValue = 30;
        break;
      case 'SP004003':
        aValue = 60;
        break;
      case 'SP004004':
        aValue = 90;
        break;
      case 'SP004005':
        aValue = 120;
        break;
      default:
        return;
    }
  };

  wTime();
  aTime();
  const wcal = 0.0175 * 6 * parseInt(weightValue) * wValue;
  const acal = 0.0175 * 7 * parseInt(weightValue) * aValue;
  const AMR = Math.round(wcal) + Math.round(acal) + item * 0.2;
  console.log('weightValue', weightValue);
  console.log('활동대사량', AMR);
  console.log('웨이트시간:', wValue);
  console.log('유산소시간:', aValue);
  return (
    <Container>
      <ScrollView contentContainerStyle={{paddingBottom: 120}}>
        <TitleText>선택 정보를 {'\n'}입력해주세요.</TitleText>
        <InputHeaderText isActivated={false}>
          유저의 기초대사량: {JSON.stringify(item)}{' '}
        </InputHeaderText>
        <UserInfoTextInput
          isActivated={base}
          placeholder="기초대사량을 알고 있다면 적어주세요(kcal)"
          onChangeText={setBase}
          value={base}
          keyboardType="numeric"
        />
        <InputHeaderText isActivated={true}>웨이트 운동시간</InputHeaderText>
        <WTimePicker setData={setData} />
        <InputHeaderText isActivated={true}>유산소 운동시간</InputHeaderText>
        <ATimePicker onChangeValue={okNext} setData={setAData} />
      </ScrollView>

      <BtnBottomCTA
        disabled={disabled}
        btnStyle={disabled ? 'inactivated' : 'activated'}
        onPress={() => {
          navigation.navigate('Basic3', {
            info: AMR + item,
            target,
            conTarget,
          });
        }}>
        <BtnText>다음</BtnText>
      </BtnBottomCTA>
    </Container>
  );
};

export default Basic2;
