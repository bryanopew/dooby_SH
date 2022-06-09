
import React, { Component, useState, useEffect } from 'react';
import { StyleSheet, SafeAreaView, View, Text, Button, Alert, TextInput, Pressable, BackHandler } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';


const styles = StyleSheet.create({
 
  header: {
    borderBottomWidth: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
    fontWeight: 'bold',
    marginBottom: 30
  },
  headerText: {
    fontSize: 15,
    color: '#590DE1',
    marginBottom: 10

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


const Basic2 = ({route, navigation}) => {
   const {item, weight} = route.params
   console.log(item)
   console.log(weight)
    const [base, setBase] = useState("");
    const [wValue, setWvalue] = useState();
    const [aValue, setAvalue] = useState();
    const [wOpen, setWopen] = useState(false);
    const [aOpen, setAopen] = useState(false);
    const [wtime, setWtime] = useState([
      {label: '하루 30분 이하', value: 0, },
      {label: '하루 30분~1시간 이하', value: 30, },
      {label: '하루 1시간~1시간30분이하', value: 60, },
      {label: '하루 1시간30분~2시간 이하', value: 90, },
      {label: '하루 2시간 이상', value: 120, },
    ]);
    const [atime, setAtime] = useState([
      {label: '하루 30분 이하', value: 0, },
      {label: '하루 30분~1시간 이하', value: 30, },
      {label: '하루 1시간~1시간30분이하', value: 60, },
      {label: '하루 1시간30분~2시간 이하', value: 90, },
      {label: '하루 2시간 이상', value: 120, },
    ]);
    
    // 1. (활동대사량 = 0.0175 * Mets * 몸무게 * 운동시간(분))
    //  웨이트 운동 METs 값은 6으로 계산
    //  유산소 운동 METs 값은 7로 계산
    // 3. 기초대사량*0.2 (일상생활할 때 평균적으로 쓰이는 칼로리)

    // 30분이하 -> 0
    // 30분~1시간 -> 30
    // 1시간~1시간30분 -> 60
    // 1시간30분~2시간 -> 90
    // 2시간이상 -> 120

    // const AMR = wcal + acal + BMR*0.2
    // wcal = 0.0175*6*weight*wtime
    // acal = 0.0175*7*weight*atime
    // time 값은
    // if(value = w1) => 0
    // if(value = w2) => 30
    // if(value = w3) => 60
    // if(value = w4) => 90
    // if(value = w5) => 120
    const wcal = 0.0175*6*weight*JSON.stringify(wValue)
    const acal = 0.0175*7*weight*JSON.stringify(aValue)
    console.log(wcal, '웨이트 대사량')
    console.log(acal, '유산소 대사량')
    const AMR = wcal + acal + item*0.2
    console.log(AMR);
    return (
      <SafeAreaView>
      <Text style={{fontSize: 30, fontWeight: 'bold', color: 'black', marginBottom: 20}}>선택 정보를 {"\n"}입력해주세요.</Text>
       <Text>유저의 기초대사량: {JSON.stringify(item)} </Text>
        <TextInput style={styles.header} 
          placeholder="기초대사량을 알고 있다면 적어주세요(kcal)" 
          onChangeText={setBase} 
          value={base} 
          keyboardType="numeric"  
          onSubmitEditing={()=>console.log(base)}
          />  
        <Text style={styles.headerText}>웨이트 운동시간</Text>
        <DropDownPicker
         style={{
          borderColor: '#f0f8ff',
          borderBottomWidth: 1,
          marginBottom: 10,
        }}
          placeholder="웨이트 운동시간"
          open={wOpen}
          setOpen={setWopen}
          value={wValue}
          items={wtime}
          setValue={setWvalue}
          setItems={setWtime}
          textStyle={{ fontSize: 15}}
          onPress={() => console.log('웨이트', wValue)}
        />
        <Text style={styles.headerText}>유산소 운동시간</Text>
        <DropDownPicker
         style={{
          borderColor: '#f0f8ff',
          borderBottomWidth: 1,
        }}
          zIndex={3000}
          zIndexInverse={1000}
          placeholder="유산소 운동시간"
          open={aOpen}
          setOpen={setAopen}
          value={aValue}
          items={atime}
          setValue={setAvalue}
          setItems={setAtime}
          textStyle={{ fontSize: 15}}
          onPress={() => console.log('유산소', aValue)}
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