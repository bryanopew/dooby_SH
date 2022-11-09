import { View, Text, TouchableOpacity, Modal } from "react-native";
import React, { useState } from "react";
import styled from "styled-components/native";
import colors from "../colors";

const Container = styled.View`
  flex: 1;
  background-color: white;
`;

const BoxContainer = styled.View`
  height: auto;
  width: 200px;
  background-color: blueviolet;
`;

const Box1 = styled.View`
  /* flex: 1; */
  width: 100px;
  height: 100px;
  background-color: red;
`;
const Box2 = styled.View`
  /* flex: 1; */
  width: 100px;
  height: 100px;
  background-color: blue;
`;
const Box3 = styled.View`
  /* flex: 1; */
  width: 100px;
  height: 50px;
  background-color: green;
`;

const Cart = () => {
  const [modalVisible, setModalVisible] = useState(true);
  return (
    <Container>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <BoxContainer>
            <Box1></Box1>
            <Box2></Box2>
            <Box3></Box3>
          </BoxContainer>
        </View>
      </Modal>
    </Container>
  );
};

export default Cart;
