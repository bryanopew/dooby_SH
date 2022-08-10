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
  background-color: red;
`;
const HeaderButtonText = styled.Text``;
const DietContainer = styled.View`
  background-color: green
  padding: 10px
`;

const TotalContainer = styled.View`
  background-color: yellow;
`;

const AddDietButton = styled.TouchableOpacity`
  background-color: orange
  align-items: center;
`;
const DietProductContainer = styled.View`
  background-color: grey;
`;

const OrderButton = styled.TouchableOpacity`
  background-color: orange
  align-items: center;
`;

const Basket = ({navigation}) => {
  return (
    <>
      <HeaderButtonContainer>
        <HeaderButtonText>전체삭제</HeaderButtonText>
      </HeaderButtonContainer>
      <ScrollView>
        <DietContainer>
          <NutrientsBar />
          <Text>식품을 추가해보세요</Text>
          {/* 제품이 추가되지않았을경우에 노출되는 컴포넌트 => <AddDietButton ><Text>귀찮을 땐 자동구성</Text></AddDietButton> */}
          <DietProductContainer>
            <Text>제품들이들어가는 위치</Text>
          </DietProductContainer>
          <Text style={{textAlign: 'right'}}>합계: 00000원</Text>
        </DietContainer>
      </ScrollView>
      <TotalContainer>
        <Text>전체합계:</Text>
      </TotalContainer>
      <OrderButton>
        <Text>주문하기</Text>
      </OrderButton>
    </>
  );
};

export default Basket;
