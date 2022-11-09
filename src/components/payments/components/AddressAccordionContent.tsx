import {View, Text} from 'react-native';
import React, {useEffect, useState} from 'react';
import styled from 'styled-components/native';
import colors from '../colors';
import {
  AccordionContentContainer,
  BtnCTA,
  Col,
  HorizontalLine,
  InputContainer,
  Row,
  TextMain,
  TextSub,
} from '../styledConsts';
import {
  useOrderInfoContext,
  useSetOrderInfoContext,
  useUserInfoContext,
} from '../context';
import {Ionicons, Feather, AntDesign} from '@expo/vector-icons';
import Icon from 'react-native-vector-icons/Ionicons';

import {useNavigation} from '@react-navigation/native';

const Container = styled(InputContainer)`
  padding: 0px;
  flex-direction: row;
  align-items: center;
`;
const SelectContainer = styled.TouchableOpacity`
  flex: 1;
  flex-direction: row;
  align-items: center;
`;

const AddressBase = styled(TextSub)`
  font-size: 14px;
  margin-left: 8px;
`;
const AddressDetail = styled(TextMain)`
  font-size: 16px;
  margin-left: 8px;
`;

const EditBtn = styled.TouchableOpacity`
  width: 48px;
  height: 48px;
  justify-content: center;
  align-items: center;
`;

const AddressAddBtn = styled(BtnCTA)`
  height: 48px;
  margin-bottom: 16px;
`;

const AddressAddBtnText = styled(TextSub)`
  font-size: 14px;
  margin-left: 8px;
`;

const AddressAccordionContent = ({selectedAddress, setSelectedAddress}) => {
  const navigation = useNavigation();
  // const [selectedAddress, setSelectedAddress] = useState(0);
  const userData = useUserInfoContext();
  const orderInfo = useOrderInfoContext();
  const setOrderInfo = useSetOrderInfoContext();

  console.log('selectedAddress: ', selectedAddress);
  return (
    <AccordionContentContainer>
      {userData.address.map((ads, index) => (
        <Col key={index}>
          <Container>
            <SelectContainer
              onPress={() => {
                console.log('addressSelect! ', index);
                setSelectedAddress(index);
                setOrderInfo({
                  ...orderInfo,
                  postalCode: ads.postalCode,
                  addressBase: ads.addressBase,
                  addressDetail: ads.addressDetail,
                });
              }}>
              <Icon
                name="ios-checkbox"
                size={24}
                color={
                  index == selectedAddress ? colors.main : colors.inActivated
                }
              />
              <Col>
                <AddressBase>{ads.addressBase}</AddressBase>
                <AddressDetail>{ads.addressDetail}</AddressDetail>
              </Col>
            </SelectContainer>
            <EditBtn
              onPress={() =>
                navigation.navigate('StackNav', {
                  screen: 'AddressEdit',
                  params: {
                    addressId: index,
                  },
                })
              }>
              <Icon name="edit" size={24} color={colors.inActivated} />
            </EditBtn>
          </Container>
          <HorizontalLine style={{marginBottom: 16}} />
        </Col>
      ))}
      <AddressAddBtn
        btnStyle="border"
        onPress={() => {
          console.log('address 개수', userData.address.length);
          if (userData.address.length >= 5) return;
          navigation.navigate('StackNav', {
            screen: 'AddressEdit',
            params: {
              addressId: null,
            },
          });
        }}>
        <Row>
          <Icon name="plussquare" size={24} color={colors.inActivated} />
          <AddressAddBtnText>배송지 추가</AddressAddBtnText>
        </Row>
      </AddressAddBtn>
    </AccordionContentContainer>
  );
};

export default AddressAccordionContent;
