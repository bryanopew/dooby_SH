import styled from 'styled-components/native';
import {colorsHS} from './colors';
import {WIDTH, HEIGHT} from '../constants/constants';

export const AccordionContentContainer = styled.View`
  width: ${`${WIDTH}px`};
  height: auto;
  background-color: ${colorsHS.white};
  padding: 0px 16px 0px 16px;
`;

export const InputContainer = styled.View`
  width: 100%;
  height: 58px;
  padding-top: 24px;
`;

export const TextMain = styled.Text`
  color: ${colorsHS.textMain};
  font-size: 16px;
`;

export const TextSub = styled.Text`
  color: ${colorsHS.textSub};
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
  background-color: ${({btnStyle}) =>
    btnStyle == 'activated'
      ? `${colorsHS.main}`
      : btnStyle == 'inactivated'
      ? `${colorsHS.inActivated}`
      : btnStyle == 'border'
      ? `${colorsHS.white}`
      : `${colorsHS.white}`};
  align-items: center;
  justify-content: center;
  border-width: ${({btnStyle}) => (btnStyle == 'border' ? '1px' : '0px')};
  border-color: ${({btnStyle}) =>
    btnStyle == 'border' ? `${colorsHS.inActivated}` : `${colorsHS.white}`};
`;

export const BtnText = styled.Text`
  color: ${colorsHS.white};
  font-size: 16px;
`;

export const VerticalLine = styled.View`
  height: 100%;
  width: 1px;
  background-color: ${colorsHS.line};
`;
export const HorizontalLine = styled.View`
  height: 1px;
  width: 100%;
  background-color: ${colorsHS.line};
`;

export const HorizontalSpace = styled.View`
  width: 100%;
  height: ${props => `${props.height}px`};
  background-color: ${colorsHS.white};
`;
