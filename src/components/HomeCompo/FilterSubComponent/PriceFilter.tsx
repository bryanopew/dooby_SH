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
    <>
      <SafeAreaView style={styles.wrapper}>
        <ScrollView>
          <SliderContainer caption="가격" sliderValue={[0, 10000]}>
            <Slider
              animateTransitions
              maximumTrackTintColor="#E5E5E5"
              maximumValue={10000}
              minimumTrackTintColor="#E5E5E5"
              minimumValue={0}
              step={50}
              thumbTintColor="white"
            />
          </SliderContainer>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

export default PriceFilter;
