import {View, Text} from 'react-native';
import React from 'react';
import styled from 'styled-components/native';
import colors from '~/styles/stylesHS/colors';
import {BtnCTA, Row} from '~/styles/stylesHS/styledConsts';

const ContentsHeaderContainer = styled(BtnCTA)`
  margin-top: 48px;
`;

const ContentsHeaderText = styled.Text`
  flex: 1;
  font-size: 16px;
  text-align: center;
  color: ${({isActivated}) => (isActivated ? colors.main : colors.textSub)};
`;

const ContentsHeaderIcon = styled.Image`
  position: absolute;
  width: 20px;
  height: 20px;
  right: 8px;
`;

/** props: 1. clicked | 2. handleClick | 3. headerText */
const ContentsHeader = props => {
  const {clicked, handleClick, headerText} = props;
  return (
    <ContentsHeaderContainer
      btnStyle={clicked ? 'borderActivated' : 'border'}
      onPress={() => {
        handleClick();
      }}>
      <Row>
        <ContentsHeaderText isActivated={clicked}>
          {headerText}
        </ContentsHeaderText>
        {clicked ? (
          <ContentsHeaderIcon source={require('~/Assets/Images/20_up.png')} />
        ) : (
          <ContentsHeaderIcon source={require('~/Assets/Images/20_down.png')} />
        )}
      </Row>
    </ContentsHeaderContainer>
  );
};

export default ContentsHeader;
