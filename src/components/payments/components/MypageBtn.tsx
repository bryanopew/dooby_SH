import {View, Text} from 'react-native';
import React, {useState} from 'react';
import styled from 'styled-components/native';
import colors from '../colors';
import {TextMain, TextSub, Row} from '../styledConsts';
import {EvilIcons} from '@expo/vector-icons';
import Icon from 'react-native-vector-icons/Ionicons';

import {useNavigation} from '@react-navigation/native';

const Container = styled.TouchableOpacity`
  flex-direction: row;
  width: 100%;
  height: 58px;
  padding: 0px 8px 0px 0px;
  align-items: center;
  justify-content: space-between;
  /* border-bottom-width: 1px;
  border-bottom-color: ${colors.line}; */
`;

const BtnTextMain = styled(TextMain)`
  font-size: 16px;
`;
const BtnTextSub = styled(TextSub)``;

const MypageBtn = ({page, currentWeight}) => {
  const navigation = useNavigation();
  //   console.log(page, currentWeight);
  const subText = currentWeight ? ` (현재:${currentWeight})` : '';

  const moveToSubPage = pageId => {
    navigation.navigate('StackNav', {
      screen: `${pageId}`,
      params: {pageId},
    });
  };
  return (
    <Container onPress={() => moveToSubPage(page.id)}>
      <Row>
        <BtnTextMain>{page.title}</BtnTextMain>
        <BtnTextSub>{page.title === '몸무게 변경' ? subText : null}</BtnTextSub>
      </Row>
      <Icon name="chevron-right" size={28} color={colors.textMain} />
    </Container>
  );
};

export default MypageBtn;
