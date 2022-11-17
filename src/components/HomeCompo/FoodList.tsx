import {View, Text} from 'react-native';
import React from 'react';
import styled from 'styled-components/native';
import colors from '~/styles/stylesHS/colors';
import {Col, Row} from '~/styles/stylesHS/styledConsts';

const Container = styled.View`
  flex: 1;
`;

const Thumbnail = styled.Image`
  width: 100px;
  height: 100px;
  background-color: ${colors.highlight};
`;

const NutrSummaryContainer = styled.View`
  width: 100%;
  height: 22px;
  margin-top: 10px;
  background-color: ${colors.line};
`;

const FoodList = ({item}) => {
  return (
    <Container>
      <Row>
        <Thumbnail />
        <Col></Col>
      </Row>
      <NutrSummaryContainer></NutrSummaryContainer>
    </Container>
  );
};

export default FoodList;
