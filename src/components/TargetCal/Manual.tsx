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

const Contents = () => {
  return (
    <>
      <Text style={styles.text}>한끼 탄수화물(g)입력 (추천: 100g)</Text>
      <TextInput placeholder="0g" keyboardType="numeric" />
      <BorderLineContainer />
      <Text style={styles.text}>한끼 단백질(g)입력 (추천: 43g)</Text>
      <TextInput placeholder="0g" keyboardType="numeric" />
      <BorderLineContainer />
      <Text style={styles.text}>한끼 지방(g)입력 (추천: 16g)</Text>
      <TextInput placeholder="0g" keyboardType="numeric" />
      <BorderLineContainer />
      <Result />
    </>
  );
};

const Result = () => {
  return <Text style={styles.result}>계산된 결과 반영</Text>;
};

const Manual = props => {
  const {clicked, setClicked} = props;
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
      {clicked.manualClicked && <Contents />}
    </>
  );
};

export default Manual;
