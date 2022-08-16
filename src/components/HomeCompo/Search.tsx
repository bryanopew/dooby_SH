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
  Platform,
  Image,
  SafeAreaView,
} from 'react-native';
import styled from 'styled-components/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

import NutrientsBar from '~/components/NutrientsBar/NutrientsBar';
import CheckBoxAndroid from '~/Button/CheckBoxAndroid';
import {selectedProducts} from '~/Components/Home';

const newNumbers = selectedProducts.filter((number, index, target) => {
  return target.indexOf(number) === index;
});

const basketProducts = newNumbers.map((numbers, index) => {
  return {numbers};
});
console.log('장바구니담긴', basketProducts[2]);

const dimensions = Dimensions.get('window');
const imageHeight = Math.round(dimensions.width / 3);
const imageWidth = dimensions.width / 3;

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: 'white',
  },
  button: {
    right: 10,
    position: 'absolute',
    backgroundColor: '#590DE1',
    width: 25,
    height: 25,
    marginTop: 20,
    borderRadius: 35,

    ...Platform.select({
      ios: {
        shadowColor: 'rgba(0,0,0,0.2)',
        shadowOpacity: 1,
        shadowOffset: {height: 2, width: 2},
        shadowRadius: 2,
      },

      android: {
        elevation: 0,
      },
    }),
  },

  text: {
    fontSize: 18,
    textAlign: 'center',
    color: 'white',
  },
});
const HeaderButtonContainer = styled.View`
  flex-direction: row;
`;
const HeaderButtonText = styled.Text`
  margin-left: 5px;
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
const DietProductContainer = styled.View``;

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
  margin-top: 5px;
  margin-bottom: 5px;
  border-width: 1px;
  left: 170px;
  padding: 5px;
`;

const FoodNoticeContainer = styled.View`
  background: white;
  justify-content: center;
  border-bottom-width: 1px;
  border-bottom-color: grey;
`;
const FoodNoticeText = styled.Text`
  margin-left: 10px;
  font-weight: bold;
  font-size: 18px;
  margin-bottom: 10px;
`;
const FilterMenuContainer = styled.View`
  background: white;
  flex-direction: row;
  margin-top: 10px;
  margin-left: 10px;
`;
const FilterText = styled.Text`
  margin-left: 10px;
`;
const ProductContainer = styled.View`
  background: white;
`;
const RowContainer = styled.View`
  flex-direction: row;
`;
const ColumnContainer = styled.View`
  flex-direction: column;
`;
const ProductNutrientContainer = styled.View`
  margin-top: 5px;
  margin-left: 1px;
  background: white;
  left: 9px;
  height: 15px;
`;
const ProductNutrientText = styled.Text`
  font-size: 11px;
`;
const ProductNutrientNumberText = styled.Text`
  font-weight: bold;
  font-size: 10px;
`;
const ProductNameText = styled.Text`
  font-weight: bold;
  padding: 19px;
  margin-left: -10px;
`;
const ProductDetailText = styled.Text`
  justify-content: center;
  margin-left: 10px;
`;
const ProductPriceText = styled.Text`
  padding: 10px;
  font-weight: bold;
`;
const Space = styled.Text``;

const OnBasket = ({navigation}) => {
  return (
    <SafeAreaView style={styles.wrapper}>
      <HeaderButtonContainer>
        <CheckBoxAndroid />
        <HeaderButtonText>전체 선택</HeaderButtonText>
        <PickDelete>
          <Text>선택 삭제</Text>
        </PickDelete>
      </HeaderButtonContainer>
      <ScrollView>
        <DietContainer>
          <Text style={{marginLeft: 170, fontWeight: 'bold', marginBottom: 15}}>
            식단
          </Text>

          <NutrientsBar />
          <ScrollView>
            <DietProductContainer>
              <RowContainer>
                <Image
                  style={{
                    height: imageHeight,
                    width: imageWidth,
                    marginLeft: 10,
                  }}
                  resizeMode={'contain'}
                  source={require('~/Assets/Images/testImage.jpg')}
                />
                <ColumnContainer>
                  <ProductNameText>유통사 이름</ProductNameText>
                  <ProductDetailText>제품 이름</ProductDetailText>
                  <ProductNutrientContainer>
                    <ProductNutrientText>
                      칼로리
                      <ProductNutrientNumberText>
                        00kcal
                      </ProductNutrientNumberText>
                      <Space>{''}</Space>
                      탄수화물{' '}
                      <ProductNutrientNumberText>00g</ProductNutrientNumberText>
                      <Space>{''}</Space>
                      단백질{''}
                      <ProductNutrientNumberText>
                        00g{''}
                      </ProductNutrientNumberText>
                      <Space>{''}</Space>
                      지방{''}
                      <ProductNutrientNumberText>
                        00g{''}
                      </ProductNutrientNumberText>
                    </ProductNutrientText>
                  </ProductNutrientContainer>
                </ColumnContainer>
              </RowContainer>

              <ProductPriceText>ㅇㅇㅇㅇ원</ProductPriceText>
            </DietProductContainer>
          </ScrollView>
          <Text style={{textAlign: 'right'}}>합계: 00000원</Text>
        </DietContainer>
      </ScrollView>
      <TotalContainer>
        <Text>전체합계:</Text>
      </TotalContainer>
      <OrderButton>
        <Text style={{color: 'white'}}>총 19800원 주문하기</Text>
      </OrderButton>
    </SafeAreaView>
  );
};

export default OnBasket;
