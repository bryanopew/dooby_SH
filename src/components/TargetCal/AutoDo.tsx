import React, {Component, useState} from 'react';
import {Button, Text, StyleSheet, Pressable} from 'react-native';
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
});
const HeaderText = Styled.Text`
  font-weight: bold;
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
  return (
    <ContentsContainer>
      <HeaderText>
        {`  칼로리:
  탄수화물:
  단백질:
  지방: 
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
        <ContentsHeaderContiainer>
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
