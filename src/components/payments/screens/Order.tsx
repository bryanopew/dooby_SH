import {View, Text, FlatList, ScrollView, Animated} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import styled from 'styled-components/native';
import colors from '../../../styles/stylesHS/colors';
import {numberComma} from '../pageConsts';
import Accordion from 'react-native-collapsible/Accordion';
import {
  BtnCTA,
  BtnText,
  Row,
  Seperator,
  TextMain,
  TextSub,
} from '../styledConsts';
import {EvilIcons} from '@expo/vector-icons';
import Icon from 'react-native-vector-icons/Ionicons';

import {
  useInputValuesContext,
  useOrderInfoContext,
  useSetOrderInfoContext,
  useUserInfoContext,
} from '../context';
import FoodsAccordionContent from '../components/FoodsAccordionContent';
import OrdererAccordionContent from '../components/OrdererAccordionContent';
import AddressAccordionContent from '../components/AddressAccordionContent';
import PaymentAccordionContent from '../components/PaymentAccordionContent';
import PriceAccordionContent from '../components/PriceAccordionContent';

const Container = styled.View`
  flex: 1;
  background-color: ${colors.backgroundLight};
`;

// header sc
const AccordionHeaderContainer = styled.View`
  width: 100%;
  height: 64px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0px 16px 0px 16px;
  background-color: ${colors.white};
`;
const AccordionHeaderTextBox = styled.View`
  flex: 1;
`;
const AccordionHeaderTitle = styled(TextMain)`
  font-size: 18px;
  font-weight: 600;
`;
const AccordionHearderSubTitle = styled(TextSub)`
  flex: 1;
  font-size: 14px;
`;
const Etc = styled(TextSub)`
  font-size: 14px;
`;

const OrderBtn = styled(BtnCTA)`
  align-self: center;
  margin-bottom: 8px;
  margin-top: -60px;
  // scrollView랑 겹치게!
  // -> scrollView contentContainerStyle에도 paddingBottom 주고!
`;

const Order = ({navigation, route}) => {
  console.log('Order route: ', route);
  // context
  const orderInfo = useOrderInfoContext();
  const setOrderInfo = useSetOrderInfoContext();
  console.log('Order orderInfo: ', orderInfo);
  // 0: 주문자이름 | 1: 배송지 |
  const userData = useUserInfoContext();
  const inputValues = useInputValuesContext();

  const [activeSections, setActiveSections] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(0);

  const isCreated = route.params?.isCreated ?? false;
  const editedId = route.params?.editedId ?? false;
  const isEdited = route.params?.isEdited ?? false;
  const isDeleted = route.params?.isDeleted ?? false;

  console.log('isCreated: ', isCreated);
  console.log('editedId: ', editedId);
  console.log('isEdited: ', isEdited);
  console.log('isDeleted: ', isDeleted);

  const SECTIONS = [
    {
      title: '주문식품',
      subTitle: `${userData.cart.noOfMenu}가지 식단 | ${userData.cart.foods[0].productName}`,
      content: <FoodsAccordionContent />,
    },
    {
      title: '수령인',
      subTitle: `${inputValues[0]} | ${inputValues[1]}`,
      content: <OrdererAccordionContent />,
    },
    {
      title: '배송지',
      content: (
        <AddressAccordionContent
          selectedAddress={selectedAddress}
          setSelectedAddress={setSelectedAddress}
        />
      ),
      subTitle: `${userData.address[selectedAddress]?.addressBase ?? ''} | ${
        userData.address[selectedAddress]?.addressDetail ?? ''
      }`,
    },
    {
      title: '결제수단',
      content: <PaymentAccordionContent />,
      subTitle: `subTitle`,
    },
    {
      title: '결제금액',
      content: <PriceAccordionContent />,
      subTitle: `식품가격: ${numberComma(
        userData.cart.totalPrice - userData.cart.deliveryPrice,
      )} | 배송비: ${numberComma(userData.cart.deliveryPrice)}`,
    },
  ];

  // const renderSectionTitle = (section) => {
  // };
  useEffect(() => {
    if (userData.address[0]) {
      setOrderInfo({
        ...orderInfo,
        postalCode: userData.address[0].postalCode,
        addressBase: userData.address[0].addressBase,
        addressDetail: userData.address[0].addressDetail,
      });
    }
  }, []);

  useEffect(() => {
    if (isEdited) {
      if (isCreated) {
        console.log('created!!');
        setSelectedAddress(editedId);
        setOrderInfo({
          ...orderInfo,
          postalCode: userData.address[editedId].postalCode,
          addressBase: userData.address[editedId].addressBase,
          addressDetail: userData.address[editedId].addressDetail,
        });
      }
      if (isDeleted) {
        console.log('deleted!!');
        setSelectedAddress(0);
        console.log('address deleted', userData.address);
        if (userData.address[0]) {
          setOrderInfo({
            ...orderInfo,
            postalCode: userData.address[0].postalCode,
            addressBase: userData.address[0].addressBase,
            addressDetail: userData.address[0].addressDetail,
          });
        }
        if (userData.address.length == 0) {
          setOrderInfo({
            ...orderInfo,
            postalCode: '',
            addressBase: '',
            addressDetail: '',
          });
        }
      }
    }
  }, [userData]);

  const renderHeader = (section, index, isActive) => {
    return (
      <AccordionHeaderContainer>
        <AccordionHeaderTextBox>
          <AccordionHeaderTitle>{section.title}</AccordionHeaderTitle>
          {isActive ? null : (
            <Row>
              <AccordionHearderSubTitle numberOfLines={1} ellipsizemode="tail">
                {section.subTitle}
              </AccordionHearderSubTitle>
              {section.title == '주문식품' ? <Etc>외</Etc> : null}
            </Row>
          )}
        </AccordionHeaderTextBox>
        {isActive ? (
          <Icon name="chevron-up" size={28} color={colors.textSub} />
        ) : (
          <Icon name="chevron-down" size={28} color={colors.textSub} />
        )}
      </AccordionHeaderContainer>
    );
  };

  const renderContent = section => {
    return section.content;
  };

  const updateSections = actives => {
    setActiveSections(actives);
  };

  const orderBtnOnPress = () => {
    setOrderInfo({
      ...orderInfo,
      nickName: userData.nickName,
      recipient: inputValues[0],
      phone: inputValues[1],
    });
  };
  return (
    <Container>
      <ScrollView contentContainerStyle={{paddingBottom: 60}}>
        <Accordion
          containerStyle={{marginTop: 16}}
          sections={SECTIONS}
          activeSections={activeSections}
          // renderSectionTitle={renderSectionTitle}
          renderHeader={renderHeader}
          renderFooter={() => <Seperator />}
          renderContent={renderContent}
          onChange={updateSections}
        />
      </ScrollView>
      <OrderBtn btnStyle="activated" onPress={orderBtnOnPress}>
        <BtnText>{`${numberComma(
          userData.cart.totalPrice,
        )}원 결제하기`}</BtnText>
      </OrderBtn>
    </Container>
  );
};

export default Order;
