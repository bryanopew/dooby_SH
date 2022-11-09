import { View, Text } from "react-native";
import React, { useState } from "react";
import styled from "styled-components/native";
import {
  AccordionContentContainer,
  BtnCTA,
  Col,
  Row,
  TextMain,
} from "../styledConsts";
import colors from "../colors";
import { useOrderInfoContext, useSetOrderInfoContext } from "../context";

const KakaoPayBtn = styled(BtnCTA)`
  height: 48px;
  border-color: ${({ isActivated }) =>
    isActivated ? `${colors.kakaoColor}` : `${colors.inActivated}`};
`;
const KakaoPayBtnText = styled(TextMain)`
  font-size: 16px;
  margin-left: 8px;
`;
const KakaoLogo = styled.Image`
  width: 48px;
  height: 20px;
  resize: contain;
`;
const GuideText = styled(TextMain)`
  margin-top: 16px;
  font-size: 14px;
  font-weight: 300;
`;
const BoldText = styled(TextMain)`
  font-size: 14px;
  font-weight: 800;
`;

const PaymentAccordionContent = () => {
  const orderInfo = useOrderInfoContext();
  const setOrderInfo = useSetOrderInfoContext();
  // 결제수단 2개 이상이면 id값으로!
  const [kakaoPay, setKakaoPay] = useState(false);
  console.log(kakaoPay);

  return (
    <AccordionContentContainer style={{ paddingBottom: 16 }}>
      <KakaoPayBtn
        btnStyle="border"
        isActivated={kakaoPay}
        onPress={() => {
          setKakaoPay((st) => !st);
          setOrderInfo({
            ...orderInfo,
            payment: "kakao",
          });
        }}
      >
        <Row>
          <KakaoLogo
            source={require("../static/payment_icon_yellow_small.png")}
          />
          <KakaoPayBtnText>카카오페이</KakaoPayBtnText>
        </Row>
      </KakaoPayBtn>
      <GuideText>
        다른 결제수단은 <BoldText>정식출시</BoldText>를 조금만 기다려주세요
      </GuideText>
    </AccordionContentContainer>
  );
};

export default PaymentAccordionContent;
