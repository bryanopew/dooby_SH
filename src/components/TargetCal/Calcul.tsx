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

import {ScrollView} from 'react-native-gesture-handler';

const styles = StyleSheet.create({
  button: {
    marginTop: 10,
    marginBottom: 10,
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 20,
    color: 'grey',
  },
  contents: {
    marginTop: 10,
    marginBottom: 10,
  },
  text: {
    color: '#590DE1',
    marginLeft: 10,
  },
  emph: {
    color: 'blue',
  },
  clicked: {
    borderWidth: 1,
    borderColor: '#590DE1',
  },
  unClicked: {
    borderWidth: 1,
    borderColor: 'grey',
  },
});

const HeaderText = Styled.Text`
  font-weight: bold;
`;
const ContentsHeaderText = Styled.Text`
  font-weight: bold;
  font-size: 15px;
`;
const ContentsHeaderContiainer = Styled.View`
border-width: 1px;
border-color: grey;
border-radius: 5px;
height: 60px;
width: 112%
padding: 15px;
align-items: center;
margin-top: -30px;
`;
const TextInputContainer = Styled.View`
border-color: grey;
border-radius: 5px;
padding: 10px;
`;
const ContentsContainer = Styled.View`
border-width: 1px;
border-color: grey;
border-radius: 5px;
padding: 10px;
margin-top: -20px;
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
  return (
    <ContentsContainer style={styles.clicked}>
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
  const [value, setValue] = useState();
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
          borderColor: '#f0f8ff',
          borderBottomWidth: 1,
        }}
        dropDownContainerStyle={{
          position: 'relative',
          marginTop: -40,
        }}
        listMode="SCROLLVIEW"
        placeholder="탄:단:지 비율로 계산하기"
        open={open}
        setOpen={setOpen}
        value={value}
        items={cal}
        setValue={setValue}
        setItems={setCal}
        textStyle={{fontSize: 15}}
        onChangeValue={() => {
          setData(value);
        }}
      />
    </>
  );
};
const Calcul = props => {
  const {info, target, conTarget, clicked, setClicked} = props;
  const [data, setData] = useState();
  const [text, setText] = useState();
  console.log('text:', text);

  const handleClick = () =>
    setClicked(prevState => ({
      ...prevState,
      autoDoClicked: false,
      calculClicked: !prevState.calculClicked,
      manualClicked: false,
    }));
  let meal = Math.round((parseInt(info) + parseInt(conTarget)) / 3);

  return (
    <>
      <Pressable style={styles.button} onPress={handleClick}>
        <ContentsHeaderContiainer
          style={clicked.calculClicked ? styles.clicked : styles.unClicked}>
          <ContentsHeaderText>탄:단:지 비율로 계산하기</ContentsHeaderText>
        </ContentsHeaderContiainer>
      </Pressable>
      {clicked.calculClicked && (
        <View>
          <Text style={styles.text}>탄:단:지 비율</Text>
          <Portion setData={setData} />
          <Text>한 끼 칼로리(kcal)입력(추천: {meal})</Text>
          <TextInputContainer>
            <TextInput
              placeholder="한 끼 칼로리(kcal)입력"
              onChangeText={setText}
              value={text}
              onSubmitEditing={() => setText(text)}
            />
          </TextInputContainer>
          <Contents info={text} value={data} />
        </View>
      )}
    </>
  );
};

export default Calcul;
