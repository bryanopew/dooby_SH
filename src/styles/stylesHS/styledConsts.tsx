import styled from 'styled-components/native';
import colors from './colors';
import {Dimensions} from 'react-native';

const {width: SCREENWIDTH} = Dimensions.get('window');

export const InputHeaderText = styled.Text`
  margin-top: 24px;
  font-size: 14px;
  font-weight: normal;
  color: ${({isActivated}) => (isActivated ? colors.main : colors.white)};
`;
export const UserInfoTextInput = styled.TextInput`
  justify-content: center;
  align-items: flex-start;
  font-weight: normal;
  font-size: 16px;
  border-bottom-width: 1px;
  border-color: ${({isActivated}) =>
    isActivated ? colors.main : colors.inActivated};
`;

export const ErrorText = styled.Text`
  font-size: 16px;
  color: #ffffff;
  margin-left: 10px;
`;
export const ErrorBox = styled.View`
  position: relative;
  margin-top: 4px;
  margin-bottom: -28px;
  background-color: ${colors.warning};
  border-radius: 3px;
  width: 288px;
  align-self: flex-end;
  height: 24px;
  opacity: 0.8;
`;

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

/** props btnStyle -> "activated" | "inactivated" | "border" | "borderActivated"  */
export const BtnCTA = styled.TouchableOpacity`
  height: 52px;
  width: ${`${SCREENWIDTH - 32}px`};
  border-radius: 4px;
  background-color: ${({btnStyle}) =>
    btnStyle == 'activated'
      ? `${colors.main}`
      : btnStyle == 'inactivated'
      ? `${colors.inActivated}`
      : btnStyle == 'border'
      ? `${colors.white}`
      : `${colors.white}`};
  align-items: center;
  justify-content: center;
  border-width: ${({btnStyle}) =>
    btnStyle == 'border' || btnStyle == 'borderActivated' ? '1px' : '0px'};
  border-color: ${({btnStyle}) =>
    btnStyle == 'border'
      ? colors.inActivated
      : btnStyle == 'borderActivated'
      ? colors.main
      : colors.white};
`;

export const BtnBottomCTA = styled(BtnCTA)`
  align-self: center;
  margin-top: -60px;
  margin-bottom: 8px;
  elevation: 8;
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
  background-color: ${colors.inActivated};
`;

export const HorizontalSpace = styled.View`
  width: 100%;
  height: ${props => `${props.height}px`};
  background-color: ${colors.white};
`;

export const VerticalSpace = styled.View`
  height: 100%;
  width: ${props => `${props.width}px`};
  background-color: ${colors.white};
`;
