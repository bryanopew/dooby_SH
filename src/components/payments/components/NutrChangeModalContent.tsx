import { View, Text } from "react-native";
import React from "react";
import styled from "styled-components/native";
import colors from "../colors";
import { useUserInfoContext } from "../context";
import { Col, TextMain, TextSub } from "../styledConsts";
import AnimationTextForm from "./AnimationTextForm";

const Container = styled.View`
  padding: 0px 16px 0px 16px;
`;

const GuideText = styled(TextMain)`
  font-size: 16px;
`;

const NutrChangeModalContent = ({
  nutrValue,
  setNutrValue,
  nutrChangeRef,
  alertShow,
}) => {
  const convertPlaceholder = (alertShow) => {
    switch (alertShow) {
      case "carb":
        return "탄수화물 (g)";
      case "protein":
        return "단백질 (g)";
      case "fat":
        return "지방 (g)";
      default:
        return "";
    }
  };
  return (
    <Container>
      <Col style={{ marginTop: 24 }}>
        <GuideText>다른 영양소는 칼로리에 맞게</GuideText>
        <GuideText>자동으로 조절됩니다</GuideText>
      </Col>
      <Col style={{ marginTop: 16 }}>
        <GuideText>모든 영양소를 조정하고 싶은 경우는</GuideText>
        <GuideText>고객정보변경을 이용해주세요</GuideText>
      </Col>
      <AnimationTextForm
        placeholder={convertPlaceholder(alertShow)}
        inputValues={nutrValue}
        setInputValues={setNutrValue}
        refId={0}
        componentRef={nutrChangeRef}
        containerStyle={{ marginTop: 16 }}
        keyboardType="number-pad"
      />
    </Container>
  );
};

export default NutrChangeModalContent;
