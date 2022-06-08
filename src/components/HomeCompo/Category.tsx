import React from 'react';
import { FlatList } from 'react-native';

import Styled from 'styled-components/native';

const CategoryContainer = Styled.View`
  padding: 8px;
  width: 72px;
`;

const CategoryName = Styled.Text`
  width: 100%;
  text-align: center;
  font-weight: bold;
`;

const item =["도시락", "닭가슴살", "다양하게", "테스트","해봅시다", "어디까지","움직이는지"]

const CategoryList = () => {
  return (
    <FlatList
      data={item}
      horizontal={true}
      showsHorizontalScrollIndicator={false}
      keyExtractor={(item, index) => {
        return `category-${index}`;
      }}
      renderItem={({ item, index }) => (
        <CategoryContainer>
          <CategoryName numberOfLines={1}>{item}</CategoryName>
        </CategoryContainer>
      )}
    />
  );
};

export default CategoryList;
