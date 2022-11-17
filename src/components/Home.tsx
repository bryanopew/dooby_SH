import React, {Component, useEffect, useState} from 'react';
import {
  Text,
  Dimensions,
  TouchableOpacity,
  FlatList,
  ScrollView,
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
import {BASE_URL, colors, PRODUCT_LIST} from '~/constants/constants';
import styled from 'styled-components/native';
import colorsHs from '~/styles/stylesHS/colors';
import AddDietButton from './HomeCompo/AddDietButton';
import {
  BtnCTA,
  BtnText,
  Col,
  HorizontalLine,
  HorizontalSpace,
  Row,
} from '~/styles/stylesHS/styledConsts';
import FoodList from '~/Components/HomeCompo/FoodList';

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

const FoodNoticeContainer = Styled.View`
  flex-direction: row;
  margin-top: 24px;
  background: white;
  justify-content: space-between;
`;

const SortButtonContainer = Styled.View`
flex-direction: row;
`;
const FoodNoticeText = Styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: ${colorsHs.textMain};
`;
const FilterMenuContainer = Styled.View`
  background: white;
  flex-direction: row;
  margin-top: 8px;
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
  const [testData, setTestData] = useState([]);
  const [boxData, setBoxData] = useState([]);
  const [breastData, setBreastData] = useState([]);
  const [saladData, setSaladData] = useState([]);
  const [snackData, setSnackData] = useState([]);
  const [chipData, setChipData] = useState([]);
  const [beverageData, setBeverageData] = useState([]);
  const [userToken, setUserToken] = useState('');
  // 제품이름(productNm) res.data.productNm
  // 플랫폼이름(platformNm) res.data.platformNm
  // 가격(price) res.data.price
  // 칼로리(calorie) res.data.calorie
  // 탄수화물(carb) res.data.carb
  // 단백질(protein) res.data.protein
  // 지방(fat) res.data.fat
  // 사진(mainAttUrl) res.data.mainAttUrl
  const getToken = async () => {
    let token = await AsyncStorage.getItem('ACCESS_TOKEN');
    console.log('getToken: ', token);
    return token;
  };
  const getRefreshToken = async () => {
    const refreshToken = await AsyncStorage.getItem('REFRESH_TOKEN');
    console.log('getToken: ', refreshToken);
    return refreshToken;
  };

  const getTestData = async () => {
    try {
      getToken()
        .then(refreshToken =>
          axios.get(`${PRODUCT_LIST}?searchText=도시락&categoryCd=&sort`, {
            headers: {
              authentication: `Bearer ${refreshToken}`,
            },
          }),
        )
        .then(res => setTestData(res.data.slice(0, 10)));
    } catch (e) {
      console.log('getTestData error: ', e);
    }
  };

  const onRefresh = () => {
    console.log('onRefresh');
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

  const filterOnRefresh = () => {
    setIsFetching(false);
    getRefreshToken()
      .then(refreshToken =>
        axios.get(
          `${BASE_URL}/api/member/product/list-product?searchText=도시락&categoryCd=CG001`,
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

  console.log(testData);
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
  console.log('Home: userToken: ', userToken);

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

      <FoodNoticeContainer>
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
      </FoodNoticeContainer>
      <HorizontalLine style={{marginTop: 8}} />

      <FilterMenuContainer>
        {filterMenus.map(i => (
          <BottomSheetTestScreen key={i.id} list={filterMenus}>
            {i.text}{' '}
          </BottomSheetTestScreen>
        ))}
      </FilterMenuContainer>

      <FlatList
        style={{marginTop: 24}}
        data={testData}
        renderItem={item => <FoodList item={item} />}
        ItemSeparatorComponent={() => <HorizontalSpace height={16} />}
        keyExtractor={item => item.productNo}
        showsVerticalScrollIndicator={false}
      />

      <BtnCTA
        btnStyle="activated"
        onPress={() => {
          getTestData();
        }}>
        <BtnText>테스트데이터</BtnText>
      </BtnCTA>
    </Container>
  );
};

export default Home;
