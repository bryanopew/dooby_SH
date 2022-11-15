import {View, Text} from 'react-native';
import React from 'react';
import styled from 'styled-components/native';
import colors from '~/styles/stylesHS/colors';
import {WIDTH} from '~/constants/constants';
import * as Progress from 'react-native-progress';
import {Col} from '~/styles/stylesHS/styledConsts';

const Container = styled.View`
  width: ${(WIDTH - 32 - 8 * 3) / 4}px;
  height: 70px;
  justify-content: center;
`;

const ProgressBarTitle = styled.Text`
  font-size: 12px;
  color: ${colors.textMain};
  text-align: left;
`;
const ProgressBarNumber = styled.Text`
  font-size: 12px;
  margin-top: 5px;
  color: ${colors.textMain};
  text-align: right;
`;

const indicatorColorsByTitle = {
  '칼로리(g)': colors.main,
  '탄수화물(g)': colors.blue,
  '단백질(g)': colors.green,
  '지방(g)': colors.orange,
};

/** props:
 * 1. title '칼로리(g)' | '탄수화물(g)' | '단백질(g)' | '지방(g)'
 * 2. numerator(일부값)
 * 3. denominator(전체값) */
const NutrientsProgress = ({title, numerator, denominator}) => {
  const indicatorColor = indicatorColorsByTitle[title];
  const progressWidth = (WIDTH - 32 - 8 * 3) / 4;
  console.log('NutrientsProgress: ', indicatorColor);
  return (
    <Container>
      <Col>
        <ProgressBarTitle>{title}</ProgressBarTitle>
        <Progress.Bar
          style={{marginTop: 5}}
          progress={numerator / denominator}
          width={progressWidth}
          height={4}
          color={indicatorColor}
          unfilledColor={colors.line}
          borderWidth={0}
        />
        <ProgressBarNumber>{`${numerator}/${denominator}`}</ProgressBarNumber>
      </Col>
    </Container>
  );
};

export default NutrientsProgress;
