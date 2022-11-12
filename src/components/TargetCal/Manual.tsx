import React, {Component, useState} from 'react';
import {
  Button,
  Text,
  StyleSheet,
  Pressable,
  TextInput,
  View,
} from 'react-native';
import Styled from 'styled-components/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styled from 'styled-components/native';
import colors from '~/styles/stylesHS/colors';
import ContentsHeader from '../BasicInput/ContentsHeader';
import {
  InputHeaderText,
  UserInfoTextInput,
} from '~/styles/stylesHS/styledConsts';

const Container = styled.View`
  margin-top: -28px;
`;

const ContentsContainer = styled.View`
  margin-top: 12px;
  border-width: 1px;
  border-color: ${colors.main};
  border-radius: 5px;
  padding: 12px 16px 12px 16px;
`;

const ResultText = styled.Text`
  font-size: 12px;
  color: ${colors.textMain};
`;

const Contents = props => {
  //carbon * 4 = 탄수화물 총 칼로리
  //protein * 4 = 단백질 총 칼로리
  //fat * 9 = 지방 총 칼로리
  //칼로리: 다더한거 kcal (탄 : 단 : 지)
  // 비율 예시 (100 : 36: 21)
  let meal = Math.round((parseInt(props.info) + parseInt(props.conTarget)) / 3);
  let carbon = (0.55 * meal) / 4;
  let protein = (0.2 * meal) / 4;
  let fat = (0.25 * meal) / 9;
  const [carbonInput, setCarbonInput] = useState('');
  const [proteinInput, setProteinInput] = useState('');
  const [fatInput, setFatInput] = useState('');

  const totalCalorie =
    parseInt(carbonInput) * 4 +
    parseInt(proteinInput) * 4 +
    parseInt(fatInput) * 9;
  const carbonPortion = Math.round(((carbonInput * 4) / totalCalorie) * 100);
  const proteinPortion = Math.round(((proteinInput * 4) / totalCalorie) * 100);
  const fatPortion = Math.round(((fatInput * 9) / totalCalorie) * 100);
  let c = Math.round(carbonInput * 4);
  let p = Math.round(proteinInput * 4);
  let f = Math.round(fatInput * 4);
  let result = {
    meal,
    c,
    p,
    f,
  };
  const storeData = async () => {
    try {
      await AsyncStorage.setItem(
        'MANUAL_RESULT',
        JSON.stringify(result),
        () => {
          console.log('저장완료');
        },
      );
    } catch (e) {
      console.log('error', e);
    }
  };
  storeData();
  return (
    <>
      <InputHeaderText isActivated={carbonInput}>
        한끼 탄수화물 입력 (추천: {Math.round(carbon)}g)
      </InputHeaderText>
      <UserInfoTextInput
        isActivated={carbonInput}
        placeholder={`한끼 탄수화물 입력 (추천: ${Math.round(carbon)}g)`}
        keyboardType="numeric"
        onChangeText={setCarbonInput}
        value={carbonInput}
        onSubmitEditing={() => setCarbonInput(carbonInput)}
      />
      <InputHeaderText isActivated={proteinInput}>
        한끼 단백질 입력 (추천: {Math.round(protein)}g)
      </InputHeaderText>
      <UserInfoTextInput
        isActivated={proteinInput}
        placeholder={`한끼 단백질 입력 (추천: ${Math.round(protein)}g)`}
        keyboardType="numeric"
        onChangeText={setProteinInput}
        value={proteinInput}
        onSubmitEditing={() => setProteinInput(proteinInput)}
      />
      <InputHeaderText isActivated={fatInput}>
        한끼 지방 입력 (추천: {Math.round(fat)}g)
      </InputHeaderText>
      <UserInfoTextInput
        isActivated={fatInput}
        placeholder={`한끼 지방 입력 (추천: ${Math.round(fat)}g)`}
        keyboardType="numeric"
        onChangeText={setFatInput}
        value={fatInput}
        onSubmitEditing={() => setFatInput(fatInput)}
      />
      <Result
        info={totalCalorie}
        carbonPortion={carbonPortion}
        proteinPortion={proteinPortion}
        fatPortion={fatPortion}
      />
    </>
  );
};

const Result = props => {
  const {info, carbonPortion, proteinPortion, fatPortion} = props;
  return (
    <ContentsContainer>
      <ResultText>
        칼로리: {info}kcal ({carbonPortion}: {proteinPortion}: {fatPortion})
      </ResultText>
    </ContentsContainer>
  );
};

const Manual = props => {
  const {info, target, conTarget, clicked, setClicked} = props;

  const handleClick = () =>
    setClicked(prevState => ({
      ...prevState,
      autoDoClicked: false,
      calculClicked: false,
      manualClicked: !prevState.manualClicked,
    }));
  return (
    <Container>
      <ContentsHeader
        clicked={clicked.manualClicked}
        handleClick={handleClick}
        headerText="각 영양 성분 직접 입력(고수용)"
      />
      {clicked.manualClicked && (
        <Contents info={info} target={target} conTarget={conTarget} />
      )}
    </Container>
  );
};

export default Manual;
