
import React, { Component, useState } from 'react';
import { StyleSheet, SafeAreaView, View, Text, Button, Alert, TextInput, Pressable } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';

const styles = StyleSheet.create({
 
  header: {
    borderBottomWidth: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
    fontWeight: 'bold',
  },
  headerText: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#590DE1'
  },
  button: {
    marginTop: 50,
    alignItems: "center",
    backgroundColor: '#590DE1',
    padding: 20
  },
  box: {
    borderRadius: 10,
    alignItems: "center",
    borderColor: '#590DE1',
    borderWidth: 2,
    padding: 10,
    marginLeft: 30,
    marginRight: 30,
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: '#590DE1',
    paddingRight: 50,
    paddingLeft: 50,
  },
});



const Basic3 = ({navigation}) => {
    const [base, setBase] = useState("");
    const [value, setValue] = useState();
    const [open, setOpen] = useState(false);
    const [auto, setAuto] = useState([
      {label: '다이어트(한달에 3~4Kg 감량)', value: '감량', },
      {label: '체중 증량', value: '증가', },
      {label: '체중 유지', value: '유지', },
      {label: '체중 ', value: '1', },
      {label: '체중 유지', value: '2', }
    ]);
    const [cal, setCal] = useState([
      {label: '다이어트(한달에 3~4Kg 감량)', value: '감량', },
      {label: '체중 증량', value: '증가', },
      {label: '체중 유지', value: '유지', },
      {label: '체중 ', value: '1', },
      {label: '체중 유지', value: '2', }
    ]);
    const [man, setMan] = useState([
      {label: '다이어트(한달에 3~4Kg 감량)', value: '감량', },
      {label: '체중 증량', value: '증가', },
      {label: '체중 유지', value: '유지', },
      {label: '체중 ', value: '1', },
      {label: '체중 유지', value: '2', }
    ]);
    return (
      <SafeAreaView>
      <Text style={{fontSize: 30, fontWeight: 'bold', color: 'black', marginBottom: 20}}>목표 섭취량을 {"\n"}입력해주세요</Text>
        <DropDownPicker
         style={{
          borderColor: '#f0f8ff',
          borderBottomWidth: 1,
        }}
          placeholder="귀찮다 두비가 알아서 다 해줘!"
          open={open}
          setOpen={setOpen}
          value={value}
          items={auto}
          setValue={setValue}
          setItems={setAuto}
          textStyle={{ fontSize: 15}}
          onPress={() => console.log('두비가 알아서', value)}
        />

        <DropDownPicker
         style={{
          borderColor: '#f0f8ff',
          borderBottomWidth: 1,
        }}
          placeholder="탄:단:지 비율로 계산하기"
          open={open}
          setOpen={setOpen}
          value={value}
          items={cal}
          setValue={setValue}
          setItems={setCal}
          textStyle={{ fontSize: 15}}
          onPress={() => console.log('비율로 계산', value)}
        />
        <DropDownPicker
         style={{
          borderColor: '#f0f8ff',
          borderBottomWidth: 1,
        }}
          placeholder="각 영양 성분 직접 입력(고수용)"
          open={open}
          setOpen={setOpen}
          value={value}
          items={man}
          setValue={setValue}
          setItems={setMan}
          textStyle={{ fontSize: 15}}
          onPress={() => console.log('고수용', value)}
        />
        
         
        <Pressable
        style={styles.button}
        onPress={()=> navigation.navigate('MainTabs')}
        >
        <Text style={{color: 'white'}}>다음</Text>
      </Pressable>
      </SafeAreaView>
    );
  };

export default Basic3;