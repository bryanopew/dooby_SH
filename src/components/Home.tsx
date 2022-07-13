import React from 'react';
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
} from 'react-native';

import NutrientsBar from '~/Components/NutrientsBar/NutrientsBar';
import Category from '~/Components/HomeCompo/Category';
import Menus from '~/Components/HomeCompo/Menus';

import {StackNavigationProp} from '@react-navigation/stack';

import IconButton from '~/Components/IconButton';
import Styled from 'styled-components/native';

const HeaderRightContainer = Styled.View`
  flex-direction: row;
  justify-content: flex-start;
`;
const ProductContainer = Styled.View`
background: white;

`;
const ProductDetailContainer = Styled.Text`
margin-top: 20px;
margin-left:20px;

`;
const RowContainer = Styled.View`
flex-direction: row;
`;
const ProductNutrientContainer = Styled.View`
background: white;
`;
type NavigationProp = StackNavigationProp<HeaderTab, 'Header'>;
interface Props {
  navigation: NavigationProp;
}
const item = ['a', 'b', 'c', 'd', 'e', 'f'];
const dimensions = Dimensions.get('window');
const imageHeight = Math.round(dimensions.width / 3);
const imageWidth = dimensions.width / 3;
const products = [
  {
    image: '사진',
    name: '존맛식품1',
    description: '상세정보',
    price: '가격',
    nutrients: '칼로리, 탄수화물, 단백질, 지방',
  },
  {
    image: '사진',
    name: '존맛식품2',
    description: '상세정보',
    price: '가격',
    nutrients: '칼로리, 탄수화물, 단백질, 지방',
  },
  {
    image: '사진',
    name: '존맛식품3',
    description: '상세정보',
    price: '가격',
    nutrients: '칼로리, 탄수화물, 단백질, 지방',
  },
  {
    image: '사진',
    name: '존맛식품4',
    description: '상세정보',
    price: '가격',
    nutrients: '칼로리, 탄수화물, 단백질, 지방',
  },
  {
    image: '사진',
    name: '존맛식품5',
    description: '상세정보',
    price: '가격',
    nutrients: '칼로리, 탄수화물, 단백질, 지방',
  },
];

const Home = ({navigation}: Props) => {
  // React.useLayoutEffect(() => {
  //   navigation.setOptions({
  //     headerRight: () => (
  //       <HeaderRightContainer>
  //         <IconButton
  //           iconName="search"
  //           onPress={() => navigation.navigate('SearchTab')}
  //         />
  //       </HeaderRightContainer>
  //     ),
  //   });
  // }, []);
  return (
    <>
      <NutrientsBar />
      <FlatList
        style={{backgroundColor: 'blue'}}
        data={products}
        // style={{width}}
        keyExtractor={(products, index) => {
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
              <ProductDetailContainer>
                {item.name} {item.description}, {item.price}
              </ProductDetailContainer>
            </RowContainer>
            <ProductNutrientContainer>
              <Text>{item.nutrients}</Text>
            </ProductNutrientContainer>
          </ProductContainer>
        )}
      />
    </>
  );
};

export default Home;
