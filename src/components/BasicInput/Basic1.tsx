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
  Dimensions,
} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import {ScrollView} from 'react-native-gesture-handler';
import {accessTokenConfig} from '~/utils/config';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styled from 'styled-components/native';
import {useForm, Controller, useWatch} from 'react-hook-form';

import {GET_AUTH} from '~/constants/constants';
import NextButton from '~/Button/NextButton';
import GenderSelect from '~/Components/BasicInput/BasicInputComponents/GenderSelect';

const dimensions = Dimensions.get('window');
const Height = Math.round(dimensions.width / 3);
const Width = dimensions.width / 3;

const InputContainer = styled.View`
  margin-left: 16px;
  margin-right: 16px;
`;
const ErrorText = styled.Text`
  font-size: 16px;
  color: #ffffff;
  margin-left: 10px;
`;
const ErrorBox = styled.View`
  background-color: #ff6060;
  border-radius: 3px;
  width: 288px;
  left: 90px;
  height: 24px;
  opacity: 1;
`;

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: 'white',
  },
  textInput: {
    borderBottomWidth: 0.2,
    borderColor: '#E5E5E5',
    justifyContent: 'center',
    alignItems: 'flex-start',
    fontWeight: 'bold',
  },
  onTextInput: {
    borderBottomWidth: 1,
    borderColor: '#590DE1',
    justifyContent: 'center',
    alignItems: 'flex-start',
    fontWeight: 'bold',
  },
  headerText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'white',
    marginTop: 10,
  },
  onHeaderText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#590DE1',
    marginTop: 10,
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
    fontSize: 14,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: '#590DE1',
    paddingRight: 50,
    paddingLeft: 50,
    marginLeft: 10,
  },
  unClickText: {
    fontSize: 14,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'grey',
    paddingRight: 50,
    paddingLeft: 50,
    marginLeft: 10,
  },
  clicked: {
    borderRadius: 4,
    alignItems: 'center',
    borderColor: '#590DE1',
    borderWidth: 1,
    padding: 10,
    marginLeft: 8,
    marginRight: 16,
  },
  unClicked: {
    borderRadius: 4,
    alignItems: 'center',
    borderColor: 'grey',
    borderWidth: 1,
    padding: 10,
    marginLeft: 8,
    marginRight: 16,
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

const Basic1 = ({navigation}) => {
  const {
    control,
    handleSubmit,
    setValue,
    formState: {errors, isValid},
  } = useForm({
    defaultValues: {
      gender: '',
      age: '',
      height: '',
      weight: '',
      dietPurposecd: '',
    },
  });
  const onSubmit = data => console.log(data);
  const onError = (errors, e) => console.log(errors, e);
  const ageValue = useWatch({control, name: 'age'});
  const heightValue = useWatch({control, name: 'height'});
  const weightValue = useWatch({control, name: 'weight'});
  const genderValue = useWatch({control, name: 'gender'});
  const dietPurposeValue = useWatch({control, name: 'dietPurposecd'});
  const getToken = () => {
    let token = AsyncStorage.getItem('ACCESS_TOKEN');
    return token;
  };
  const getRefreshToken = () => {
    let refreshToken = AsyncStorage.getItem('REFRESH_TOKEN');
    return refreshToken;
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

  // useEffect(() => {
  //   getToken()
  //     .then(token =>
  //       axios.get('http://61.100.16.155:8080/api/member/auth/re-issue-token/', {
  //         headers: {
  //           Authentication: `Bearer ${token}`,
  //         },
  //       }),
  //     )
  //     .then(res => console.log('reIssue:', res.data.refreshToken));
  // }, []);
  const [age, setAge] = useState('');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [pick, setPick] = useState();
  const [open, setOpen] = useState(false);

  const [items, setItems] = useState([
    {label: '다이어트(한 달 1~2kg감량)', value: 'SP002001'},
    {label: '다이어트(한 달 3~4kg감량)', value: 'SP002002'},
    {label: '체중유지', value: 'SP002003'},
    {label: '체중증가(한 달 1~2kg증량) ', value: 'SP002004'},
    {label: '체중증가(한 달 3~4kg증량)', value: 'SP002005'},
  ]);

  let target: string;
  let conTarget: any;
  switch (dietPurposeValue) {
    case 'SP002001':
      target = '한달 1~2kg감량';
      conTarget = '-500kcal';
      break;
    case 'SP002002':
      target = '한달 3~4kg감량';
      conTarget = '-700kcal';
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

  const bmrCalcul = () => {
    if (genderValue === 'M') {
      return 10 * weightValue + 6.25 * heightValue - 5 * ageValue + 5;
    } else if (genderValue === 'F') {
      return 10 * weightValue + 6.25 * heightValue - 5 * ageValue - 161;
    }
  };
  const BMR = bmrCalcul();
  return (
    <SafeAreaView>
      <ScrollView style={styles.wrapper}>
        <Text
          style={{
            fontSize: 24,
            fontWeight: 'bold',
            color: '#444444',
            marginBottom: 15,
            padding: 15,
          }}>
          기본 정보를 {'\n'}입력해주세요.
        </Text>
        <GenderSelect control={control} setValue={setValue} />
        <InputContainer>
          <Text style={ageValue ? styles.onHeaderText : styles.headerText}>
            만 나이
          </Text>
          <Controller
            control={control}
            rules={{
              required: true,
              maxLength: 3,
              validate: {
                positive: v => parseInt(v) >= 10,
                lessThan: v => parseInt(v) <= 100,
              },
            }}
            render={({field: {onChange, onBlur, value}}) => (
              <TextInput
                style={ageValue ? styles.onTextInput : styles.textInput}
                placeholder="만 나이를 입력해주세요"
                maxLength={3}
                onChangeText={onChange}
                value={value}
                keyboardType="numeric"
                onSubmitEditing={handleSubmit(onSubmit)}
              />
            )}
            name="age"
          />
          {errors.age && (
            <ErrorBox>
              <ErrorText>10~100세 사이 입력</ErrorText>
            </ErrorBox>
          )}

          <Text style={heightValue ? styles.onHeaderText : styles.headerText}>
            신장(cm){' '}
          </Text>
          <Controller
            control={control}
            rules={{
              required: true,
              maxLength: 3,
              validate: {
                positive: v => parseInt(v) >= 100,
                lessThan: v => parseInt(v) <= 200,
              },
            }}
            render={({field: {onChange, onBlur, value}}) => (
              <TextInput
                style={heightValue ? styles.onTextInput : styles.textInput}
                placeholder="신장을 입력해주세요"
                maxLength={3}
                onChangeText={onChange}
                value={value}
                keyboardType="numeric"
                onSubmitEditing={handleSubmit(onSubmit)}
              />
            )}
            name="height"
          />
          {errors.height && <ErrorText>100~200cm 사이 입력</ErrorText>}

          <Text style={weightValue ? styles.onHeaderText : styles.headerText}>
            몸무게(kg)
          </Text>
          <Controller
            control={control}
            rules={{
              required: true,
              maxLength: 3,
              validate: {
                positive: v => parseInt(v) >= 10,
                lessThan: v => parseInt(v) <= 150,
              },
            }}
            render={({field: {onChange, onBlur, value}}) => (
              <TextInput
                style={weightValue ? styles.onTextInput : styles.textInput}
                placeholder="몸무게를 입력해주세요"
                maxLength={3}
                onChangeText={onChange}
                value={value}
                keyboardType="numeric"
                onSubmitEditing={handleSubmit(onSubmit)}
              />
            )}
            name="weight"
          />
          {errors.weight && <ErrorText>10~150kg 사이 입력</ErrorText>}

          <Text style={styles.onHeaderText}>식단의 목적</Text>
          <Controller
            control={control}
            rules={{required: true}}
            render={({field: {onChange, onBlur, value}}) => (
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
                setValue={onChange}
                onChangeValue={onChange}
                textStyle={{fontSize: 15}}
                listMode="SCROLLVIEW"
                dropDownDirection="BOTTOM"
              />
            )}
            name="dietPurposecd"
          />
          {errors.dietPurposecd && <ErrorText>필수</ErrorText>}
        </InputContainer>
        <Pressable
          disabled={!isValid}
          style={isValid ? styles.button : styles.disabledButton}
          onPress={() => {
            navigation.navigate('Basic2', {
              item: BMR,
              weightValue,
              target,
              conTarget,
            });
          }}>
          <Text style={{color: 'white'}}>다음</Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Basic1;
