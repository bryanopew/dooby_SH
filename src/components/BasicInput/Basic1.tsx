import React, { Component, useState, useEffect } from 'react';
import { StyleSheet, SafeAreaView, View, Text, Button, Alert, TextInput, Pressable } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { ScrollView } from 'react-native-gesture-handler';


const styles = StyleSheet.create({
  textInput: {
    borderBottomWidth: 0.2,
    justifyContent: 'center',
    alignItems: 'flex-start',
    fontWeight: 'bold',
  },
  headerText: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#590DE1',
    marginTop: 10,
    marginLeft: 10,
  },
  button: {
    marginTop: 80,
    alignItems: "center",
    backgroundColor: '#590DE1',
    padding: 20
  },
  disabledButton: {
    marginTop: 80,
    alignItems: "center",
    backgroundColor: 'grey',
    padding: 20
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'grey',
    paddingRight: 50,
    paddingLeft: 50,
    marginLeft: 10,
  },
  clicked: {
    borderRadius: 10,
    alignItems: "center",
    borderColor: '#590DE1',
    borderWidth: 2,
    padding: 10,
    marginLeft: 10,
    marginRight: 10,
  },
  unClicked: {
    borderRadius: 10,
    alignItems: "center",
    borderColor: 'grey',
    borderWidth: 2,
    padding: 10,
    marginLeft: 10,
    marginRight: 10,
  }
});

interface Props {
  age: number;
  height: number;
  weight: number;
  value: string;
  open: boolean;
  womanClick: boolean;
  manClick: boolean;
}



const Basic1 = ({navigation}) => {
    const [age, setAge] = useState("");
    const [height, setHeight] = useState("");
    const [weight, setWeight] = useState("");
    const [value, setValue] = useState();
    const [open, setOpen] = useState(false);
    const [womanClick, setWomanClick] = useState(false);
    const [manClick, setManClick] = useState(false);
    const [isDisabled,setIsDisabled] = useState(true);
    const genderClick1 = (womanClick) => {
      if (!womanClick){
        setManClick(false)
      } 
    }
    const genderClick2 = (manClick) => {
      if (!manClick){
        setWomanClick(false)
      } 
    }
    const [items, setItems] = useState([
      {label: '다이어트(한 달 1~2kg감량)', value: '12dec', },
      {label: '다이어트(한 달 3~4kg감량)', value: '34dec', },
      {label: '체중유지', value: 'main', },
      {label: '체중증가(한 달 1~2kg증량) ', value: '12inc', },
      {label: '체중증가(한 달 3~4kg증량)', value: '34inc', }
    ]);
    const genderSelect = () => {
      switch(true){
        case womanClick:
          return 'female';
        case manClick:
          return 'male';
        default:
          return 'not';
      } 
    }
    const gender = genderSelect();
      let target;
      let conTarget;
      switch (value){
        case '12dec' : target="한달 1~2kg감량"; conTarget="500kcal"
        break;
        case '34dec' : target="한달 3~4kg감량"; conTarget="700kcal"
        break;
        case 'main' : target="유지"; conTarget="0kcal"
        break;
        case '12inc' : target="한달 1~2kg증량"; conTarget="500kcal"
        break;
        case '34inc' : target="한달 3~4kg증량"; conTarget="700kcal"
        break;
        default: 
      }
      console.log(target)
    const basicInformation = {
      age,
      height,
      weight,
      target,
      conTarget,
      gender,
    }
    // console.log(basicInformation)
    const bmrCalcul = () => {
      if(gender === 'male') {
        return 10*weight + 6.25*height-(5*age)+5
      } else if (gender === 'female'){
        return 10*weight + 6.25*height -(5*age)-161
      }
    }
    const BMR = bmrCalcul();


    function okNext (){
      if(gender !== 'not' && age !== "" && height !== "" && weight !== ""){
       return setIsDisabled(false)
      } else {
        return setIsDisabled(true)
      }
    }
    useEffect(()=>{
      okNext();
    },[])

    return (
      <SafeAreaView >
      <ScrollView >
      <Text style={{fontSize: 30, fontWeight: 'bold', color: 'black', marginBottom: 15}}>기본 정보를 {"\n"}입력해주세요.</Text>
        <View>
          <Text style={styles.headerText}>성별</Text>
        </View>

        <View style={{flexDirection: 'row', justifyContent: 'center',marginTop: 10, padding: 20,}}>        
        <Pressable
         style={womanClick ? 
          styles.clicked : styles.unClicked
        } 
         onPress={()=>{
           genderClick1(womanClick);
           setWomanClick(!womanClick);
           }}>
         <Text style={styles.text}>여성</Text>
       </Pressable>
       <Pressable
          style={manClick ? 
            styles.clicked : styles.unClicked
          } 
         onPress={()=>{
           genderClick2(manClick);
           setManClick(!manClick)
           }}>
         <Text style={styles.text}>남성</Text>
       </Pressable>
        </View>
        <Text style={styles.headerText}>만 나이</Text>
        <TextInput style={styles.textInput} 
          placeholder="만 나이를 입력해주세요" 
          maxLength={3}
          onChangeText={setAge} 
          value={age} 
          keyboardType="numeric"  
          onSubmitEditing={()=>setAge(age)}
          />  
        <Text style={styles.headerText}>신장(cm) </Text>
        <TextInput style={styles.textInput} 
          placeholder="신장을 입력해주세요" 
          maxLength={3}
          onChangeText={setHeight} 
          value={height} 
          keyboardType="numeric" 
          onSubmitEditing={()=>setHeight(height)} >
        </TextInput>
        <Text style={styles.headerText}>몸무게(kg)</Text>
        <TextInput style={styles.textInput} 
          placeholder="몸무게를 입력해주세요" 
          onChangeText={setWeight} 
          maxLength={3}
          value={weight} 
          keyboardType="numeric" 
          onSubmitEditing={()=>okNext()} >
        </TextInput>
        <Text style={styles.headerText}>식단의 목적</Text>
        <DropDownPicker
         style={{
          borderColor: '#f0f8ff',
          marginTop : 10,
        }}
          placeholder="식단의 목적"
          open={open}
          setOpen={setOpen}
          value={value}
          items={items}
          setValue={setValue}
          setItems={setItems}
          textStyle={{ fontSize: 15}}
          listMode="SCROLLVIEW"    
        />
      <Pressable
        disabled={isDisabled}
        style={isDisabled ? styles.disabledButton : styles.button}
        onPress={()=> navigation.navigate('Basic2',{item : BMR, weight, target, conTarget})}
        >
        <Text style={{color: 'white'}}>다음</Text> 
      </Pressable>
      </ScrollView>
      </SafeAreaView>
    );
  };

export default Basic1;