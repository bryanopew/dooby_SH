import { View, Text } from "react-native";
import React from "react";
// import ProgressBar from "react-native-progress/Bar";
import styled from "styled-components/native";
import { Dimensions } from "react-native";
import colors from "../colors";
import { useNavigation } from "@react-navigation/native";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");
const Container = styled.TouchableOpacity`
  height: 50px;
  width: ${`${(SCREEN_WIDTH - 36) / 4}px`};
  justify-content: center;
  align-items: center;
`;

const Value = styled.Text`
  font-size: 14px;
  font-weight: 400;
  color: ${colors.textMain};
`;

const Bar = styled.View`
  margin-top: 4px;
  width: 50px;
  height: 4px;
  background-color: ${(props) => {
    switch (Object.keys(props.nutr)[0]) {
      case "cal":
        return colors.main;
      case "carb":
        return colors.blue;
      case "protein":
        return colors.green;
      case "fat":
        return colors.orange;
    }
  }};
`;

const Nutr = styled.Text`
  margin-top: 4px;
  font-size: 12px;
  color: ${colors.textMain};
`;

const TargetNutr = ({ item, alertShow, setAlertShow }) => {
  const navigation = useNavigation();
  const convertNutrText = (nutr) => {
    switch (Object.keys(nutr)[0]) {
      case "cal":
        return "칼로리";
      case "carb":
        return "탄수화물";
      case "protein":
        return "단백질";
      case "fat":
        return "지방";
    }
  };
  const convertNutrValue = (nutr) => {
    switch (Object.keys(nutr)[0]) {
      case "cal":
        return `${Object.values(nutr)[0]}kcal`;
      case "carb":
        return `${Object.values(nutr)[0]}g`;
      case "protein":
        return `${Object.values(nutr)[0]}g`;
      case "fat":
        return `${Object.values(nutr)[0]}g`;
    }
  };

  const onNutrPress = (nutr) => {
    switch (Object.keys(nutr)[0]) {
      case "cal":
        setAlertShow("cal");
        break;
      case "carb":
        setAlertShow("carb");
        break;
      case "protein":
        setAlertShow("protein");
        break;
      case "fat":
        setAlertShow("fat");
        break;
      default:
        setAlertShow("");
    }
  };
  // console.log(item);
  return (
    <Container onPress={() => onNutrPress(item)}>
      <Value>{convertNutrValue(item)}</Value>
      <Bar nutr={item} />
      <Nutr>{convertNutrText(item)}</Nutr>
    </Container>
  );
};

export default TargetNutr;
