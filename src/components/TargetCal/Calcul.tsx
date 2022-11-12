import React, {Component, useState} from 'react';
import {
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  Button,
  Switch,
  Alert,
  TextInput,
  Pressable,
} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import Styled from 'styled-components/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ScrollView} from 'react-native-gesture-handler';
import styled from 'styled-components/native';
import colors from '~/styles/stylesHS/colors';
import ContentsHeader from '../BasicInput/ContentsHeader';
import {
  InputHeaderText,
  UserInfoTextInput,
} from '~/styles/stylesHS/styledConsts';

const Container = styled.View`
  margin-top: -28px;
`;

const ContentsContainer = styled.View`
  margin-top: 12px;
  border-width: 1px;
  border-color: ${colors.main};
  border-radius: 5px;
  padding: 16px;
`;

const HeaderText = Styled.Text`
  font-weight: bold;
`;

const TextInputContainer = Styled.View`
border-color: grey;
border-radius: 5px;
padding: 10px;
`;

const Contents = props => {
  let meal = props.info;
  let value = props.value;
  console.log(value);
  //보건복지부 추천 55: 20: 25
  let carbon = (0.55 * meal) / 4;
  let protein = (0.2 * meal) / 4;
  let fat = (0.25 * meal) / 9;

  //저탄고지 20: 20: 60
  //let carbon = (0.2*meal)/4;
  //let protein = (0.2*meal)/4;
  //let fat = (0.25*meal)/9;

  //벌크업용 40: 40 : 20
  // let carbon = (0.4*meal)/4
  // let protein = (0.4*meal)/4
  // let fat = (0.2*meal)/9

  switch (value) {
    case 'SP005001':
      carbon = (0.55 * meal) / 4;
      protein = (0.2 * meal) / 4;
      fat = (0.25 * meal) / 9;
      break;
    case 'SP005002':
      carbon = (0.2 * meal) / 4;
      protein = (0.2 * meal) / 4;
      fat = (0.25 * meal) / 9;
      break;

    case 'SP005003':
      carbon = (0.4 * meal) / 4;
      protein = (0.4 * meal) / 4;
      fat = (0.2 * meal) / 9;
      break;
  }
  let c = Math.round(carbon);
  let p = Math.round(protein);
  let f = Math.round(fat);
  let result = {
    meal,
    c,
    p,
    f,
  };
  const storeData = async () => {
    try {
      await AsyncStorage.setItem(
        'CALCUL_RESULT',
        JSON.stringify(result),
        () => {
          console.log('저장완료');
        },
      );
    } catch (e) {
      console.log('error', e);
    }
  };
  storeData();
  return (
    <ContentsContainer>
      <HeaderText>
        {`  칼로리: ${meal} kcal
  탄수화물: ${Math.round(carbon)}g
  단백질: ${Math.round(protein)}g
  지방: ${Math.round(fat)}g
      `}
      </HeaderText>
    </ContentsContainer>
  );
};

const Portion = props => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('SP005001');
  const [cal, setCal] = useState([
    {label: '55 : 20 : 25(보건복지부 추천)', value: 'SP005001'},
    {label: '20 : 20: 60(저탄고지 식단)', value: 'SP005002'},
    {label: '40 : 40 : 20(벌크업용)', value: 'SP005003'},
  ]);
  const {setData} = props;
  return (
    <>
      <DropDownPicker
        style={{
          borderWidth: 0,
          borderBottomWidth: 1,
          borderColor: colors.inActivated,
        }}
        dropDownContainerStyle={{
          position: 'relative',
          marginTop: -44,
          paddingBottom: 4,
          borderRadius: 0,
          borderWidth: 1,
          borderTopWidth: 0,
          borderColor: colors.inActivated,
          zIndex: 6000,
          elevation: 2,
        }}
        selectedItemContainerStyle={{
          backgroundColor: colors.highlight,
        }}
        showTickIcon={false}
        // placeholder="탄:단:지 비율로 계산하기"
        open={open}
        setOpen={setOpen}
        value={value}
        items={cal}
        setValue={setValue}
        setItems={setCal}
        onChangeValue={() => {
          setData(value);
        }}
        textStyle={{fontSize: 16}}
        listMode="SCROLLVIEW"
        dropDownDirection="BOTTOM"
      />
    </>
  );
};
const Calcul = props => {
  const {info, target, conTarget, clicked, setClicked} = props;
  const [data, setData] = useState();
  const [text, setText] = useState();

  const handleClick = () =>
    setClicked(prevState => ({
      ...prevState,
      autoDoClicked: false,
      calculClicked: !prevState.calculClicked,
      manualClicked: false,
    }));
  let meal = Math.round((parseInt(info) + parseInt(conTarget)) / 3);

  return (
    <Container>
      <ContentsHeader
        clicked={clicked.calculClicked}
        handleClick={handleClick}
        headerText="탄:단:지 비율로 계산하기"
      />
      {clicked.calculClicked && (
        <View>
          <InputHeaderText isActivated={true}>탄:단:지 비율</InputHeaderText>
          <Portion setData={setData} />
          <InputHeaderText isActivated={text}>
            한 끼 칼로리 입력 (추천: {meal} kcal)
          </InputHeaderText>
          <UserInfoTextInput
            isActivated={text}
            placeholder={`한 끼 칼로리 입력 (추천: ${meal} kcal)`}
            onChangeText={setText}
            value={text}
            keyboardType="numeric"
            onSubmitEditing={() => setText(text)}
          />
          <Contents info={text} value={data} />
        </View>
      )}
    </Container>
  );
};

export default Calcul;
