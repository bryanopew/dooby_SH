import { View, Text, ScrollView } from "react-native";
import React from "react";
import styled from "styled-components/native";
import colors from "../colors";
import { useUserInfoContext } from "../context";
import { Col, TextMain, TextSub } from "../styledConsts";
import AnimationTextForm from "./AnimationTextForm";

const Container = styled.View`
  padding: 0px 16px 0px 16px;
`;

const GoalText = styled(TextMain)`
  font-size: 16px;
`;
const GoalTextBold = styled(TextMain)`
  font-size: 16px;
  font-weight: 700;
`;
const CurrentWeightText = styled(TextMain)`
  margin-top: 16px;
  font-size: 18px;
`;

const GuideText = styled(TextSub)`
  font-size: 14px;
`;

const CalChangeModalContent = ({ nutrValue, setNutrValue, nutrChangeRef }) => {
  const userData = useUserInfoContext();
  console.log("CalChangeModalContent userData: ", userData);
  return (
    <ScrollView>
      <Container>
        <Col style={{ marginTop: 24 }}>
          <GoalText>섭섭 님의 목표는</GoalText>
          <GoalText>
            한 달 <GoalTextBold>1~2kg 감량</GoalTextBold> 입니다
          </GoalText>
        </Col>
        <CurrentWeightText>2주전 평균: 101kg | 현재: 99kg</CurrentWeightText>
        <Col style={{ marginTop: 8 }}>
          <GuideText>계획과 다르다면 기존 칼로리에서</GuideText>
          <GuideText>50 kcal 정도 조정해보세요</GuideText>
        </Col>
        <AnimationTextForm
          placeholder="칼로리 (kcal)"
          inputValues={nutrValue}
          setInputValues={setNutrValue}
          refId={0}
          componentRef={nutrChangeRef}
          containerStyle={{ marginTop: 16 }}
          keyboardType="number-pad"
        />
      </Container>
    </ScrollView>
  );
};

export default CalChangeModalContent;
