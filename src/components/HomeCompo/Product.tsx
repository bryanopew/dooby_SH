import React, {Component, useState} from 'react';
import {
  Button,
  Text,
  StyleSheet,
  Pressable,
  Image,
  Dimensions,
  FlatList,
} from 'react-native';
import CategoryList from './Category';
import Styled from 'styled-components/native';
import {pFont, pText} from '~/styles/typography';

const products = [{
    image:'사진',
    name: '존맛식품',
    description: '상세정보', 
    price: '가격',
    nutrients:'칼로리, 탄수화물, 단백질, 지방'
}, {
    image:'사진',
    name: '존맛식품',
    description: '상세정보', 
    price: '가격',
    nutrients:'칼로리, 탄수화물, 단백질, 지방'
},{
    image:'사진',
    name: '존맛식품',
    description: '상세정보', 
    price: '가격',
    nutrients:'칼로리, 탄수화물, 단백질, 지방'
}]


const ProductContainer = Styled.View`
  
`
const ImageContainer = Styled.View`
  
`;
const ProductDetailContainer =Styled.View`
//name, detail, price
`
const ShowNutrientContainer = Styled.View` 

`

const Product = () => {
    return()
}

export default Product