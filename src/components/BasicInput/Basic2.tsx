
import React, { Component, useState } from 'react';
import { StyleSheet, SafeAreaView, View, Text, Button, Alert, TextInput, Pressable, BackHandler } from 'react-native';
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


const Basic2 = ({navigation, basicInformation}) => {
    console.log(basicInformation);

    const [base, setBase] = useState("");
    const [value, setValue] = useState();
    const [open, setOpen] = useState(false);
    const [wtime, setWtime] = useState([
      {label: '하루 30분 이하', value: '1', },
    ]);
    const [atime, setAtime] = useState([
      {label: '하루 30분~1시간 이하', value: '2', },
    ]);
    return (
      <SafeAreaView>
      <Text style={{fontSize: 30, fontWeight: 'bold', color: 'black', marginBottom: 20}}>선택 정보를 {"\n"}입력해주세요.</Text>
       
        <TextInput style={styles.header} 
          placeholder="기초대사량을 알고 있다면 적어주세요(kcal)" 
          onChangeText={setBase} 
          value={base} 
          keyboardType="numeric"  
          onSubmitEditing={()=>console.log(base)}
          />  
      
        <DropDownPicker
         style={{
          borderColor: '#f0f8ff',
          borderBottomWidth: 1,
        }}
          placeholder="웨이트 운동시간"
          open={open}
          setOpen={setOpen}
          value={value}
          items={wtime}
          setValue={setValue}
          setItems={setWtime}
          textStyle={{ fontSize: 15}}
          onPress={() => console.log('웨이트', value)}
        />

        <DropDownPicker
         style={{
          borderColor: '#f0f8ff',
          borderBottomWidth: 1,
        }}
          placeholder="유산소 운동시간"
          open={open}
          setOpen={setOpen}
          value={value}
          items={atime}
          setValue={setValue}
          setItems={setAtime}
          textStyle={{ fontSize: 15}}
          onPress={() => console.log('유산소', value)}
        />
        
         
        <Pressable
        style={styles.button}
        onPress={()=>navigation.navigate('Basic3')}
        >
        <Text style={{color: 'white'}}>다음</Text>
      </Pressable>
      </SafeAreaView>
    );
  };

export default Basic2;