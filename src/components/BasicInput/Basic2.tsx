import React, {Component, useState, useEffect, useCallback} from 'react';
import {
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  Button,
  Alert,
  TextInput,
  Pressable,
  BackHandler,
} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';

import WTimePicker from '~/Components/BasicInput/WTimePicker';
import ATimePicker from '~/Components/BasicInput/ATimePicker';

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: 'white',
  },
  header: {
    borderBottomWidth: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
    fontWeight: 'bold',
    marginBottom: 30,
  },
  headerText: {
    fontSize: 15,
    color: '#590DE1',
    marginBottom: 10,
  },
  button: {
    marginTop: 50,
    alignItems: 'center',
    backgroundColor: '#590DE1',
    padding: 20,
  },
  disabledButton: {
    marginTop: 80,
    alignItems: 'center',
    backgroundColor: 'grey',
    padding: 20,
  },
  box: {
    borderRadius: 10,
    alignItems: 'center',
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
  const {item, weight, target, conTarget} = route.params;
  console.log(item, target);
  const [data, setData] = useState('');
  const [aData, setAData] = useState('');
  const [base, setBase] = useState('');
  const [isDisabled, setIsDisabled] = useState(true);
  const wValue = data;
  const aValue = aData;
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
  const wcal = 0.0175 * 6 * weight * JSON.stringify(wValue);
  const acal = 0.0175 * 7 * weight * JSON.stringify(aValue);
  const AMR = wcal + acal + item * 0.2;
  function okNext() {
    if (wValue === '' || aValue === '') {
      return setIsDisabled(true);
    } else {
      return setIsDisabled(false);
    }
  }
  useEffect(() => {
    okNext();
  }, []);
  console.log('wvalue:', wValue, 'aValue:', aValue);

  return (
    <SafeAreaView style={styles.wrapper}>
      <Text
        style={{
          fontSize: 30,
          fontWeight: 'bold',
          color: 'black',
          marginBottom: 20,
        }}>
        선택 정보를 {'\n'}입력해주세요.
      </Text>
      <Text>유저의 기초대사량: {JSON.stringify(item)} </Text>
      <TextInput
        style={styles.header}
        placeholder="기초대사량을 알고 있다면 적어주세요(kcal)"
        onChangeText={setBase}
        value={base}
        keyboardType="numeric"
        onSubmitEditing={() => console.log(base)}
      />
      <Text style={styles.headerText}>웨이트 운동시간</Text>
      <WTimePicker setData={setData} />
      <Text style={styles.headerText}>유산소 운동시간</Text>
      <ATimePicker onChangeValue={okNext} setData={setAData} />
      <Pressable
        disabled={isDisabled}
        style={isDisabled ? styles.disabledButton : styles.button}
        onPress={() =>
          navigation.navigate('Basic3', {
            info: Math.round(AMR) + item,
            target,
            conTarget,
          })
        }>
        <Text style={{color: 'white'}}>다음</Text>
      </Pressable>
    </SafeAreaView>
  );
};

export default Basic2;
