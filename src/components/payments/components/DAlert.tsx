import { View, Text, Modal, Dimensions } from "react-native";
import React from "react";
import colors from "../colors";
import styled from "styled-components/native";
import { Row, TextMain } from "../styledConsts";

const { width: SCREENWIDTH, height: SCREENHEIGHT } = Dimensions.get("window");

const ModalBackGround = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: #000000a6;
`;

const PopUpContainer = styled.View`
  width: ${(p) => (p.width ? `${p.width}px` : `${SCREENWIDTH - 80}px`)};
  height: ${(p) => (p.height ? `${p.height}px` : `auto`)};
  background-color: ${(p) =>
    p.backgroundColor ? p.backgroundColor : colors.white};
  border-radius: 10px;
`;
const ContentContainer = styled.View``;

const BtnLeft = styled.TouchableOpacity`
  flex: 1;
  height: 52px;
  align-items: center;
  justify-content: center;
  border-bottom-left-radius: 10px;
  border-top-width: 1px;
  border-right-width: 0.5px;
  border-color: ${colors.inActivated};
`;
const BtnRight = styled.TouchableOpacity`
  flex: 1;
  height: 52px;
  align-items: center;
  justify-content: center;
  border-bottom-right-radius: 10px;
  border-top-width: 1px;
  border-left-width: 0.5px;
  border-color: ${colors.inActivated};
`;
const ConfirmBtnText = styled(TextMain)`
  font-size: 16px;
  font-weight: 700;
  color: ${colors.main};
`;
const CancelBtnText = styled(TextMain)`
  font-size: 16px;
  font-weight: 700;
  color: ${colors.textSub};
`;

const DAlert = ({
  alertShow,
  contentContainerStyle,
  renderContent,
  onConfirm,
  onCancel,
}) => {
  return alertShow != null ? (
    <Modal
      animationType="slide"
      transparent={true}
      visible={alertShow ? true : false}
      onRequestClose={() => {
        onCancel ? onCancel() : null;
      }}
    >
      <ModalBackGround>
        <PopUpContainer>
          <ContentContainer>{renderContent()}</ContentContainer>
          <Row>
            <BtnLeft
              onPress={() => {
                console.log("취소");
                onCancel ? onCancel() : null;
              }}
            >
              <CancelBtnText>취소</CancelBtnText>
            </BtnLeft>
            <BtnRight
              onPress={() => {
                console.log("확인");
                onConfirm ? onConfirm() : null;
              }}
            >
              <ConfirmBtnText>확인</ConfirmBtnText>
            </BtnRight>
          </Row>
        </PopUpContainer>
      </ModalBackGround>
    </Modal>
  ) : null;
};

export default DAlert;
