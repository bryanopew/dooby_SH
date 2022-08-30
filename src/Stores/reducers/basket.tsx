import React from 'react';
import {Text, Button, TouchableOpacity} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import styled from 'styled-components/native';

import {RootState} from '~/stores/store';
import {add, remove} from '~/stores/slices/basketSlice';

const BasketProductRedcuer = () => {
  const dispatch = useDispatch();
  const basketProduct = useSelector((state: RootState) => {
    return state.basketProduct.value;
  });
  const addBasket = () => {
    dispatch();
  };
  const removeBasket = () => {
    dispatch();
  };

  return <></>;
};
