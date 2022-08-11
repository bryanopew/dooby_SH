import React, {useEffect, useRef, useState, Component} from 'react';
import {
  View,
  StyleSheet,
  Text,
  Modal,
  Animated,
  TouchableWithoutFeedback,
  Dimensions,
  PanResponder,
  Button,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import styled from 'styled-components/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

import NutrientsBar from '~/components/NutrientsBar/NutrientsBar';

const HeaderButtonContainer = styled.View`
  flex-direction: row;
`;
const HeaderButtonText = styled.Text``;
const DietContainer = styled.View`
  padding: 10px;
`;

const TotalContainer = styled.View`
  background-color: yellow;
`;

const AddDietButton = styled.TouchableOpacity`
  align-items: center;
  padding: 15px;
  border-width: 1px;
  border-radius: 5px;
  margin: 10px;
  margin-top: 20px;
  border-color: #590de1;
`;
const DietProductContainer = styled.View`
  background-color: grey;
`;

const OrderButton = styled.TouchableOpacity`
  align-items: center;
  padding: 15px;
  background-color: #590de1;
  border-width: 1px;
  border-radius: 5px;
  margin: 10px;
  margin-top: 20px;
  border-color: #590de1;
`;
const PickDelete = styled.TouchableOpacity`
  border-width: 1px;
  left: 250px;
`;

const Basket = ({navigation}) => {
  return (
    <>
      <HeaderButtonContainer>
        <HeaderButtonText>전체 선택</HeaderButtonText>
        <PickDelete>
          <Text>선택 삭제</Text>
        </PickDelete>
      </HeaderButtonContainer>
      <ScrollView>
        <DietContainer>
          <NutrientsBar />
          <Text>식품을 추가해보세요</Text>
          <AddDietButton>
            <Text>귀찮을 땐 자동구성</Text>
          </AddDietButton>
          {/* <DietProductContainer>
            <Text>제품들이들어가는 위치</Text>
          </DietProductContainer> */}
          <Text style={{textAlign: 'right'}}>합계: 00000원</Text>
        </DietContainer>
      </ScrollView>
      <TotalContainer>
        <Text>전체합계:</Text>
      </TotalContainer>
      <OrderButton>
        <Text style={{color: 'white'}}>총 19800원 주문하기</Text>
      </OrderButton>
    </>
  );
};

export default Basket;
