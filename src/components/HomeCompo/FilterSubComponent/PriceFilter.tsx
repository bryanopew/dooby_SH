import React, {useState} from 'react';
import {SafeAreaView, ScrollView, Text, View, StyleSheet} from 'react-native';
import Styled from 'styled-components/native';

import {Slider} from './Slider/Slider';
import {SliderContainer} from './Slider/SliderContainer';

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: 'white',
  },
});

const PriceFilter = () => {
  return (
    <SafeAreaView>
      <SliderContainer
        caption="<Slider/> 2 thumbs, min, max, and custom tint"
        sliderValue={[6, 18]}>
        <Slider
          animateTransitions
          maximumTrackTintColor="red"
          maximumValue={20}
          minimumTrackTintColor="#1fb28a"
          minimumValue={4}
          step={2}
          thumbTintColor="#1a9274"
        />
      </SliderContainer>
    </SafeAreaView>
  );
};

export default PriceFilter;
