import React, {Component, useState, useEffect, useRef} from 'react';
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
import colors from '~/styles/stylesHS/colors';
import {
  BtnBottomCTA,
  BtnCTA,
  BtnText,
  ErrorBox,
  ErrorText,
  InputHeaderText,
  UserInfoTextInput,
} from '~/styles/stylesHS/styledConsts';

const dimensions = Dimensions.get('window');
const Height = Math.round(dimensions.width / 3);
const Width = dimensions.width / 3;

const Container = styled.SafeAreaView`
  flex: 1;
  background-color: ${colors.white};
  padding: 0px 16px 0px 16px;
`;

const TitleText = styled.Text`
  font-size: 24px;
  font-weight: bold;
  color: ${colors.textMain};
`;

const InputContainer = styled.View``;

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
    // 나중에 사용자 정보 있으면 초기값으로 넣어줘야함.
    defaultValues: {
      gender: 'M',
      age: '',
      height: '',
      weight: '',
      dietPurposecd: 'SP002002',
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
  const scrollRef = useRef();

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
    <Container>
      <ScrollView
        contentContainerStyle={{paddingBottom: 120}}
        showsVerticalScrollIndicator={false}
        ref={scrollRef}>
        <TitleText>기본 정보를 {'\n'}입력해주세요.</TitleText>
        <GenderSelect control={control} setValue={setValue} />
        <InputContainer>
          <InputHeaderText isActivated={ageValue}>만 나이</InputHeaderText>
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
            render={({field: {onChange, onBlur, value}}) => {
              return (
                <UserInfoTextInput
                  isActivated={ageValue}
                  placeholder="만 나이를 입력해주세요"
                  maxLength={3}
                  onChangeText={onChange}
                  value={value}
                  onBlur={handleSubmit(onSubmit)}
                  // onBlur={() => handleSubmit()} 이거랑 차이가...?!
                  keyboardType="numeric"
                  onSubmitEditing={handleSubmit(onSubmit)}
                />
              );
            }}
            name="age"
          />
          {errors.age && (
            <ErrorBox>
              <ErrorText>10~100세 사이 입력</ErrorText>
            </ErrorBox>
          )}

          <InputHeaderText isActivated={heightValue}>신장(cm) </InputHeaderText>
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
              <UserInfoTextInput
                isActivated={heightValue}
                placeholder="신장을 입력해주세요"
                maxLength={3}
                onChangeText={onChange}
                value={value}
                onBlur={handleSubmit(onSubmit)}
                keyboardType="numeric"
                onSubmitEditing={handleSubmit(onSubmit)}
              />
            )}
            name="height"
          />
          {errors.height && (
            <ErrorBox>
              <ErrorText>100~200cm 사이 입력</ErrorText>
            </ErrorBox>
          )}

          <InputHeaderText isActivated={weightValue}>
            몸무게(kg)
          </InputHeaderText>
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
              <UserInfoTextInput
                isActivated={weightValue}
                placeholder="몸무게를 입력해주세요"
                maxLength={3}
                onChangeText={onChange}
                value={value}
                onBlur={handleSubmit(onSubmit)}
                keyboardType="numeric"
                onSubmitEditing={handleSubmit(onSubmit)}
              />
            )}
            name="weight"
          />
          {errors.weight && (
            <ErrorBox>
              <ErrorText>10~150kg 사이 입력</ErrorText>
            </ErrorBox>
          )}

          <InputHeaderText isActivated={true}>식단의 목적</InputHeaderText>
          <Controller
            control={control}
            rules={{required: true}}
            render={({field: {onChange, onBlur, value}}) => (
              <DropDownPicker
                style={{
                  borderWidth: 0,
                  borderBottomWidth: 1,
                  borderColor: colors.inActivated,
                }}
                dropDownContainerStyle={{
                  position: 'relative',
                  marginTop: -44,
                  borderRadius: 0,
                  borderWidth: 1,
                  borderTopWidth: 0,
                  elevation: 3,
                  borderColor: colors.inActivated,
                  zIndex: 6000,
                }}
                selectedItemContainerStyle={{
                  backgroundColor: colors.highlight,
                }}
                showTickIcon={false}
                // placeholder={items[1]?.label} // 초기값 있으면 필요없음
                open={open}
                // setOpen={setOpen}
                value={value}
                items={items}
                setValue={onChange}
                onChangeValue={onChange}
                textStyle={{fontSize: 16}}
                listMode="SCROLLVIEW"
                dropDownDirection="BOTTOM"
                props={{
                  onPress: () => {
                    !open && scrollRef.current.scrollToEnd();
                    setOpen(open => !open);
                  },
                }}
              />
            )}
            name="dietPurposecd"
          />
          {errors.dietPurposecd && (
            <ErrorBox>
              <ErrorText>필수</ErrorText>
            </ErrorBox>
          )}
        </InputContainer>
      </ScrollView>
      <BtnBottomCTA
        disabled={!isValid}
        btnStyle={isValid ? 'activated' : 'inactivated'}
        onPress={() => {
          navigation.navigate('Basic2', {
            item: BMR,
            weightValue,
            target,
            conTarget,
          });
        }}>
        <BtnText>다음</BtnText>
      </BtnBottomCTA>
    </Container>
  );
};

export default Basic1;
