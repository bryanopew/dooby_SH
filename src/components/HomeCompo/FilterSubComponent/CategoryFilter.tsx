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
} from 'react-native';
import styled from 'styled-components/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {useSelector, useDispatch} from 'react-redux';

import {clickFilter, fetchCategoryFilter} from '~/stores/slices/filterSlice';
const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: 'white',
  },
});
const CategoryListContainer = styled.View`
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 12px;
  margin-bottom: 12px;
  border-top-width: 0.5px;
  border-color: grey;
`;

const CategoryListText = styled.Text`
  margin-top: 12px;
  font-size: 15px;
  font-weight: bold;
`;

const FilterButtonContainer = styled.View`
  flex-direction: row;
  justify-content: center;
`;

// const ButtonContainer = styled.View`
//   flex: 1;
//   border: 0.5px grey;
//   border-radius: 10px;
//   align-items: center;
//   margin: 10px;
// `;
const StyledButton = styled.TouchableOpacity`
  align-items: center;
  flex: 1;
  padding: 15px;
  background-color: white;
  border-width: 1px;
  border-radius: 5px;
  margin: 10px;
  margin-top: 20px;
  border-color: #8f8f8f;
`;
const ButtonText = styled.Text`
  font-weight: bold;
  color: #8f8f8f;
`;
const CategoryListButton = styled.TouchableOpacity``;
const getRefreshToken = () => {
  let refreshToken = AsyncStorage.getItem('REFRESH_TOKEN');
  return refreshToken;
};

const CategoryFilter = ({navigation}): JSX.Element => {
  const [click, setClick] = useState();
  const dispatch = useDispatch();
  const content = useSelector((state: RootState) => {
    return state.filter.filterContents;
  });
  console.log('filtercontents:', content);
  const category = [
    {id: 1, text: '도시락'},
    {id: 2, text: '닭가슴살'},
    {id: 3, text: '샐러드'},
    {id: 4, text: '영양간식'},
    {id: 5, text: '과자'},
    {id: 6, text: '음료'},
  ];
  const [data, setData] = useState([]);
  const [boxData, setBoxData] = useState([]);
  const [breastData, setBreastData] = useState([]);
  const [saladData, setSaladData] = useState([]);
  const [snackData, setSnackData] = useState([]);
  const [chipData, setChipData] = useState([]);
  const [beverageData, setBeverageData] = useState([]);

  const getBoxData = () => {
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
        setBoxData(res.data);
      });
  };
  const onPress = i => {
    switch (i.id) {
      case 1:
        dispatch(fetchCategoryFilter());
        break;
      case 2:
        console.log('닭가슴살');
        break;
      case 3:
        console.log('샐러드');
        break;
      case 4:
        console.log('영양간식');
        break;
      case 5:
        console.log('과자');
        break;
      case 6:
        console.log('음료');
        break;
      default:
        return;
    }
  };
  return (
    <ScrollView style={styles.wrapper}>
      {category.map((i, index) => (
        <CategoryListButton key={i.id} onPress={() => onPress(i)}>
          <CategoryListContainer style={[index === 0 && {borderTopWidth: 0}]}>
            <CategoryListText>{i.text}</CategoryListText>
          </CategoryListContainer>
        </CategoryListButton>
      ))}
      <FilterButtonContainer>
        <StyledButton>
          <ButtonText>카테고리 초기화</ButtonText>
        </StyledButton>
        <StyledButton>
          <ButtonText>확인</ButtonText>
        </StyledButton>
      </FilterButtonContainer>
    </ScrollView>
  );
};

export default CategoryFilter;
