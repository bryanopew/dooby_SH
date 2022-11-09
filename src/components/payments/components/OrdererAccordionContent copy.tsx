import {View, Text, TextInput, Animated, TouchableOpacity} from 'react-native';
import React, {useRef, useState} from 'react';
import styled from 'styled-components/native';
import colors from '../colors';
import {
  AccordionContentContainer,
  HorizontalLine,
  Col,
  Row,
  TextMain,
  TextSub,
  InputContainer,
} from '../styledConsts';

const NameContainer = styled(InputContainer)`
  /* background-color: ${colors.highlight}; */
  padding-top: 24px;
`;
const UpperPlaceholder = styled(
  Animated.createAnimatedComponent(TouchableOpacity),
)`
  position: absolute;
  top: 0px;
  width: 100%;
  height: 58px;
  padding-top: 24px;
  z-index: 1;
`;
// animation -> height: 22 , padding-top: 0px

const UpperPlaceholderText = styled(Animated.createAnimatedComponent(Text))`
  font-size: 16px;
  color: ${props =>
    props.isFocused || props.isValid ? colors.main : colors.inActivated};
`;

const BottomLine = styled(HorizontalLine)`
  background-color: ${props =>
    props.isFocused || props.isValid != '' ? colors.main : colors.inActivated};
`;

const OrdererAccordionContent = () => {
  const componentRef = useRef([]);
  const [isFocused, setIsFocused] = useState([]);
  const [name, setName] = useState('');

  // height => fontSize, paddingTop 조절
  const heightForAni = useRef(new Animated.Value(58)).current;
  const fontSizeForAni = heightForAni.interpolate({
    inputRange: [22, 58],
    outputRange: [14, 16],
  });
  const paddingTopForAni = heightForAni.interpolate({
    inputRange: [22, 58],
    outputRange: [0, 24],
  });
  heightForAni.addListener(() => console.log('animated state: ', heightForAni));

  console.log('isFocused: ', isFocused);
  console.log('name: ', name);

  const onInputPress = () => {
    Animated.timing(heightForAni, {
      toValue: 22,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };
  const onInputBlur = () => {
    Animated.timing(heightForAni, {
      toValue: 58,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  return (
    <AccordionContentContainer>
      <NameContainer>
        <UpperPlaceholder
          onPress={() => {
            componentRef.current[0].focus();
            onInputPress();
          }}
          style={{height: heightForAni, paddingTop: paddingTopForAni}}>
          <UpperPlaceholderText
            isFocused={isFocused[0]}
            isValid={name}
            style={{fontSize: fontSizeForAni}}>
            이름
          </UpperPlaceholderText>
        </UpperPlaceholder>
        <TextInput
          value={name}
          onChangeText={setName}
          ref={comp => (componentRef?.current[0] = comp)}
          onFocus={() => {
            console.log('onFocus!');
            setIsFocused([true]);
          }}
          onBlur={async () => {
            console.log('onBlur!');
            setIsFocused([false]);
            if (name == '') {
              onInputBlur();
            }
          }}
        />
      </NameContainer>
      <BottomLine isFocused={isFocused[0]} isValid={name} />
    </AccordionContentContainer>
  );
};

export default OrdererAccordionContent;
