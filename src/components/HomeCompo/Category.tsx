import React from 'react';
import {FlatList} from 'react-native';

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

const item = ['전체', '도시락', '샐러드', '고기', '바/과자', '음료'];

const CategoryList = () => {
  return (
    <FlatList
      data={item}
      horizontal={true}
      showsHorizontalScrollIndicator={true}
      keyExtractor={(item, index) => {
        return `category-${index}`;
      }}
      renderItem={({item, index}) => (
        <CategoryContainer>
          <CategoryName numberOfLines={1}>{item}</CategoryName>
        </CategoryContainer>
      )}
    />
  );
};

export default CategoryList;
