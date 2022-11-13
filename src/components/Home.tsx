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
import DropDownPicker from 'react-native-dropdown-picker';

import NutrientsBar from '~/Components/NutrientsBar/NutrientsBar';
import Category from '~/Components/HomeCompo/Category';
import Menus from '~/Components/HomeCompo/Menus';
import BottomSheetTestScreen from '~/Components/HomeCompo/MenuFilter';
import SortModal from './HomeCompo/SortModal';
import {clickFilter, fetchCategoryFilter} from '~/stores/slices/filterSlice';

import {RootState} from '~/stores/store';
import {
  add,
  remove,
  removeAll,
  checkCurrentPage,
} from '~/stores/slices/basketSlice';
import {
  addNutrient,
  removeNutrient,
  cleanCalorieBar,
} from '~/stores/slices/calorieBarSlice';
import SearchBar from './HomeCompo/SearchBar';
import {
  addCart,
  removeCart,
  selectCart,
  selectAddProduct,
  addToCartsArray,
  selectRemoveProduct,
} from '~/stores/slices/addDietSlice';

import {StackNavigationProp} from '@react-navigation/stack';
import {colors} from '~/constants/constants';
import styled from 'styled-components/native';
import colorsHs from '~/styles/stylesHS/colors';
import AddDietButton from './HomeCompo/AddDietButton';
import {Col, Row} from '~/styles/stylesHS/styledConsts';

const Container = styled.SafeAreaView`
  flex: 1;
  background-color: ${colorsHs.white};
  padding: 0px 16px 0px 16px;
`;

