import React from 'react';
import {
    FlatList,
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    useColorScheme,
    View,
    Button
  } from 'react-native';
import * as Progress from 'react-native-progress';
import styled from "styled-components/native";

import Cal from './Nutrients/Cal';
import Carbon from './Nutrients/Carbon';
import Protein from './Nutrients/Protein';
import Fat from './Nutrients/Fat';

const Container = styled.View`
  background-color: white;
  flex-direction: row;
`
const NutrientsBar = () => {
    return(
        <Container>
        <Cal />
        <Carbon />
        <Protein />
        <Fat />
        </Container>
    )
}

export default NutrientsBar;