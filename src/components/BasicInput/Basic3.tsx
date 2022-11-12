import React, {Component, useState, useEffect, useRef} from 'react';
import {
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  Button,
  Switch,
  Alert,
  TextInput,
  Pressable,
} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';

import AutoDo from '~/Components/TargetCal/AutoDo';
import Calcul from '../TargetCal/Calcul';
import Manual from '../TargetCal/Manual';
import {getNutrientInfo} from '../NutrientsBar/NutrientsBar';
import styled from 'styled-components/native';
import colors from '~/styles/stylesHS/colors';
import {BtnBottomCTA, BtnText} from '~/styles/stylesHS/styledConsts';

const Container = styled.SafeAreaView`
  flex: 1;
  background-color: ${colors.white};
  padding: 0px 16px 0px 16px;
`;

const TitleText = styled.Text`
  font-size: 24px;
  font-weight: bold;
  color: ${colors.textMain};
`;

const Basic3 = ({route, navigation}) => {
  const {info, target, conTarget} = route.params;
  const [clicked, setClicked] = useState({
    autoDoClicked: false,
    calculClicked: false,
    manualClicked: false,
  });
  const scrollRef = useRef();
  let isValid;
  const check = () => {
    if (
      clicked.autoDoClicked === false &&
      clicked.calculClicked === false &&
      clicked.manualClicked === false
    ) {
      return (isValid = false);
    } else {
      return (isValid = true);
    }
  };
  check();
  console.log(isValid);
  const storeData = async () => {
    try {
      await AsyncStorage.setItem('CLICKED', JSON.stringify(clicked));
    } catch (e) {
      console.log('error', e);
    }
  };
  return (
    <Container>
      <ScrollView
        contentContainerStyle={{paddingBottom: 120}}
        ref={scrollRef}
        showsVerticalScrollIndicator={false}>
        <TitleText>목표 섭취량을 {'\n'}입력해주세요</TitleText>
        <AutoDo
          info={info}
          target={target}
          conTarget={conTarget}
          clicked={clicked}
          setClicked={setClicked}
        />
        <Calcul
          info={info}
          conTarget={conTarget}
          clicked={clicked}
          setClicked={setClicked}
          scrollRef={scrollRef}
        />
        <Manual
          info={info}
          conTarget={conTarget}
          clicked={clicked}
          setClicked={setClicked}
          scrollRef={scrollRef}
        />
      </ScrollView>
      <BtnBottomCTA
        disabled={!isValid}
        btnStyle={isValid ? 'activated' : 'inactivated'}
        onPress={() => {
          navigation.reset({
            routes: [{name: 'MainTabs', params: {info}}],
          });
          storeData();
          getNutrientInfo();
        }}>
        <BtnText>완료</BtnText>
      </BtnBottomCTA>
    </Container>
  );
};

export default Basic3;
