import React, {Component, useEffect, useState} from 'react';
import {
  FlatList,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Button,
  Image,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import Styled from 'styled-components/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {useSelector, useDispatch} from 'react-redux';

import NutrientsBar from '~/Components/NutrientsBar/NutrientsBar';
import Category from '~/Components/HomeCompo/Category';
import Menus from '~/Components/HomeCompo/Menus';
import BottomSheetTestScreen from '~/Components/HomeCompo/MenuFilter';
import SortModal from './HomeCompo/SortModal';

import {RootState} from '~/stores/store';
import {add, remove} from '~/stores/slices/basketSlice';

import {StackNavigationProp} from '@react-navigation/stack';

import IconButton from '~/Components/IconButton';

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

const FoodNoticeContainer = Styled.View`
  background: white;
  justify-content: center;
  border-bottom-width: 1px;
  border-bottom-color: grey;
`;
const FoodNoticeText = Styled.Text`
  margin-left: 10px;
  font-weight: bold;
  font-size: 18px;
  margin-bottom: 10px;
`;
const FilterMenuContainer = Styled.View`
  background: white;
  flex-direction: row;
  margin-top: 10px;
  margin-left: 10px;
`;
const FilterText = Styled.Text`
  margin-left: 10px;
`;
const ProductContainer = Styled.View`
background: white;

`;
const RowContainer = Styled.View`
flex-direction: row;
`;
const ColumnContainer = Styled.View`
flex-direction: column;
`;
const ProductNutrientContainer = Styled.View`
background: #F0F0F0;
border-radius: 5px;
left: 9px;
width: 380px;
height: 22px;
padding-left: 5px;
`;
const ProductNutrientText = Styled.Text`
  `;
const ProductNutrientNumberText = Styled.Text`
    font-weight: bold;
  `;
const ProductNameText = Styled.Text`
  font-weight: bold;
  padding: 17px;
`;
const ProductDetailText = Styled.Text`
  justify-content: center;
  margin-left: 15px;
`;
const ProductPriceText = Styled.Text`
padding: 20px;
font-weight: bold;
`;
const SortButtonContainer = Styled.View`
margin-left: 150px;
flex-direction: row;

`;
const Space = Styled.Text`

`;
const filterMenus = [
  {id: 1, text: '카테고리'},
  {id: 2, text: '영양성분'},
  {id: 3, text: '가격'},
  {id: 4, text: '식단구성'},
];

type NavigationProp = StackNavigationProp<HeaderTab, 'Header'>;
interface Props {
  navigation: NavigationProp;
}

const dimensions = Dimensions.get('window');
const imageHeight = Math.round(dimensions.width / 3);
const imageWidth = dimensions.width / 3;

// export const selectedProducts: Array<{}> = [];

// const AddProductButton = ({item}) => {
//   return (
//     <TouchableOpacity
//       style={styles.button}
//       onPress={() => {
//         selectedProducts.push(item);
//         console.log('ss', selectedProducts);
//       }}>
//       <Text style={styles.text}>+</Text>
//     </TouchableOpacity>
//   );
// };

export let result = [];
const AddProductButton = ({item}) => {
  const dispatch = useDispatch();
  const content = useSelector((state: RootState) => {
    return state.basketProduct.value;
  });
  const addProduct = () => {
    dispatch(add(item));
  };

  const [datas, setDatas] = useState([]);
  result = datas;

  return (
    <TouchableOpacity style={styles.button} onPress={addProduct}>
      <Text style={styles.text}>+</Text>
    </TouchableOpacity>
  );
};

// const MinusProductButton = ({item}) => {
//   return (
//     <TouchableOpacity
//       style={styles.button}
//       onPress={() => {
//         selectedProducts.filter(list => list.toString() === item.toString());
//         console.log(item);
//         console.log(selectedProducts);
//       }}>
//       <Text style={styles.text}>-</Text>
//     </TouchableOpacity>
//   );
// };

const Home = ({navigation, route}: Props) => {
  const [data, setData] = useState([]);
  // 제품이름(productNm) res.data.productNm
  // 플랫폼이름(platformNm) res.data.platformNm
  // 가격(price) res.data.price
  // 칼로리(calorie) res.data.calorie
  // 탄수화물(carb) res.data.carb
  // 단백질(protein) res.data.protein
  // 지방(fat) res.data.fat
  // 사진(mainAttUrl) res.data.mainAttUrl

  const getToken = () => {
    let token = AsyncStorage.getItem('ACCESS_TOKEN');
    return token;
  };
  const getRefreshToken = () => {
    let refreshToken = AsyncStorage.getItem('REFRESH_TOKEN');
    return refreshToken;
  };
  // useEffect(() => {
  //   getToken()
  //     .then(token =>
  //       axios.get(
  //         'http://61.100.16.155:8080/api/member/product/list-product?searchText=&categoryCd',
  //         {
  //           headers: {
  //             Authentication: `Bearer ${token}`,
  //           },
  //         },
  //       ),
  //     )
  //     .then(res => {
  //       setData(res.data);
  //     });
  // }, []);
  useEffect(() => {
    getRefreshToken()
      .then(refreshToken =>
        axios.get(
          'http://61.100.16.155:8080/api/member/product/list-product?searchText=&categoryCd',
          {
            headers: {
              Authentication: `Bearer ${refreshToken}`,
            },
          },
        ),
      )
      .then(res => {
        setData(res.data);
      });
  }, []);

  const realProduct = data.map(value => {
    let returnObj = {};
    returnObj.name = value.platformNm;
    returnObj.description = value.productNm;
    returnObj.price = value.price;
    returnObj.calorie = Math.round(value.calorie);
    returnObj.carb = Math.round(value.carb);
    returnObj.protein = Math.round(value.protein);
    returnObj.fat = Math.round(value.fat);
    returnObj.att = value.mainAttUrl;
    returnObj.productNo = value.productNo;
    returnObj.shippingPrice = value.shippingPrice;
    return returnObj;
  });

  return (
    <SafeAreaView style={styles.wrapper}>
      <NutrientsBar />

      <FoodNoticeContainer>
        <RowContainer>
          <FoodNoticeText>전체 식품 {realProduct.length}개</FoodNoticeText>
          <SortButtonContainer>
            <SortModal />
          </SortButtonContainer>
        </RowContainer>
      </FoodNoticeContainer>
      <FilterMenuContainer>
        {filterMenus.map(i => (
          <BottomSheetTestScreen key={i.id} list={filterMenus}>
            {i.text}
          </BottomSheetTestScreen>
        ))}
      </FilterMenuContainer>
      <FlatList
        style={{backgroundColor: 'white', marginTop: 20}}
        data={realProduct}
        // style={{width}}
        keyExtractor={(products, index) => {
          return `menus-${index}`;
        }}
        showsVerticalScrollIndicator={false}
        bounces={true}
        windowSize={2}
        // onRefresh={onRefresh}
        // onEndReached={() => {
        //   setMenuList([...menuList, ...getmenuList()]);
        // }}
        onEndReachedThreshold={0.5}
        refreshing={true}
        renderItem={({item, index}) => (
          <ProductContainer>
            <RowContainer>
              <Image
                style={{
                  height: imageHeight,
                  width: imageWidth,
                  marginLeft: 10,
                }}
                resizeMode={'contain'}
                source={{
                  uri: `http://61.100.16.155:8080${item.att}`,
                }}
              />
              <ColumnContainer>
                <ProductNameText>{item.name}</ProductNameText>
                <ProductDetailText>{item.description}</ProductDetailText>
                <ProductPriceText>{item.price}원</ProductPriceText>
              </ColumnContainer>
              <AddProductButton
                item={[
                  {
                    name: item.name,
                    price: item.price,
                    description: item.description,
                    calorie: item.calorie,
                    carb: item.carb,
                    protein: item.protein,
                    fat: item.fat,
                    att: item.att,
                    productNm: item.productNo,
                  },
                ]}
              />
            </RowContainer>
            <ProductNutrientContainer>
              <ProductNutrientText>
                칼로리
                <ProductNutrientNumberText>
                  {Math.round(item.calorie)}kcal
                </ProductNutrientNumberText>
                <Space>{'    '}</Space>
                탄수화물{' '}
                <ProductNutrientNumberText>
                  {Math.round(item.carb)}g
                </ProductNutrientNumberText>
                <Space>{'    '}</Space>
                단백질{' '}
                <ProductNutrientNumberText>
                  {Math.round(item.protein)}g
                </ProductNutrientNumberText>
                <Space>{'    '}</Space>
                지방{' '}
                <ProductNutrientNumberText>
                  {Math.round(item.fat)}g
                </ProductNutrientNumberText>
              </ProductNutrientText>
            </ProductNutrientContainer>
          </ProductContainer>
        )}
      />
    </SafeAreaView>
  );
};

export default Home;
