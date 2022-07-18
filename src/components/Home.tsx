import React, {Component} from 'react';
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

import NutrientsBar from '~/Components/NutrientsBar/NutrientsBar';
import Category from '~/Components/HomeCompo/Category';
import Menus from '~/Components/HomeCompo/Menus';
import BottomSheetTestScreen from '~/Components/HomeCompo/MenuFilter';

import {StackNavigationProp} from '@react-navigation/stack';

import IconButton from '~/Components/IconButton';

export class RoundButton extends Component {
  render() {
    return (
      <TouchableOpacity style={styles.button}>
        <Text style={styles.text}>+</Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#590DE1',
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: 25,
    height: 25,
    marginTop: 20,
    marginLeft: 100,
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
        marginHorizontal: 30,
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
  letter-spacing: 1px;
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
const products = [
  {
    name: '존맛식품1',
    description: '상세정보',
    price: '가격',
    nutrients: '1',
  },
  {
    name: '존맛식품2',
    description: '상세정보',
    price: '가격',
    nutrients: '1',
  },
  {
    name: '존맛식품3',
    description: '상세정보',
    price: '가격',
    nutrients: '1',
  },
  {
    name: '존맛식품4',
    description: '상세정보',
    price: '가격',
    nutrients: '1',
  },
  {
    name: '존맛식품5',
    description: '상세정보',
    price: '가격',
    nutrients: '1',
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

      <FoodNoticeContainer>
        <FoodNoticeText>전체 식품 {products.length}개</FoodNoticeText>
      </FoodNoticeContainer>
      <FilterMenuContainer>
        {filterMenus.map(i => (
          <BottomSheetTestScreen key={i.id} list={filterMenus}>
            {i.text}
          </BottomSheetTestScreen>
        ))}
      </FilterMenuContainer>
      <FlatList
        style={{backgroundColor: 'white'}}
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
              <ColumnContainer>
                <ProductNameText>{item.name}</ProductNameText>
                <ProductDetailText>{item.description}</ProductDetailText>
                <ProductPriceText>{item.price}</ProductPriceText>
              </ColumnContainer>
              <RoundButton />
            </RowContainer>
            <ProductNutrientContainer>
              <ProductNutrientText>
                칼로리: {item.nutrients}
                탄수화물 : {item.nutrients}
                단백질: {item.nutrients}
                지방: {item.nutrients}
              </ProductNutrientText>
            </ProductNutrientContainer>
          </ProductContainer>
        )}
      />
    </>
  );
};

export default Home;
