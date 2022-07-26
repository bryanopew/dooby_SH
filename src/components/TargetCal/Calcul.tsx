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
});

const Portion = () => {
  const [value, setValue] = useState();
  const [open, setOpen] = useState(false);
  const [cal, setCal] = useState([
    {label: '55 : 20 : 25(보건복지부 추천)', value: '감량'},
    {label: '20 : 20: 60(저탄고지 식단)', value: '증가'},
    {label: '40 : 40 : 20(벌크업용)', value: '유지'},
  ]);
  return (
    <>
      <DropDownPicker
        style={{
          borderColor: '#f0f8ff',
          borderBottomWidth: 1,
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
        onPress={() => {
          console.log('click');
        }}
      />
    </>
  );
};
const Calcul = props => {
  const {clicked, setClicked} = props;
  const handleClick = () =>
    setClicked(prevState => ({
      ...prevState,
      autoDoClicked: false,
      calculClicked: !prevState.calculClicked,
      manualClicked: false,
    }));
  return (
    <>
      <Pressable style={styles.button} onPress={handleClick}>
        <Text>탄:단:지 비율로 계산하기</Text>
      </Pressable>
      {clicked.calculClicked && (
        <View>
          <Text style={styles.text}>탄수화물:단백질:지방 비율</Text>
          <Portion />
          <Text style={styles.text}>한 끼 칼로리(kcal)입력(추천:data)</Text>
          <TextInput placeholder="0kcal" />
        </View>
      )}
    </>
  );
};

export default Calcul;
