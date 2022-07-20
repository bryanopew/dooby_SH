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
const CategoryFilter = ({navigation}): JSX.Element => {
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
    <ScrollView style={styles.wrapper}>
      {category.map((i, index) => (
        <CategoryListButton key={i.id}>
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
