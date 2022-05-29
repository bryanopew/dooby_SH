import React, { Component, useState } from 'react';
import { StyleSheet, SafeAreaView, View, Text, Button, Switch, Alert, TextInput, Pressable } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';

const Calcul = () => {
    const [value, setValue] = useState();
    const [open, setOpen] = useState(false);
    const [cal, setCal] = useState([
        {label: '55 : 20 : 25(보건복지부 추천)', value: '감량', },
        {label: '20 : 20: 60(저탄고지 식단)', value: '증가', },
        {label: '40 : 40 : 20(벌크업용)', value: '유지', },
      ]);
    return(
    <>
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
     onPress={() => {console.log('click'); }}
   />
   </>
   )
}

export default Calcul;