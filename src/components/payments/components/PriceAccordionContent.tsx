import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import styled from "styled-components/native";
import {
  AccordionContentContainer,
  Col,
  Row,
  TextMain,
  TextSub,
} from "../styledConsts";
import { numberComma, sortBySeller } from "../pageConsts";
import { useUserInfoContext } from "../context";

const TotalPrice = styled(TextMain)`
  font-size: 16px;
  font-weight: 700;
`;

const Seller = styled(TextMain)`
  font-size: 14px;
  font-weight: 700;
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

const PriceAccordionContent = () => {
  const { cart } = useUserInfoContext();
  const foods = cart.foods;
  const [sortedBySeller, setSortedBySeller] = useState([]);
  useEffect(() => {
    setSortedBySeller(sortBySeller(foods));
  }, [foods]);
  //   console.log("PriceAccordionContent sortBySeller:", sortedBySeller);
  //   console.log("PriceAccordionContent: cart", cart);
  return (
    <AccordionContentContainer>
      <TotalPrice>
        {cart.totalPrice ? numberComma(cart.totalPrice) : 0} 원
      </TotalPrice>
      <Col style={{ marginVertical: 24 }}>
        {sortedBySeller.map((sorted, idx3) => {
          let sellerPrice = 0;
          sorted.foods.map((food) => {
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
                    sorted.foods[0].freeDelivery
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

export default PriceAccordionContent;
