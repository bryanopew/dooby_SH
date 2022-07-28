import React, {useState} from 'react';
import {SafeAreaView, ScrollView, Text, View, StyleSheet} from 'react-native';
import Styled from 'styled-components/native';

import {Slider} from './Slider/Slider';
import {SliderContainer} from './Slider/SliderContainer';

const HeaderText = Styled.Text`
  font-weight: bold;
  font-size: 20px;
`;

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: 'white',
  },
});

const NutrientFilter = ({}) => {
  const [myValue, setMyValue] = useState(0);
  const [calorieValue, setCalorieValue] = useState(0);
  const [carbonValue, setCarbonValue] = useState(0);
  const [proteinValue, setProteinValue] = useState(0);

  return (
    <SafeAreaView style={styles.wrapper}>
      <ScrollView>
        <SliderContainer caption="칼로리" sliderValue={[0, 10000]}>
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
        <SliderContainer caption="탄수화물" sliderValue={[0, 100]}>
          <Slider
            animateTransitions
            maximumTrackTintColor="#E5E5E5"
            maximumValue={100}
            minimumTrackTintColor="#E5E5E5"
            minimumValue={0}
            step={10}
            thumbTintColor="white"
          />
        </SliderContainer>
        <SliderContainer caption="단백질" sliderValue={[0, 100]}>
          <Slider
            animateTransitions
            maximumTrackTintColor="#E5E5E5"
            maximumValue={100}
            minimumTrackTintColor="#E5E5E5"
            minimumValue={0}
            step={5}
            thumbTintColor="white"
          />
        </SliderContainer>
        <SliderContainer caption="지방" sliderValue={[0, 100]}>
          <Slider
            animateTransitions
            maximumTrackTintColor="#E5E5E5"
            maximumValue={100}
            minimumTrackTintColor="#E5E5E5"
            minimumValue={0}
            step={2}
            thumbTintColor="white"
          />
        </SliderContainer>
      </ScrollView>
    </SafeAreaView>
  );
};

export default NutrientFilter;
