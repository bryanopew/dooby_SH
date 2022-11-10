import {View, Text} from 'react-native';
import React, {useEffect, useState} from 'react';
import styled from 'styled-components/native';
import colors from '../../../styles/stylesHS/colors';
import {
  HorizontalLine,
  Col,
  Row,
  TextMain,
  TextSub,
  AccordionContentContainer,
} from '../styledConsts';

import {Dimensions} from 'react-native';
import {numberComma, sortBySeller} from '../pageConsts';
import {useUserInfoContext} from '../context';
const {width: SCREENWIDTH} = Dimensions.get('window');

// const AccordionContentContainer = styled.View`
//   width: ${`${SCREENWIDTH}px`};
//   background-color: ${colors.white};
//   padding: 0px 16px 0px 16px;
// `;

const Title = styled.View`
  margin-top: 16px;
  width: 100%;
  justify-content: center;
  align-items: center;
`;

const TitleSeller = styled(TextMain)`
  font-size: 16px;
  font-weight: 800;
`;
const FoodRow = styled(Row)`
  margin-top: 16px;
`;

const FoodThumbnail = styled.Image`
  width: 72px;
  height: 72px;
  border-radius: 5px;
  background-color: ${colors.highlight};
`;

const Seller = styled(TextMain)`
  font-size: 14px;
  font-weight: 700;
`;

const ProductName = styled(TextMain)`
  flex: 1;
  font-size: 14px;
  font-weight: 300;
`;

const PriceNQRow = styled(Row)`
  margin-top: 16px;
  justify-content: space-between;
`;

const PriceNQ = styled(TextMain)`
  font-size: 16px;
  font-weight: 500;
`;

const SellerPrice = styled(TextMain)`
  font-size: 14px;
`;
const SellerDelivery = styled(TextSub)`
  font-size: 14px;
`;

const FreeDeliveryText = styled(TextSub)`
  font-size: 14px;
`;

const FoodsAccordionContent = () => {
  const {cart} = useUserInfoContext();
  const foods = ['ㅇㅇ'];
  const [sortedBySeller, setSortedBySeller] = useState([]);
  useEffect(() => {
    setSortedBySeller(sortBySeller(foods));
  }, [foods]);
  console.log('FoodsAccordionContent sortBySeller:', sortedBySeller);
  return (
    <AccordionContentContainer>
      {sortedBySeller.map((sorted, idx) => {
        return (
          <Col style={{}} key={idx}>
            <Title>
              <TitleSeller>{sorted.seller}</TitleSeller>
              <HorizontalLine
                style={{marginTop: 16, backgroundColor: colors.textSub}}
              />
            </Title>
            {sorted.foods.map((food, idx2) => (
              <Col style={{}} key={idx2}>
                <FoodRow>
                  <FoodThumbnail />
                  <Col style={{marginLeft: 8, flex: 1}}>
                    <Seller>{food.seller}</Seller>
                    <ProductName numberOfLines={1} ellipsizemode="tail">
                      {food.productName}
                    </ProductName>
                    <PriceNQRow>
                      <PriceNQ>{numberComma(food.price)}원</PriceNQ>
                      <PriceNQ>{food.quantity}개</PriceNQ>
                    </PriceNQRow>
                  </Col>
                </FoodRow>
                <HorizontalLine style={{marginTop: 8}} />
              </Col>
            ))}
          </Col>
        );
      })}
      <Col style={{marginVertical: 24}}>
        {sortedBySeller.map((sorted, idx3) => {
          let sellerPrice = 0;
          sorted.foods.map(food => {
            sellerPrice += food.price * food.quantity;
          });
          return (
            <Col key={idx3}>
              <Row>
                <Seller>{sorted.seller} : </Seller>
                <SellerPrice>{`${numberComma(sellerPrice)}원`}</SellerPrice>
                <SellerDelivery>
                  {sellerPrice >= sorted.foods[0].freeDelivery
                    ? ` + 0원`
                    : ` + ${numberComma(sorted.foods[0].delivery)}원`}
                </SellerDelivery>
                <FreeDeliveryText>
                  {` (${numberComma(
                    sorted.foods[0].freeDelivery,
                  )}원 이상 무료배송)`}
                </FreeDeliveryText>
              </Row>
            </Col>
          );
        })}
      </Col>
    </AccordionContentContainer>
  );
};

export default FoodsAccordionContent;
