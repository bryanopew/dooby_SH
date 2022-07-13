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

const item = ['a', 'b', 'c', 'd', 'e', 'f'];
const ImageContainer = Styled.TouchableHighlight`
  background: #FEFFFF;
  padding: 1px;
`;
const HeaderContainer = Styled.View`

`;
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
  background: white;
  flex-direction: row;
  
`;

const FilterText = Styled.Text`
  margin-left: 10px;
`;

const ShowMenuContainer = Styled.View`

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
        <FilterText>카테고리</FilterText>
        <FilterText>영양성분</FilterText>
        <FilterText>가격</FilterText>
        <FilterText>식단구성</FilterText>
      </FilterMenuContainer>
      <FlatList
        data={item}
        style={{width}}
        keyExtractor={(item, index) => {
          return `menus-${index}`;
        }}
        showsVerticalScrollIndicator={false}
        scrollEnabled={scrollEnabled}
        bounces={bounces}
        onRefresh={onRefresh}
        onEndReached={onEndReached}
        // onEndReached={() => {
        //   setMenuList([...menuList, ...getmenuList()]);
        // }}
        onEndReachedThreshold={0.5}
        refreshing={loading}
        // ListHeaderComponent={<CategoryList />}
        renderItem={({item, index}) => (
          <ImageContainer
            style={{
              paddingLeft: index % 3 === 0 ? 0 : 1,
              paddingRight: index % 3 === 2 ? 0 : 1,
            }}
            onPress={onPress}>
            <Text>메인</Text>
          </ImageContainer>
        )}
      />
    </>
  );
};

export default Menus;
