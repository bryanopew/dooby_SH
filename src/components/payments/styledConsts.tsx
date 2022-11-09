import styled from "styled-components/native";
import colors from "./colors";
import { Dimensions } from "react-native";

const { width: SCREENWIDTH } = Dimensions.get("window");

export const AccordionContentContainer = styled.View`
  width: ${`${SCREENWIDTH}px`};
  height: auto;
  background-color: ${colors.white};
  padding: 0px 16px 0px 16px;
`;

export const InputContainer = styled.View`
  width: 100%;
  height: 58px;
  padding-top: 24px;
`;

export const TextMain = styled.Text`
  color: ${colors.textMain};
`;

export const TextSub = styled.Text`
  color: ${colors.textSub};
  font-size: 12px;
  font-weight: 300;
`;

export const Row = styled.View`
  flex-direction: row;
  align-items: center;
`;
export const Col = styled.View``;

export const Seperator = styled.View`
  height: 16px;
`;

/** props btnStyle -> "activated" | "inactivated" | "border"  */
export const BtnCTA = styled.TouchableOpacity`
  height: 52px;
  width: ${`${SCREENWIDTH - 32}px`};
  border-radius: 4px;
  background-color: ${({ btnStyle }) =>
    btnStyle == "activated"
      ? `${colors.main}`
      : btnStyle == "inactivated"
      ? `${colors.inActivated}`
      : btnStyle == "border"
      ? `${colors.white}`
      : `${colors.white}`};
  align-items: center;
  justify-content: center;
  border-width: ${({ btnStyle }) => (btnStyle == "border" ? "1px" : "0px")};
  border-color: ${({ btnStyle }) =>
    btnStyle == "border" ? `${colors.inActivated}` : `${colors.white}`};
`;

export const BtnText = styled.Text`
  color: ${colors.white};
  font-size: 16px;
`;

export const VerticalLine = styled.View`
  height: 100%;
  width: 1px;
  background-color: ${colors.line};
`;
export const HorizontalLine = styled.View`
  height: 1px;
  width: 100%;
  background-color: ${colors.line};
`;

export const HorizontalSpace = styled.View`
  width: 100%;
  height: ${(props) => `${props.height}px`};
  background-color: ${colors.white};
`;