const HeaderContainer = styled.View`
  flex-direction: row;
  width: 100%;
  height: 48px;
  align-items: center;
`;

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: 'white',
  },
  button: {
    right: 10,
    position: 'absolute',
    backgroundColor: colors.main,
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

  clickButton: {
    right: 10,
    position: 'absolute',
    backgroundColor: '#D4D4D4',
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
  clickText: {
    fontSize: 18,
    textAlign: 'center',
    color: 'white',
  },
  iconStyle: {
    height: 100,
    width: 200,
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
background: ${colors.line};
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

const AddDietButtonContainer = Styled.View`
  width: 30%;
  /* background-color: ${colorsHs.highlight}; */
`;

const AddDietButtonText = Styled.Text`
  font-weight: bold;
  font-size: 18px;
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

const AddProductButton = ({item, data}) => {
  const dispatch = useDispatch();
  const [click, setClick] = useState(false);
  const content = useSelector((state: RootState) => {
    return state.basketProduct.cart;
  });
  const cartsArray = useSelector((state: RootState) => {
    return state.addDiet.cartsArray;
  });
  const selectedCart = useSelector((state: RootState) => {
    return state.addDiet.selected;
  });
  const cartPage = useSelector((state: RootState) => {
    return state.addDiet.selectedCartPage;
  });

  const refreshMenu = () => {
    setClick(false);
  };
  useEffect(() => {
    refreshMenu();
  }, [data]);

  const basketCalorie = item.map(i => {
    return i.calorie;
  });
  const basketCarb = item.map(i => {
    return i.carb;
  });
  const basketProtein = item.map(i => {
    return i.protein;
  });
  const basketFat = item.map(i => {
    return i.fat;
  });
  const basketNutrients = [basketCalorie, basketCarb, basketProtein, basketFat];
  const addProduct = () => {
    dispatch(add(item));
  };
  const selectDietAddProduct = () => {
    dispatch(selectAddProduct(item[0]));
  };
  const plusProduct = () => {
    //마지막 식단이 선택되었을때
    if (selectedCart.length === 0 && cartPage - 1 === cartsArray.length) {
      return addProduct();
    } else {
      selectDietAddProduct();
      dispatch(addToCartsArray(cartPage));
    }
    // if (selectedCart.length === 0) {
    //   return addProduct();
    // } else {
    //   selectDietAddProduct();
    //   dispatch(addToCartsArray(cartPage));
    // }
  };
  const removeProduct = () => {
    if (selectedCart.length === 0) {
      return dispatch(remove(item));
    } else {
      dispatch(removeCart(item));
    }
  };
  const removeCalorie = () => {
    dispatch(removeNutrient(basketNutrients));
  };
  const addCalorie = () => {
    dispatch(addNutrient(basketNutrients));
  };

  if (click) {
    return (
      <>
        <TouchableOpacity
          style={click ? styles.clickButton : styles.button}
          onPress={() => {
            removeProduct();
            removeCalorie();
            setClick(!click);
            dispatch(selectRemoveProduct(item[0].productNm));
          }}>
          <Text style={click ? styles.clickText : styles.text}>-</Text>
        </TouchableOpacity>
      </>
    );
  }
  return (
    <TouchableOpacity
      style={click ? styles.clickButton : styles.button}
      onPress={() => {
        plusProduct();
        addCalorie();
        setClick(!click);
      }}>
      <Text style={click ? styles.clickText : styles.text}>+</Text>
    </TouchableOpacity>
  );
};

const Home = ({navigation, route}: Props) => {
  const [data, setData] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [boxData, setBoxData] = useState([]);
  const [breastData, setBreastData] = useState([]);
  const [saladData, setSaladData] = useState([]);
  const [snackData, setSnackData] = useState([]);
  const [chipData, setChipData] = useState([]);
  const [beverageData, setBeverageData] = useState([]);
  // 제품이름(productNm) res.data.productNm
  // 플랫폼이름(platformNm) res.data.platformNm
  // 가격(price) res.data.price
  // 칼로리(calorie) res.data.calorie
  // 탄수화물(carb) res.data.carb
  // 단백질(protein) res.data.protein
  // 지방(fat) res.data.fat
  // 사진(mainAttUrl) res.data.mainAttUrl
  const dispatch = useDispatch();
  const getToken = () => {
    let token = AsyncStorage.getItem('ACCESS_TOKEN');
    return token;
  };
  const getRefreshToken = () => {
    let refreshToken = AsyncStorage.getItem('REFRESH_TOKEN');
    return refreshToken;
  };
  const onCategoryFilter = useSelector((state: RootState) => {
    return state.filter.filterContents;
  });
  const getfilterList = useSelector((state: RootState) => {
    return state.filter.filterList;
  });
  const filterList = getfilterList.map(e => {
    return {text: e.text, clicked: e.clicked};
  });
  let realFilterData: any = [];
  const getFilterProduct = filterList.map(e => {
    return e.clicked === true ? [...realFilterData, e.text] : realFilterData;
  });

  const getBoxData = () => {
    getRefreshToken()
      .then(refreshToken =>
        axios.get(
          'http://13.125.244.117:8080/api/member/product/list-product?searchText=도시락&categoryCd=&sort',
          {
            headers: {
              Authentication: `Bearer ${refreshToken}`,
            },
          },
        ),
      )
      .then(res => {
        setBoxData(res.data);
      });
  };
  const getBreastData = () => {
    getRefreshToken()
      .then(refreshToken =>
        axios.get(
          'http://61.100.16.155:8080/api/member/product/list-product?searchText=닭가슴살&categoryCd=&sort',
          {
            headers: {
              Authentication: `Bearer ${refreshToken}`,
            },
          },
        ),
      )
      .then(res => {
        setBreastData(res.data);
      });
  };
  const getSaladData = () => {
    getRefreshToken()
      .then(refreshToken =>
        axios.get(
          'http://61.100.16.155:8080/api/member/product/list-product?searchText=샐러드&categoryCd=&sort',
          {
            headers: {
              Authentication: `Bearer ${refreshToken}`,
            },
          },
        ),
      )
      .then(res => {
        setSaladData(res.data);
      });
  };
  const getSnackData = () => {
    getRefreshToken()
      .then(refreshToken =>
        axios.get(
          'http://61.100.16.155:8080/api/member/product/list-product?searchText=영양간식&categoryCd=&sort',
          {
            headers: {
              Authentication: `Bearer ${refreshToken}`,
            },
          },
        ),
      )
      .then(res => {
        setSnackData(res.data);
      });
  };
  const getChipData = () => {
    getRefreshToken()
      .then(refreshToken =>
        axios.get(
          'http://61.100.16.155:8080/api/member/product/list-product?searchText=과자&categoryCd=&sort',
          {
            headers: {
              Authentication: `Bearer ${refreshToken}`,
            },
          },
        ),
      )
      .then(res => {
        setChipData(res.data);
      });
  };
  const getBeverageData = () => {
    getRefreshToken()
      .then(refreshToken =>
        axios.get(
          'http://61.100.16.155:8080/api/member/product/list-product?searchText=음료&categoryCd=&sort',
          {
            headers: {
              Authentication: `Bearer ${refreshToken}`,
            },
          },
        ),
      )
      .then(res => {
        setBeverageData(res.data);
      });
  };
  useEffect(() => {
    getBoxData();
    getBreastData();
    getSaladData();
    getSnackData();
    getChipData();
    getBeverageData();
  }, []);

  useEffect(() => {
    getRefreshToken()
      .then(refreshToken =>
        axios.get(
          'http://61.100.16.155:8080/api/member/product/list-product?searchText=&categoryCd=&sort',
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
  const onRefresh = () => {
    setIsFetching(false);
    getRefreshToken()
      .then(refreshToken =>
        axios.get(
          'http://61.100.16.155:8080/api/member/product/list-product?searchText=&categoryCd=&sort',
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
  };
  const filterOnRefresh = () => {
    setIsFetching(false);
    getRefreshToken()
      .then(refreshToken =>
        axios.get(
          'http://61.100.16.155:8080/api/member/product/list-product?searchText=도시락&categoryCd=&sort',
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
  };
  //전체 식품
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
    returnObj.quantity = value.quantity;
    return returnObj;
  });
  //리스트
  const boxProduct = boxData?.map(value => {
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
    returnObj.quantity = value.quantity;
    return returnObj;
  });
  const breastProduct = breastData?.map(value => {
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
    returnObj.quantity = value.quantity;
    return returnObj;
  });
  const saladProduct = saladData?.map(value => {
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
    returnObj.quantity = value.quantity;
    return returnObj;
  });
  const snackProduct = snackData?.map(value => {
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
    returnObj.quantity = value.quantity;
    return returnObj;
  });
  const chipProduct = chipData?.map(value => {
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
    returnObj.quantity = value.quantity;
    return returnObj;
  });
  const beverageProduct = beverageData?.map(value => {
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
    returnObj.quantity = value.quantity;
    return returnObj;
  });
  const filterProduct = [
    boxProduct,
    breastProduct,
    saladProduct,
    snackProduct,
    chipProduct,
    beverageProduct,
  ];
  let filterListArray = [];
  //! 여기다가 제품 순서에 맞는 아이템 넣어야함
  const realFilterProduct = getFilterProduct.map((e, index) => {
    return e.length > 0 ? (filterListArray = filterProduct[index]) : [];
  });

  const mergeFilterProduct = [].concat.apply([], realFilterProduct);
  const RenderItem = () => {
    if (mergeFilterProduct.length > 0) {
      return (
        <FlatList
          style={{backgroundColor: 'white', marginTop: 20}}
          data={mergeFilterProduct}
          // style={{width}}
          keyExtractor={(products, index) => {
            return `menus-${index}`;
          }}
          showsVerticalScrollIndicator={false}
          bounces={true}
          windowSize={2}
          onRefresh={filterOnRefresh}
          // onEndReached={() => {
          //   setMenuList([...menuList, ...getmenuList()]);
          // }}
          onEndReachedThreshold={0.5}
          refreshing={isFetching}
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
                  data={mergeFilterProduct}
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
                      quantity: 1,
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
      );
    } else
      return (
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
          onRefresh={onRefresh}
          // onEndReached={() => {
          //   setMenuList([...menuList, ...getmenuList()]);
          // }}
          onEndReachedThreshold={0.5}
          refreshing={isFetching}
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
                  data={data}
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
                      quantity: 1,
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
      );
  };
  return (
    <Container>
      <HeaderContainer>
        <Col style={{flex: 1.1}}>
          <AddDietButton onRefresh={onRefresh} />
        </Col>
        <Col style={{flex: 3}}>
          <SearchBar />
        </Col>
      </HeaderContainer>

      <NutrientsBar />
      {/* <Col style={{flex: 1, backgroundColor: colorsHs.warning}}></Col> */}
      {/* <HeaderContainer>
        <Row style={{width: '100%'}}>
          <AddDietButton onRefresh={onRefresh} />
          <SearchBar />
        </Row>
      </HeaderContainer>
      <NutrientsBar />

      <FoodNoticeContainer>
        <RowContainer>
          {mergeFilterProduct.length > 0 ? (
            <FoodNoticeText>
              검색 결과 {mergeFilterProduct.length}{' '}
            </FoodNoticeText>
          ) : (
            <FoodNoticeText>전체 식품 {realProduct.length}</FoodNoticeText>
          )}

          <SortButtonContainer>
            <SortModal />
          </SortButtonContainer>
        </RowContainer>
      </FoodNoticeContainer>
      <FilterMenuContainer>
        {filterMenus.map(i => (
          <BottomSheetTestScreen key={i.id} list={filterMenus}>
            {i.text}{' '}
          </BottomSheetTestScreen>
        ))}
      </FilterMenuContainer>

      <RenderItem /> */}
    </Container>
  );
};

export default Home;
