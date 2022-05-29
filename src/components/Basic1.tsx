
import React, { Component, useState } from 'react';
import { StyleSheet, SafeAreaView, View, Text, Button, Alert, TextInput, Pressable } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import {StackNavigationProp} from '@react-navigation/stack';


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
    color: 'grey',
    paddingRight: 50,
    paddingLeft: 50,
  },
  clicked: {
    borderRadius: 10,
    alignItems: "center",
    borderColor: '#590DE1',
    borderWidth: 2,
    padding: 10,
    marginLeft: 30,
    marginRight: 30,
  },
  unClicked: {
    borderRadius: 10,
    alignItems: "center",
    borderColor: 'grey',
    borderWidth: 2,
    padding: 10,
    marginLeft: 30,
    marginRight: 30,
  }
});



const Basic1 = ({navigation}) => {
    const [age, setAge] = useState("");
    const [height, setHeight] = useState("");
    const [weight, setWeight] = useState("");
    const [value, setValue] = useState();
    const [open, setOpen] = useState(false);
    const [click, setClick] = useState(false);
    const [items, setItems] = useState([
      {label: '다이어트(한 달 1~2kg감량)', value: '12감량', },
      {label: '다이어트(한 달 3~4kg감량)', value: '34감량', },
      {label: '체중유지', value: '유지', },
      {label: '체중증가(한 달 1~2kg증량) ', value: '12증량', },
      {label: '체중증가(한 달 3~4kg증량)', value: '34증량', }
    ]);
    const basicInformation = {
      age,
      height,
      weight,
      value
    }

    console.log(basicInformation);

    return (
      <SafeAreaView>
      <Text style={{fontSize: 30, fontWeight: 'bold', color: 'black', marginBottom: 20}}>기본 정보를 {"\n"}입력해주세요.</Text>
        <View>
          <Text style={styles.headerText}>성별</Text>
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'center',margin: 10, padding: 20,}}>        
        <Pressable
         style={({pressed}) => pressed ? 
          styles.clicked : styles.unClicked
        } 
         onPress={()=>{console.log(click)
                       setClick(!click);
         }}>
         <Text style={styles.text}>여성</Text>
       </Pressable>
       <Pressable
          style={({pressed}) => pressed ? 
          styles.clicked : styles.unClicked
        } 
         onPress={()=>console.log('남성')}>
         <Text style={styles.text}>남성</Text>
       </Pressable>
        </View>
        <TextInput style={styles.header} 
          placeholder="만 나이를 입력해주세요" 
          onChangeText={setAge} 
          value={age} 
          keyboardType="numeric"  
          onSubmitEditing={()=>console.log(age)}
          />  
      
        <TextInput style={styles.header} placeholder="신장을 입력해주세요" onChangeText={setHeight} value={height} keyboardType="numeric" onSubmitEditing={()=>console.log(height)} ></TextInput>
        <TextInput style={styles.header} placeholder="몸무게를 입력해주세요" onChangeText={setWeight} value={weight} keyboardType="numeric" onSubmitEditing={()=>console.log(weight)}></TextInput>
        <Text style={{fontSize: 15, fontWeight: 'bold', color: '#590DE1', marginTop: 20}}>식단의 목적</Text>
        <DropDownPicker
         style={{
          borderColor: '#f0f8ff',
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
        />
        <Pressable
        style={styles.button}
        onPress={()=> navigation.navigate('Basic2',{basicInformation})}
        >
        <Text style={{color: 'white'}}>다음</Text> 
      </Pressable>
      </SafeAreaView>
    );
  };

export default Basic1;