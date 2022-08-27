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
import {useIsFocused} from '@react-navigation/native';

import NutrientsBar from '~/components/NutrientsBar/NutrientsBar';
import CheckBoxAndroid from '~/Button/CheckBoxAndroid';
import {selectedProducts} from '~/Components/Home';
import CheckBox from '@react-native-community/checkbox';

const newNumbers = selectedProducts.filter((number, index, target) => {
  return target.indexOf(number) === index;
});
console.log('selectedProducts', selectedProducts);
let basketProducts = [];
if (newNumbers.length >= 1) {
  basketProducts = newNumbers.reduce(function (acc, cur) {
    return acc.concat(cur);
  });
}

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
  textInput: {
    borderColor: 'black',
    borderWidth: 1,
  },
  container: {
    position: 'absolute',
    marginLeft: 5,
    marginTop: 15,
    backgroundColor: 'white',
  },
});

const EachCheckBoxAndroid = () => {
  const [state, setState] = useState(false);
  return (
    <View style={styles.container}>
      <CheckBox
        value={state}
        onValueChange={value => setState(value)}
        tintColors={{true: '#30D158'}}
      />
    </View>
  );
};
const HeaderButtonContainer = styled.View`
  flex-direction: row;
  background-color: #f8f8f8;
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
  border-radius: 5px;
  border-color: #e5e5e5;
  left: 170px;
  padding: 5px;
  background-color: white;
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
  margin-left: 150px;

  font-weight: bold;
`;
const Space = styled.Text``;

const TotalText = styled.Text`
  font-size: 20px;
  font-weight: bold;
  margin-left: 20px;
`;
const TotalDetailText = styled.Text`
  margin-top: 10px;
  margin-left: 20px;
  font-weight: bold;
`;
const ShippingText = styled.Text`
  margin-left: 20px;
  color: gray;
`;

const ShowProducts = () => {
  return (
    <>
      {basketProducts.map(i => (
        <>
          <RowContainer key={i.productNm}>
            <Image
              style={{
                height: imageHeight,
                width: imageWidth,
                marginLeft: 10,
              }}
              resizeMode={'contain'}
              source={{
                uri: `http://61.100.16.155:8080${i.att}`,
              }}
            />
            <EachCheckBoxAndroid />
            <ColumnContainer>
              <ProductNameText>{i.name}</ProductNameText>
              <ProductDetailText>{i.description}</ProductDetailText>
              <ProductNutrientContainer>
                <ProductNutrientText>
                  칼로리
                  <ProductNutrientNumberText>
                    {i.calorie}kcal
                  </ProductNutrientNumberText>
                  <Space>{''}</Space>
                  탄수화물{' '}
                  <ProductNutrientNumberText>
                    {i.carb}g
                  </ProductNutrientNumberText>
                  <Space>{''}</Space>
                  단백질{''}
                  <ProductNutrientNumberText>
                    {i.protein}g{''}
                  </ProductNutrientNumberText>
                  <Space>{''}</Space>
                  지방{''}
                  <ProductNutrientNumberText>
                    {i.fat}g{''}
                  </ProductNutrientNumberText>
                </ProductNutrientText>
              </ProductNutrientContainer>
            </ColumnContainer>
          </RowContainer>
          <ProductPriceText>{i.price}원</ProductPriceText>
        </>
      ))}
    </>
  );
};

const OnBasket = ({navigation}) => {
  const isFocused = useIsFocused();
  const [data, setData] = useState([]);
  useEffect(() => {
    setData(basketProducts);
  }, []);
  console.log('basketProducts:', basketProducts);
  useEffect(() => {
    if (isFocused) console.log('focused');
  }, [isFocused]);

  return (
    <ScrollView>
      <SafeAreaView style={styles.wrapper}>
        <HeaderButtonContainer>
          <CheckBoxAndroid />
          <HeaderButtonText>전체 선택</HeaderButtonText>
          <PickDelete>
            <Text>선택 삭제</Text>
          </PickDelete>
        </HeaderButtonContainer>
        <DietContainer>
          <Text style={{marginLeft: 170, fontWeight: 'bold', marginBottom: 15}}>
            식단
          </Text>
          <NutrientsBar />
          <ScrollView>
            <DietProductContainer>
              <ShowProducts />
            </DietProductContainer>
          </ScrollView>
          <Text style={{textAlign: 'right'}}>합계: 00000원</Text>
        </DietContainer>
        <TotalContainer>
          <TotalText>존맛식품</TotalText>
          <TotalDetailText>식품: 8600원</TotalDetailText>
          <ShippingText>배송비:3,000원(10,000원 이상 무료배송)</ShippingText>
          <TotalText style={{marginTop: 20}}>맛있닭</TotalText>
          <TotalDetailText>식품: 5,700원</TotalDetailText>
          <ShippingText>배송비:2,500원(30,000원 이상 무료배송)</ShippingText>
        </TotalContainer>
        <OrderButton>
          <Text style={{color: 'white'}}>총 19800원 주문하기</Text>
        </OrderButton>
      </SafeAreaView>
    </ScrollView>
  );
};

export default OnBasket;
