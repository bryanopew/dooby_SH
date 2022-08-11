import React, {Component, useState, useEffect} from 'react';
import {
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  Button,
  Alert,
  TextInput,
  Pressable,
} from 'react-native';
import {useForm} from 'react-hook-form';
import DropDownPicker from 'react-native-dropdown-picker';
import {ScrollView} from 'react-native-gesture-handler';
import {accessTokenConfig} from '~/utils/config';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {GET_AUTH} from '~/constants/constants';
import NextButton from '~/Button/NextButton';

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: 'white',
  },
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
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: '#590DE1',
    paddingRight: 50,
    paddingLeft: 50,
    marginLeft: 10,
  },
  unClickText: {
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
    alignItems: 'center',
    borderColor: '#590DE1',
    borderWidth: 2,
    padding: 10,
    marginLeft: 10,
    marginRight: 10,
  },
  unClicked: {
    borderRadius: 10,
    alignItems: 'center',
    borderColor: 'grey',
    borderWidth: 2,
    padding: 10,
    marginLeft: 10,
    marginRight: 10,
  },
});

export interface Props {
  companyCd: string;
  userId: string;
  gender: string;
  age: string;
  height: string;
  weight: string;
  dietPurposeCd: string;
  weightTimeCd: string;
  aerobicTimeCd: string;
  calorie: string;
  carb: string;
  protein: string;
  fat: string;
}

const Input = ({label, register, required}) => (
  <>
    <label>{label}</label>
    <input {...register(label, {required})} />
  </>
);

