
import React, { Component, useState } from 'react';
import { StyleSheet, SafeAreaView, View, Text, Button, Alert, TextInput, TouchableOpacity } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';

const styles = StyleSheet.create({
 
  header: {
    borderBottomWidth: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  headerText: {
    fontSize: 15,
    fontWeight: 'bold',
    color: 'purple'
  },
  button: {
    marginTop: 50,
    alignItems: "center",
    backgroundColor: 'purple',
    padding: 20
  },
});



const Basic1 = () => {
    const [changeAge, setChangeAge] = useState("");
    const [changeHeight, setChangeHeight] = useState("");
    const [changeWeight, setChangeWeight] = useState("");
    const [value, setValue] = useState();
    const [open, setOpen] = useState(false);
    const [items, setItems] = useState([
      {label: '다이어트(한달에 3~4Kg 감량)', value: '감량', },
      {label: '체중 증량', value: '증가', },
      {label: '체중 유지', value: '유지', },
      {label: '체중 ', value: '1', },
      {label: '체중 유지', value: '2', }
    ]);
    return (
      <SafeAreaView>
      <Text style={{fontSize: 30, fontWeight: 'bold', color: 'black', marginBottom: 20}}>기본 정보를 {"\n"}입력해주세요</Text>
        <View style={styles.header}>
          <Text style={styles.headerText}>성별</Text>
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'center',margin: 10, padding: 20,}}>        
        <Button
          title="여성"
          color="blue"
          onPress={() => Alert.alert('Right button pressed')}
        />
        <Button
          title="남성"
          color="blue"
          onPress={() => Alert.alert('Right button pressed')}
        />
        </View>
        <TextInput style={styles.header} placeholder="만 나이를 입력해주세요" onChangeText={setChangeAge} value={changeAge} ></TextInput>
        <TextInput style={styles.header} placeholder="신장을 입력해주세요" onChangeText={setChangeHeight} value={changeHeight} keyboardType="numeric"></TextInput>
        <TextInput style={styles.header} placeholder="몸무게를 입력해주세요" onChangeText={setChangeWeight} value={changeWeight} keyboardType="numeric" ></TextInput>
        <Text style={{fontSize: 15, fontWeight: 'bold', color: 'purple', marginTop: 20}}>식단의 목적</Text>
        <DropDownPicker
         style={{
          borderWidth: 0,
          borderBottomWidth: 1,
        }}
          placeholder="식단의 목적"
          open={open}
          setOpen={setOpen}
          value={value}
          items={items}
          setValue={setValue}
          setItems={setItems}
          textStyle={{ fontSize: 15}}
          onPress={() => console.log('was the picker open?', value)}
        />
         
        <TouchableOpacity
        style={styles.button}
        onPress={()=> Alert.alert("눌림")}
        >
        <Text style={{color: 'white'}}>다음</Text>
      </TouchableOpacity>
      </SafeAreaView>
    );
  };

export default Basic1;