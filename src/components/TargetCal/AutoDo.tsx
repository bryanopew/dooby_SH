import React, {Component, useState} from 'react';
import {Button, Text, StyleSheet, Pressable} from 'react-native';
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
  clicked: {
    borderWidth: 1,
    borderColor: '#590DE1',
  },
  unClicked: {
    borderWidth: 1,
    borderColor: 'grey',
  },
});
const HeaderText = Styled.Text`
  font-weight: bold;
`;
const ContentsHeaderText = Styled.Text`
  padding-top: 3px;
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
`;
const ContentsContainer = Styled.View`
border-width: 1px;
border-color: grey;
border-radius: 5px;
padding: 10px;
margin-top: -20px;
`;

const Contents = props => {
  let meal = Math.round((parseInt(props.info) + parseInt(props.conTarget)) / 3);
  let carbon = Math.round(0.55 * meal) / 4;
  let protein = Math.round(0.2 * meal) / 4;
  let fat = Math.round(0.25 * meal) / 9;

  const c = Math.round(carbon);
  const p = Math.round(protein);
  const f = Math.round(fat);
  const result = {
    meal,
    c,
    p,
    f,
  };

  const storeData = async () => {
    try {
      await AsyncStorage.setItem(
        'AUTODO_RESULT',
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
    <ContentsContainer style={styles.clicked}>
      <HeaderText>
        {`  칼로리: ${meal} kcal
  탄수화물: ${Math.round(carbon)}g
  단백질: ${Math.round(protein)}g
  지방: ${Math.round(fat)}g
      `}

        {` 고객님의 기초대사량과 활동대사량을 추정하여 하루 총 사용하는 칼로리를${props.info}kcal로 계산. ${props.target}을 위해 하루에 ${props.conTarget}를 제한하여 한 끼기준${meal}kcal를 추천드립니다. 탄수화물, 단백질, 지방 비율 은 보건복지부 한국인 영양섭취기준(2020)에서 권장하는  비율로 설정했습니다.`}
      </HeaderText>
    </ContentsContainer>
  );
};

const AutoDo = props => {
  const {info, target, conTarget, clicked, setClicked} = props;
  const handleClick = () =>
    setClicked(prevState => ({
      ...prevState,
      autoDoClicked: !prevState.autoDoClicked,
      calculClicked: false,
      manualClicked: false,
    }));
  return (
    <>
      <Pressable
        style={styles.button}
        onPress={() => {
          handleClick();
        }}>
        <ContentsHeaderContiainer
          style={clicked.autoDoClicked ? styles.clicked : styles.unClicked}>
          <ContentsHeaderText>귀찮다 두비가 알아서 다 해줘!</ContentsHeaderText>
        </ContentsHeaderContiainer>
      </Pressable>
      {clicked.autoDoClicked && (
        <Contents info={info} target={target} conTarget={conTarget} />
      )}
    </>
  );
};

export default AutoDo;
