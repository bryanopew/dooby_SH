import React, {useEffect, useRef, useState, Component} from 'react';
import {
  View,
  StyleSheet,
  Text,
  Animated,
  TouchableWithoutFeedback,
  Dimensions,
  PanResponder,
  Button,
  TouchableOpacity,
  ScrollView,
  Platform,
  Image,
  SafeAreaView,
} from 'react-native';
import Modal from 'react-native-modal';
import styled from 'styled-components/native';
import CheckBox from '@react-native-community/checkbox';
import {useSelector, useDispatch} from 'react-redux';

import {Slider} from '~/Components/HomeCompo/FilterSubComponent/Slider/Slider';
import {SliderContainer} from '~/Components/HomeCompo/FilterSubComponent/Slider/SliderContainer';
import {CheckSquare} from '~/Components/custom-check-square';

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: 'white',
  },
  button: {
    right: 10,
    position: 'absolute',
    backgroundColor: '#590DE1',
    width: 25,
    height: 25,
    marginTop: 20,
    borderRadius: 35,

    ...Platform.select({
      ios: {
        shadowColor: 'rgba(0,0,0,0.2)',
        shadowOpacity: 1,
        shadowOffset: {height: 2, width: 2},
        shadowRadius: 2,
      },

      android: {
        elevation: 0,
      },
    }),
  },

  text: {
    fontSize: 18,
    textAlign: 'center',
    color: 'white',
  },
  textInput: {
    borderColor: 'black',
    borderWidth: 1,
  },
  container: {
    position: 'absolute',

    backgroundColor: 'white',
  },
});
const aboveThumbStyles = StyleSheet.create({
  gramContainer: {
    alignItems: 'center',
    height: 20,
    justifyContent: 'center',
    marginLeft: 2,
  },
  kcalContainer: {
    alignItems: 'center',
    height: 20,
    justifyContent: 'center',
  },
});
const customTrackStyle = StyleSheet.create({
  track: {
    borderColor: '#E5E5E5',
    borderWidth: 1,
  },
  trackOn: {
    borderColor: '#590DE1',
    borderWidth: 1,
  },
});
const renderBelowKcal = (value: number, index: number) => {
  return (
    <View style={aboveThumbStyles.kcalContainer}>
      <Text>{index}원</Text>
    </View>
  );
};
//최외각에서 뷰들을 감싸는 Container
const StyledSafeAreaView = styled.SafeAreaView`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const StyledModalContainer = styled.View`
  flex-direction: column;
  align-items: center;
  /* 모달창 크기 조절 */
  width: 320px;
  height: 400px;
  background-color: rgba(255, 255, 255, 1);
  border-radius: 10px;
`;

const StyledModalButton = styled.TouchableOpacity`
  /* Modal Button들의 모달창 내의 높이를 균일하게 하기 위하여 flex를 줌 */
  flex: 1;
  width: 320px;
  justify-content: center;
`;

// 모달창 내에서 버튼으로 활용되지 않는 타이틀 부분은 View 만듬
const StyledModalGradeWrapper = styled.View`
  flex: 1;
  width: 320px;
  justify-content: center;
`;

const StyledModalGradeText = styled.Text`
  align-self: center;
  font-size: 15px;
`;

const StyledModalText = styled.Text`
  align-self: center;
  color: black;
  font-size: 15px;
  margin: 10px;
`;

const HorizentalLine = styled.View`
  margin-top: 20px;
  background-color: grey;
  height: 1px;
  align-self: stretch;
`;

const StyledModalOpenButton = styled.TouchableOpacity`
  height: 50px;
  width: 60%;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  border-width: 1px;
  border-color: rgba(0, 0, 0, 1);
`;

const StyledModalOutputText = styled.Text`
  color: black;
  font-size: 30px;
`;
const RowContainer = styled.View`
  flex-direction: row;
`;

const Space = styled.View`
  width: 300px;
`;
const EachCheckBoxAndroid = () => {
  const [state, setState] = useState(true);
  const checked = useSelector((state: RootState) => {
    return state.checkBox.check;
  });
  const cartCheckAll = () => {
    setState(!state);
  };
  useEffect(() => {
    cartCheckAll();
  }, [checked]);
  return (
    <View style={styles.container}>
      <CheckBox
        value={state}
        onValueChange={value => setState(value)}
        tintColors={{true: '#30D158'}}
      />
    </View>
  );
};
const start = () => {
  console.log('성공');
};
const end = () => {
  console.log('end');
};
const change = () => {
  console.log('change');
};

const Profile = (Props: any): React.ReactElement => {
  //State를 이용하여 Modal을 제어함
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  //Output을 State로 받아서 화면에 표출하거나 정보 값으로 활용
  const [modalOutput, setModalOutput] = useState<string>('Open Modal');
  return (
    <>
      <CheckSquare
        onCheck={(isCheck: any) => {
          if (isCheck) {
            console.log('check');
          } else {
            console.log('uncheck');
          }
        }}
        isCheck={console.log('??')}
        style={{
          width: 20,
          height: 20,
          borderWidth: 1,
        }}
      />
      <Text>프로필</Text>
    </>
  );
};

export default Profile;
