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

import NutrientsBar from '~/Components/NutrientsBar/NutrientsBar';

const HeaderButtonContainer = styled.View`
  flex-direction: row;
`;
const HeaderButtonText = styled.Text`
  margin-left: 20px;
  margin-top: 10px;
`;
const DietContainer = styled.View`
  padding: 10px;
  background-color: white;
`;

const TotalContainer = styled.View``;

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
  background-color: red;
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
  margin-top: 10px;
  border-width: 1px;
  left: 220px;
  padding: 5px;
`;

const Basket = ({navigation}) => {
  return (
    // <>
    //   <HeaderButtonContainer>
    //     <HeaderButtonText>전체 선택</HeaderButtonText>
    //     <PickDelete>
    //       <Text>선택 삭제</Text>
    //     </PickDelete>
    //   </HeaderButtonContainer>
    //   <ScrollView>
    //     <DietContainer>
    //       <Text style={{marginLeft: 170, fontWeight: 'bold', marginBottom: 15}}>
    //         식단
    //       </Text>
    //       <NutrientsBar />
    //       <Text style={{marginTop: 30}}>식품을 추가해보세요</Text>
    //       <AddDietButton>
    //         <Text>귀찮을 땐 자동구성</Text>
    //       </AddDietButton>

    //       <Text style={{textAlign: 'right'}}>합계: 00000원</Text>
    //     </DietContainer>
    //   </ScrollView>
    //   <TotalContainer>
    //     <Text>전체합계:</Text>
    //   </TotalContainer>
    //   <OrderButton>
    //     <Text style={{color: 'white'}}>총 19800원 주문하기</Text>
    //   </OrderButton>
    // </>
    <Text> 결제탭</Text>
  );
};

export default Basket;
