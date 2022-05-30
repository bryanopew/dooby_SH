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

const BarView =styled.View`
  flex: 1;
  alignItems
`;

const NutrientsBar = () => {
    return(
        <BarView>
        <Cal />
        <Carbon />
        <Protein />
        <Fat />
        </BarView>
    )
}

export default NutrientsBar;