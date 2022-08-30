import React from 'react';
import {Text, Button, TouchableOpacity} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import styled from 'styled-components/native';

import {RootState} from '~/stores/store';
import {down, init, up} from '~/stores/slices/counterSlice';

const Counter = () => {
  const dispatch = useDispatch();
  const count = useSelector((state: RootState) => {
    return state.counter.value;
  });
  const addNumber = () => {
    dispatch(up(1));
  };
  const minusNumber = () => {
    dispatch(down(1));
  };
  const initNumber = () => {
    dispatch(init(''));
  };
  return (
    <>
      <TouchableOpacity onPress={minusNumber}>
        <Text>-</Text>
      </TouchableOpacity>
      <Text>{count}</Text>
      <TouchableOpacity onPress={addNumber}>
        <Text>+</Text>
      </TouchableOpacity>
      {/* <TouchableOpacity onPress={initNumber}>
        <Text>초기화</Text>
      </TouchableOpacity> */}
    </>
  );
};

export default Counter;