const Basic1 = ({navigation}) => {
  const getToken = () => {
    let token = AsyncStorage.getItem('ACCESS_TOKEN');
    return token;
  };

  // useEffect(() => {
  //   getToken()
  //     .then(token =>
  //       axios.get(`http://61.100.16.155:8080/api/member/code/list-code/SP001`, {
  //         headers: {
  //           Authentication: `Bearer ${token}`,
  //         },
  //       }),
  //     )
  //     .then(res => console.log('SP001', res.data));
  // }, []);
  useEffect(() => {
    getToken()
      .then(token =>
        axios.get('http://61.100.16.155:8080/api/member/auth/re-issue-token/', {
          headers: {
            Authentication: `Bearer ${token}`,
          },
        }),
      )
      .then(res => console.log('reIssue:', res.data.refreshToken));
  }, []);

  const [age, setAge] = useState('');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [value, setValue] = useState();
  const [open, setOpen] = useState(false);
  const [womanClick, setWomanClick] = useState(false);
  const [manClick, setManClick] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [inputs, setInputs] = useState({
    genders: '',
    ages: '',
    heights: '',
    weights: '',
    dietPurposeCds: '',
  });
  const {genders, ages, heights, weights, dietPurposeCds} = inputs;
  const onChange = e => {
    const {value, genders} = e.target;
    setInputs({
      ...inputs,
      [genders]: value,
    });
  };
  const genderClick1 = womanClick => {
    if (!womanClick) {
      setManClick(false);
    }
  };
  const genderClick2 = manClick => {
    if (!manClick) {
      setWomanClick(false);
    }
  };
  const [items, setItems] = useState([
    {label: '다이어트(한 달 1~2kg감량)', value: 'SP002001'},
    {label: '다이어트(한 달 3~4kg감량)', value: 'SP002002'},
    {label: '체중유지', value: 'SP002003'},
    {label: '체중증가(한 달 1~2kg증량) ', value: 'SP002004'},
    {label: '체중증가(한 달 3~4kg증량)', value: 'SP002005'},
  ]);
  const genderSelect = () => {
    switch (true) {
      case womanClick:
        return 'female';
      case manClick:
        return 'male';
      default:
        return 'not';
    }
  };
  const gender = genderSelect();
  let target: string;
  let conTarget: any;
  switch (value) {
    case 'SP002001':
      target = '한달 1~2kg감량';
      conTarget = '500kcal';
      break;
    case 'SP002002':
      target = '한달 3~4kg감량';
      conTarget = '700kcal';
      break;
    case 'SP002003':
      target = '유지';
      conTarget = '0kcal';
      break;
    case 'SP002004':
      target = '한달 1~2kg증량';
      conTarget = '500kcal';
      break;
    case 'SP002005':
      target = '한달 3~4kg증량';
      conTarget = '700kcal';
      break;
    default:
  }
  const basicInformation2 = {
    age,
    height,
    weight,
    target,
    conTarget,
    gender,
  };
  // console.log(basicInformation2);
  const bmrCalcul = () => {
    if (gender === 'male') {
      return 10 * weight + 6.25 * height - 5 * age + 5;
    } else if (gender === 'female') {
      return 10 * weight + 6.25 * height - 5 * age - 161;
    }
  };
  const BMR = bmrCalcul();

  //다음버튼 활성화
  function okNext() {
    if (
      gender !== 'not' &&
      age !== '' &&
      height !== '' &&
      weight !== '' &&
      target !== ''
    ) {
      return setDisabled(false);
    } else {
      return setDisabled(true);
    }
  }
  useEffect(() => {
    okNext();
  }, []);

  const goNext = () => {
    navigation.navigate('Basic2');
  };
  return (
    <SafeAreaView>
      <ScrollView style={styles.wrapper}>
        <Text
          style={{
            fontSize: 30,
            fontWeight: 'bold',
            color: 'black',
            marginBottom: 15,
          }}>
          기본 정보를 {'\n'}입력해주세요.
        </Text>
        <View>
          <Text style={styles.headerText}>성별</Text>
        </View>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            marginTop: 10,
            padding: 20,
          }}>
          <Pressable
            style={womanClick ? styles.clicked : styles.unClicked}
            onPress={() => {
              genderClick1(womanClick);
              setWomanClick(!womanClick);
            }}>
            <Text style={womanClick ? styles.text : styles.unClickText}>
              여성
            </Text>
          </Pressable>
          <Pressable
            style={manClick ? styles.clicked : styles.unClicked}
            onPress={() => {
              genderClick2(manClick);
              setManClick(!manClick);
            }}>
            <Text style={manClick ? styles.text : styles.unClickText}>
              남성
            </Text>
          </Pressable>
        </View>
        <Text style={styles.headerText}>만 나이</Text>
        <TextInput
          style={styles.textInput}
          placeholder="만 나이를 입력해주세요"
          maxLength={3}
          onChangeText={setAge}
          value={age}
          keyboardType="numeric"
          onSubmitEditing={() => setAge(age)}
        />
        <Text style={styles.headerText}>신장(cm) </Text>
        <TextInput
          style={styles.textInput}
          placeholder="신장을 입력해주세요"
          maxLength={3}
          onChangeText={setHeight}
          value={height}
          keyboardType="numeric"
          onSubmitEditing={() => setHeight(height)}></TextInput>
        <Text style={styles.headerText}>몸무게(kg)</Text>
        <TextInput
          style={styles.textInput}
          placeholder="몸무게를 입력해주세요"
          onChangeText={setWeight}
          maxLength={3}
          value={weight}
          keyboardType="numeric"></TextInput>
        <Text style={styles.headerText}>식단의 목적</Text>
        <DropDownPicker
          dropDownContainerStyle={{
            position: 'relative',
            marginTop: -40,
          }}
          style={{
            borderColor: 'white',
            marginTop: 7,
          }}
          placeholder="식단의 목적"
          open={open}
          setOpen={setOpen}
          value={value}
          items={items}
          setValue={setValue}
          setItems={setItems}
          textStyle={{fontSize: 15}}
          listMode="SCROLLVIEW"
          dropDownDirection="BOTTOM"
          onChangeValue={okNext}
        />
        <Pressable
          disabled={disabled}
          style={disabled ? styles.disabledButton : styles.button}
          onPress={() =>
            navigation.navigate('Basic2', {
              item: BMR,
              weight,
              target,
              conTarget,
            })
          }>
          <Text style={{color: 'white'}}>다음</Text>
        </Pressable>
        {/* <NextButton isDisabled={isDisabled} goNext={goNext} /> */}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Basic1;
