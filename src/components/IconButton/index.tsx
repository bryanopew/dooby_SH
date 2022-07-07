import React from 'react';
import Styled from 'styled-components/native';

const Container = Styled.TouchableOpacity`
  padding: 8px;
`;
const Icon = Styled.Image`
`;

interface Props {
  iconName: 'search' | 'filter' | 'basket';
  style?: object;
  onPress?: () => void;
}
const IconButton = ({iconName, style, onPress}: Props) => {
  const imageSource = {
    search: require('~/Assets/Images/36_icon=search.png'),
    filter: require('~/Assets/Images/36_icon=filter.png'),
    basket: require('~/Assets/Images/36_icon=basket.png'),
  };
  return (
    <Container
      style={style}
      onPress={() => {
        if (onPress && typeof onPress === 'function') {
          onPress();
        }
      }}>
      <Icon source={imageSource[iconName]} />
    </Container>
  );
};

export default IconButton;
