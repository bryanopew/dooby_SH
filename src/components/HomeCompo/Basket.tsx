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
import Styled from 'styled-components/native';

const CategoryListContainer = Styled.View`
  flex-direction: column;
`;

const CategoryFilter = (): JSX.Element => {
  const [open, setOpen] = useState();
  const category = [
    {id: 1, text: '도시락'},
    {id: 2, text: '닭가슴살'},
    {id: 3, text: '샐러드'},
    {id: 4, text: '영양간식'},
    {id: 5, text: '과자'},
    {id: 6, text: '음료'},
    {id: 7, text: '음료'},
    {id: 8, text: '음료'},
  ];
  return (
    <>
      {category.map(i => (
        <CategoryListContainer>
          <Text>{i.text}</Text>
        </CategoryListContainer>
      ))}
    </>
  );
};

export default CategoryFilter;
