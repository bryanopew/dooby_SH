import {
  View,
  Text,
  Animated,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
} from "react-native";
import React, { useState, useRef } from "react";
import styled from "styled-components/native";
import colors from "../colors";
import {
  AccordionContentContainer,
  HorizontalLine,
  Col,
  Row,
  TextMain,
  TextSub,
  InputContainer,
} from "../styledConsts";

const UpperPlaceholder = styled(
  Animated.createAnimatedComponent(TouchableOpacity)
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
  color: ${(props) =>
    props.isFocused || props.isValid ? colors.main : colors.inActivated};
`;

const BottomLine = styled(HorizontalLine)`
  background-color: ${(props) =>
    props.isFocused || props.isValid != "" ? colors.main : colors.inActivated};
  margin-bottom: 16px;
`;

/**
 * @param {string} placeholder
 * @param {number} refId 필수. 같이 관리할 ref들 각각 고유값으로. inputvalues와 index같아야함.
 * @param {ref} componentRef 필수. 상위 component에서 useRef 배열을 사용(or context)
 * @param {state} inputValues 필수. 같이 관리할 value들의 배열
 * @param {setter} setInputValues 필수.
 * @param {boolean} autoFocusNext submit했을 때 다음 input으로 이동 필요한 경우
 * @param {object} style textInput style
 * @param {string} keyboardType
 * @param {string} defaultValue
 */
const AnimationTextForm = (props) => {
  const placeholder = props.placeholder ?? null;
  const refId = props.refId ?? null; // 필수
  const componentRef = props.componentRef ?? null;
  const inputValues = props.inputValues ?? null; // 필수
  const setInputValues = props.setInputValues ?? null; // 필수
  const autoFocusNext = props.autoFocusNext ?? false;
  const style = props.style ?? null;
  const keyboardType = props.keyboardType ?? "default";
  const defaultValue = props.defaultValue ?? null;
  const containerStyle = props.containerStyle ?? null;
  // height => fontSize, paddingTop 조절
  const [isFocused, setIsFocused] = useState(false);
  const heightForAni = useRef(new Animated.Value(58)).current;
  const fontSizeForAni = heightForAni.interpolate({
    inputRange: [22, 58],
    outputRange: [14, 16],
  });
  const paddingTopForAni = heightForAni.interpolate({
    inputRange: [22, 58],
    outputRange: [0, 24],
  });
  console.log("inputValues: ", inputValues);

  const onInputPress = () => {
    Animated.timing(heightForAni, {
      toValue: 22,
      duration: 100,
      useNativeDriver: false,
    }).start();
  };
  const onInputBlur = () => {
    Animated.timing(heightForAni, {
      toValue: 58,
      duration: 100,
      useNativeDriver: false,
    }).start();
  };
  if (isFocused || defaultValue || inputValues[refId]) onInputPress();
  return (
    <KeyboardAvoidingView behavior="height" style={{ ...containerStyle }}>
      <InputContainer>
        <TextInput
          value={defaultValue ? null : inputValues[refId]}
          style={{ fontSize: 16, ...style }}
          keyboardType={keyboardType}
          defaultValue={defaultValue}
          onChangeText={(text) => {
            let arr = [...inputValues];
            arr[refId] = text;
            setInputValues(arr);
          }}
          ref={(comp) => (componentRef.current[refId] = comp)}
          onFocus={() => {
            setIsFocused(true);
          }}
          onBlur={() => {
            setIsFocused(false);
            console.log("inputValues[refId]: ", inputValues[refId]);
            if (inputValues[refId] == "" || inputValues[refId] == undefined) {
              onInputBlur();
            }
          }}
          onSubmitEditing={() => {
            if (autoFocusNext) {
              componentRef.current[refId + 1].focus();
            }
          }}
        />
        <UpperPlaceholder
          onPress={() => {
            componentRef.current[refId].focus();
            onInputPress();
          }}
          style={{
            height: heightForAni,
            paddingTop: paddingTopForAni,
          }}
        >
          <UpperPlaceholderText
            isFocused={isFocused}
            isValid={inputValues[refId]}
            style={{ fontSize: fontSizeForAni }}
          >
            {placeholder ?? null}
          </UpperPlaceholderText>
        </UpperPlaceholder>
      </InputContainer>
      <BottomLine isFocused={isFocused} isValid={inputValues[refId]} />
    </KeyboardAvoidingView>
  );
};

export default AnimationTextForm;
