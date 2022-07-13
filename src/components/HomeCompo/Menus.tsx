import React, {Component, useState} from 'react';
import {
  Button,
  Text,
  StyleSheet,
  Pressable,
  Image,
  Dimensions,
  FlatList,
} from 'react-native';
import CategoryList from './Category';
import Styled from 'styled-components/native';
import {pFont, pText} from '~/styles/typography';

const item = ['a', 'b', 'c', 'd', 'e', 'f'];

const FoodNoticeContainer = Styled.View`
  background: white;
  justify-content: center;
  margin-top:10px;
  border-bottom-width: 1px;
  border-bottom-color: grey;
`;

const FoodNoticeText = Styled.Text`
  margin-left: 10px;
  font-weight: bold;
  font-size: 20px;
`;
const FilterMenuContainer = Styled.View`
  background: green;
  flex-direction: row;
  
`;

const FilterText = Styled.Text`
  margin-left: 10px;
`;

const products = [
  {
    image: '사진',
    name: '존맛식품',
    description: '상세정보',
    price: '가격',
    nutrients: '칼로리, 탄수화물, 단백질, 지방',
  },
  {
    image: '사진',
    name: '존맛식품',
    description: '상세정보',
    price: '가격',
    nutrients: '칼로리, 탄수화물, 단백질, 지방',
  },
  {
    image: '사진',
    name: '존맛식품',
    description: '상세정보',
    price: '가격',
    nutrients: '칼로리, 탄수화물, 단백질, 지방',
  },
];

const ProductContainer = Styled.View`
background: red;
`;
const ShowMenuContainer = Styled.View`
background: yellow;
`;
const ImageContainer = Styled.View`

`;
const ProductDetailContainer = Styled.View`
//name, detail, price
`;
const ShowNutrientContainer = Styled.View` 

`;

interface Props {
  id?: number;
  bounces?: boolean;
  scrollEnabled?: boolean;
  loading?: boolean;
  onRefresh?: () => void;
  onEndReached?: () => void;
  onScroll?: (event) => void;
  onPress?: () => void;
}
const filterMenus = [
  {id: 1, text: '카테고리'},
  {id: 2, text: '영양성분'},
  {id: 3, text: '가격'},
  {id: 4, text: '식단구성'},
];

const Menus = ({
  id,
  bounces = true,
  scrollEnabled = true,
  loading,
  onRefresh,
  onEndReached,
  onScroll,
  onPress,
}: Props) => {
  const width = Dimensions.get('window').width;
  const imageWidth = width / 3;

  return (
    <>
      <FoodNoticeContainer>
        <FoodNoticeText>전체 식품</FoodNoticeText>
      </FoodNoticeContainer>
      <FilterMenuContainer>
        {filterMenus.map(i => (
          <FilterText key={i.id}>{i.text}</FilterText>
        ))}
      </FilterMenuContainer>
      <FlatList
        data={item}
        // style={{width}}
        keyExtractor={(item, index) => {
          return `menus-${index}`;
        }}
        // showsVerticalScrollIndicator={false}
        // scrollEnabled={scrollEnabled}
        // bounces={bounces}
        // onRefresh={onRefresh}
        // onEndReached={onEndReached}
        // onEndReached={() => {
        //   setMenuList([...menuList, ...getmenuList()]);
        // }}
        // onEndReachedThreshold={0.5}
        // refreshing={loading}
        // ListHeaderComponent={<CategoryList />}
        renderItem={({item, index}) => (
          <ProductContainer>
            <Text>메인</Text>
          </ProductContainer>
        )}
      />
    </>
  );
};

export default Menus;
