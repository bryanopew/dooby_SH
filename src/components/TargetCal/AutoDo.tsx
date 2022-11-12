import React, {Component, useState} from 'react';
import {Button, Text, StyleSheet, Pressable} from 'react-native';
import styled from 'styled-components/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {BtnCTA, Col, Row} from '~/styles/stylesHS/styledConsts';
import colors from '~/styles/stylesHS/colors';
import ContentsHeader from '../BasicInput/ContentsHeader';

const Container = styled.View``;

const ContentsContainer = styled.View`
  margin-top: 12px;
  border-width: 1px;
  border-color: ${colors.main};
  border-radius: 5px;
  padding: 16px;
`;

const NutrientSummaryText = styled.Text`
  font-size: 12px;
  color: ${colors.textMain};
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
    <ContentsContainer>
      <Col>
        <NutrientSummaryText>{`칼로리: ${meal} kcal`}</NutrientSummaryText>
        <NutrientSummaryText>{`탄수화물: ${Math.round(
          carbon,
        )} g`}</NutrientSummaryText>
        <NutrientSummaryText>{`단백질: ${Math.round(
          protein,
        )} g`}</NutrientSummaryText>
        <NutrientSummaryText>{`지방: ${Math.round(
          fat,
        )} g`}</NutrientSummaryText>
      </Col>
      <Col style={{marginTop: 8}}>
        <NutrientSummaryText>
          {` 고객님의 기초대사량과 활동대사량을 추정하여 하루 총 사용하는 칼로리를${props.info}kcal로 계산했어요. `}
        </NutrientSummaryText>
        <NutrientSummaryText style={{marginTop: 4}}>
          {` ${props.target}을 위해 하루에 ${props.conTarget}를 제한하여 한 끼기준${meal}kcal를 추천드립니다.`}
        </NutrientSummaryText>
        <NutrientSummaryText style={{marginTop: 4}}>
          {` 탄수화물, 단백질, 지방 비율 은 보건복지부 한국인 영양섭취기준(2020)에서 권장하는 비율로 설정했습니다.`}
        </NutrientSummaryText>
      </Col>
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
    <Container>
      <ContentsHeader
        clicked={clicked.autoDoClicked}
        handleClick={handleClick}
        headerText="귀찮다 두비가 알아서 다 해줘!"
      />
      {clicked.autoDoClicked && (
        <Contents info={info} target={target} conTarget={conTarget} />
      )}
    </Container>
  );
};

export default AutoDo;
