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

const styles = StyleSheet.create({
  button: {
    marginTop: 10,
    marginBottom: 10,
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 20,
    color: 'grey',
  },
  contents: {
    marginTop: 10,
    marginBottom: 10,
  },
  text: {
    color: '#590DE1',
    fontWeight: 'bold',
  },
  result: {
    marginTop: 10,
    color: 'black',
    fontWeight: 'bold',
  },
  clicked: {
    borderWidth: 1,
    borderColor: '#590DE1',
  },
  unClicked: {
    borderWidth: 1,
    borderColor: 'grey',
  },
});

const BorderLineContainer = Styled.View`
  border-bottom-width: 1px;
  border-color: grey;
  margin-bottom:10px;
`;
const ContentsHeaderText = Styled.Text`
  font-weight: bold;
  font-size: 15px;
`;
const ContentsHeaderContiainer = Styled.View`
border-width: 1px;
border-color: grey;
border-radius: 5px;
height: 60px;
width: 112%
padding: 15px;
align-items: center;
margin-top: -30px;
`;
const TextInputContainer = Styled.View`
border-color: #590DE1;
border-radius: 5px;
padding: 10px;
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
      <Text style={styles.text}>
        한끼 탄수화물(g)입력 (추천: {Math.round(carbon)}g)
      </Text>
      <TextInput
        placeholder="0g"
        keyboardType="numeric"
        onChangeText={setCarbonInput}
        value={carbonInput}
        onSubmitEditing={() => setCarbonInput(carbonInput)}
      />
      <BorderLineContainer />
      <Text style={styles.text}>
        한끼 단백질(g)입력 (추천: {Math.round(protein)}g)
      </Text>
      <TextInput
        placeholder="0g"
        keyboardType="numeric"
        onChangeText={setProteinInput}
        value={proteinInput}
        onSubmitEditing={() => setProteinInput(proteinInput)}
      />
      <BorderLineContainer />
      <Text style={styles.text}>
        한끼 지방(g)입력 (추천: {Math.round(fat)}g)
      </Text>
      <TextInput
        placeholder="0g"
        keyboardType="numeric"
        onChangeText={setFatInput}
        value={fatInput}
        onSubmitEditing={() => setFatInput(fatInput)}
      />
      <BorderLineContainer />
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
    <Text style={styles.result}>
      칼로리: {info}kcal ({carbonPortion}: {proteinPortion}: {fatPortion})
    </Text>
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
    <>
      <Pressable style={styles.button} onPress={handleClick}>
        <ContentsHeaderContiainer
          style={clicked.manualClicked ? styles.clicked : styles.unClicked}>
          <ContentsHeaderText>
            각 영양 성분 직접 입력(고수용)
          </ContentsHeaderText>
        </ContentsHeaderContiainer>
      </Pressable>
      {clicked.manualClicked && (
        <Contents info={info} target={target} conTarget={conTarget} />
      )}
    </>
  );
};

export default Manual;
