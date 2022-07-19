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
} from 'react-native';
import styled from 'styled-components/native';

const CategoryListContainer = styled.View`
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
  margin-bottom: 15px;
  border-top-width: 0.5px;
  border-color: grey;
`;

const CategoryListText = styled.Text`
  margin-top: 10px;
  font-size: 15px;
`;

const FilterButtonContainer = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;
const StyledButton = styled.Button`
  align-items: center;
  height: 2.25rem;
  font-size: 1rem;
  background: red;
`;
const CategoryFilter = (): JSX.Element => {
  const [click, setClick] = useState();
  const category = [
    {id: 1, text: '도시락'},
    {id: 2, text: '닭가슴살'},
    {id: 3, text: '샐러드'},
    {id: 4, text: '영양간식'},
    {id: 5, text: '과자'},
    {id: 6, text: '음료'},
  ];
  return (
    <>
      {category.map((i, index) => (
        <CategoryListContainer
          key={i.id}
          style={[index === 0 && {borderTopWidth: 0}]}>
          <CategoryListText>{i.text}</CategoryListText>
        </CategoryListContainer>
      ))}
      <FilterButtonContainer>
        <StyledButton title="카테고리 초기화" />
        <StyledButton title="확인" />
      </FilterButtonContainer>
    </>
  );
};

export default CategoryFilter;
