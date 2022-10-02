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
import DropDownPicker from 'react-native-dropdown-picker';
import styled from 'styled-components/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {useIsFocused} from '@react-navigation/native';
import {useSelector, useDispatch} from 'react-redux';

import NutrientsBar from '~/components/NutrientsBar/NutrientsBar';
import CheckBoxAndroid from '~/Button/CheckBoxAndroid';
import {result} from '~/Components/Home';
import CheckBox from '@react-native-community/checkbox';
import Counter from '~/Components/BasketComponent/Counter';
import {increment, decrement} from '~/stores/slices/basketSlice';

// if (newNumbers.length >= 1) {
//   basketProducts = newNumbers.reduce(function (acc, cur) {
//     return acc.concat(cur);
//   });
// }

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
  margin-right: 100px
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

const Quantity = ({item}) => {
  const dispatch = useDispatch();
  return (
    <>
      <TouchableOpacity onPress={() => dispatch(decrement(item))}>
        <Text>-</Text>
      </TouchableOpacity>
      <Text>{item.quantity}</Text>
      <TouchableOpacity onPress={() => dispatch(increment(item))}>
        <Text>+</Text>
      </TouchableOpacity>
    </>
  );
};

const ShowProducts = () => {
  const content = useSelector((state: RootState) => {
    return state.addDiet.cartsArray;
  });
  const basketContent = useSelector((state: RootState) => {
    return state.basketProduct.cart;
  });
  console.log(basketContent);
  console.log('content:', content);
  if (content === undefined) {
    return (
      <>
        {basketContent.map(i => (
          <View key={i.productNm}>
            <RowContainer>
              <Image
                style={{
                  height: imageHeight,
                  width: imageWidth,
                  marginLeft: 10,
                  transform: [{scale: 0.8}],
                }}
                source={{
                  uri: `http://61.100.16.155:8080${i.att}`,
                }}
              />
              <EachCheckBoxAndroid />
              <ColumnContainer>
                <RowContainer>
                  <ProductNameText>{i.name}</ProductNameText>
                  <TouchableOpacity
                    style={{
                      position: 'absolute',
                      right: 50,
                    }}>
                    <Image
                      style={{
                        transform: [{scale: 0.55}],
                      }}
                      source={require('~/Assets/Images/24_searchCancel.png')}
                    />
                  </TouchableOpacity>
                </RowContainer>
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
            <RowContainer>
              <ProductPriceText>{i.price}원</ProductPriceText>
              <Quantity item={i} />
            </RowContainer>
          </View>
        ))}
      </>
    );
  } else
    return (
      <>
        {content.map(i => (
          <View key={i.productNm}>
            <RowContainer>
              <Image
                style={{
                  height: imageHeight,
                  width: imageWidth,
                  marginLeft: 10,
                  transform: [{scale: 0.8}],
                }}
                source={{
                  uri: `http://61.100.16.155:8080${i.att}`,
                }}
              />
              <EachCheckBoxAndroid />
              <ColumnContainer>
                <RowContainer>
                  <ProductNameText>{i.name}</ProductNameText>
                  <TouchableOpacity
                    style={{
                      position: 'absolute',
                      right: 50,
                    }}>
                    <Image
                      style={{
                        transform: [{scale: 0.55}],
                      }}
                      source={require('~/Assets/Images/24_searchCancel.png')}
                    />
                  </TouchableOpacity>
                </RowContainer>
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
            <RowContainer>
              <ProductPriceText>{i.price}원</ProductPriceText>
              <Quantity item={i} />
            </RowContainer>
          </View>
        ))}
      </>
    );
};

const SelectDietButton = () => {
  const [value, setValue] = useState();
  const [open, setOpen] = useState(false);
  const [state, setState] = useState(1);
  const [items, setItems] = useState([
    {label: '식단 1', value: 1},
    {label: '식단 2', value: 2},
  ]);
  return (
    <DropDownPicker
      selectedItemContainerStyle={{
        backgroundColor: 'blue',
      }}
      selectedItemLabelStyle={{
        fontWeight: 'bold',
      }}
      itemSeparator={false}
      itemSeparatorStyle={{
        backgroundColor: 'red',
      }}
      dropDownContainerStyle={{}}
      style={{
        borderColor: 'white',
      }}
      placeholder="식단1"
      open={open}
      setOpen={setOpen}
      value={value}
      items={items}
      onSelectItem={() => console.log('식단 선택!')}
      setValue={setValue}
      setItems={setItems}
      textStyle={{fontSize: 15}}
      listMode="SCROLLVIEW"
      dropDownDirection="BOTTOM"
    />
  );
};

const OnBasket = ({navigation}) => {
  const isFocused = useIsFocused();

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
          <SelectDietButton />
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
