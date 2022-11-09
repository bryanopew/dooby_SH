import React, {useEffect, useState} from 'react';
import {View, Text, FlatList, ScrollView} from 'react-native';
import styled from 'styled-components/native';
import colors from '../colors';
import {EvilIcons} from '@expo/vector-icons';
import {useUserInfoContext} from '../context';
import TargetNutr from '../components/TargetNutr';
import MypageBtn from '../components/MypageBtn';
import {myPageBtns} from '../pageConsts';
import {
  TextMain,
  TextSub,
  Row,
  HorizontalLine,
  VerticalLine,
} from '../styledConsts';
import LineCharts from '../components/LineCharts';
import DAlert from '../components/DAlert';
import CalChangeModalContent from '../components/CalChangeModalContent';
import {useRef} from 'react';
import NutrChangeModalContent from '../components/NutrChangeModalContent';
import Icon from 'react-native-vector-icons/Ionicons';

const Container = styled.View`
  flex: 1;
`;

const Card = styled.View`
  width: 100%;
  height: auto;
  background-color: ${colors.white};
  padding: 0px 16px 16px 16px;
  elevation: 0;
`;

const ProfileContainer = styled.View`
  margin-top: 24px;
  flex-direction: row;
  justify-content: space-between;
`;

const ProfileTextContainer = styled.View``;

const NickName = styled(TextMain)`
  font-size: 20px;
  font-weight: 700;
`;
const Hello = styled(TextMain)`
  margin-top: 4px;
  font-size: 14px;
`;

const RecommendationContainer = styled.View`
  width: 100%;
  height: 34px;
  margin-top: 24px;
  background-color: ${colors.highlight};
  justify-content: center;
  align-items: center;
`;

const Recommendation = styled(TextMain)`
  font-size: 16px;
  font-weight: 300;
`;

const UserInfoBtnContainer = styled.TouchableOpacity`
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const BtnText = styled(TextSub)``;

const TargetNutrContainer = styled.View`
  width: 100%;
  height: 50px;
  margin-top: 16px;
  flex-direction: row;
  justify-content: center;
`;

const HistoryGraphContainer = styled.View`
  flex: 1;
  margin-top: 16px;
  width: 100%;
  align-items: center;
  justify-content: center;
`;

const BtnsContainer = styled.View`
  margin-top: 24px;
  width: 100%;
  height: auto;
`;

const Mypage = () => {
  const {target, history} = useUserInfoContext();
  const [userWeightData, setUserWeightData] = useState([]);
  const [alertShow, setAlertShow] = useState('');
  const [nutrValue, setNutrValue] = useState([]);
  const nutrChangeRef = useRef([]);

  // console.log("userInfo: ", target);
  // console.log("btns: ", myPageBtns);

  useEffect(() => {
    if (history) {
      setUserWeightData(
        history.map((item, index) => ({
          label: item.date.slice(5, 10),
          value: item.weight,
        })),
      );
      // console.log("userWeightData: ", userWeightData);
    }
  }, [history]);

  const renderAlertContent = () => {
    console.log('renderAlertContent: alertShow: ', alertShow);
    switch (alertShow) {
      case 'cal':
        return (
          <CalChangeModalContent
            nutrValue={nutrValue}
            setNutrValue={setNutrValue}
            nutrChangeRef={nutrChangeRef}
          />
        );
      case 'carb':
      case 'protein':
      case 'fat':
        return (
          <NutrChangeModalContent
            nutrValue={nutrValue}
            setNutrValue={setNutrValue}
            nutrChangeRef={nutrChangeRef}
            alertShow={alertShow}
          />
        );
      default:
    }
  };
  return (
    <Container>
      <DAlert
        alertShow={alertShow}
        renderContent={renderAlertContent}
        onConfirm={() => {
          console.log('mypage confirm');
          console.log('nutr변경: ', target, '=>', nutrValue);
        }}
        onCancel={() => setAlertShow(false)}
      />
      <ScrollView>
        <Card>
          <ProfileContainer>
            <ProfileTextContainer>
              <NickName>
                섭섭 <Text style={{fontWeight: '100'}}>님</Text>
              </NickName>
              <Hello>두비가 즐거운 식단실천을 응원합니다</Hello>
            </ProfileTextContainer>
            <UserInfoBtnContainer>
              <BtnText>정보변경</BtnText>
              <Icon name="chevron-right" size={24} color={colors.textMain} />
            </UserInfoBtnContainer>
          </ProfileContainer>
          <RecommendationContainer>
            <Recommendation style={{fontWeight: '400'}}>
              계획보다 부족하면 아래 목표영양을 수정해보세요
            </Recommendation>
          </RecommendationContainer>
          <TargetNutrContainer>
            <FlatList
              horizontal
              data={target}
              renderItem={({item}) => (
                <TargetNutr
                  item={item}
                  alertShow={alertShow}
                  setAlertShow={setAlertShow}
                />
              )}
              keyExtractor={(item, index) => index}
              ItemSeparatorComponent={VerticalLine}
            />
          </TargetNutrContainer>
        </Card>
        <Card style={{marginTop: 16}}>
          <HistoryGraphContainer>
            {userWeightData ? (
              <LineCharts data={userWeightData} />
            ) : (
              <Text>Loading</Text>
            )}
          </HistoryGraphContainer>
          <BtnsContainer>
            {myPageBtns.map((btn, index) => {
              return index == myPageBtns.length ? (
                <MypageBtn page={btn} currentWeight={97} key={btn.id} />
              ) : (
                <View key={btn.id}>
                  <MypageBtn page={btn} currentWeight={97} />
                  <HorizontalLine />
                </View>
              );
            })}
          </BtnsContainer>
        </Card>
      </ScrollView>
    </Container>
  );
};

export default Mypage;

/* <BtnFlatList
            data={myPageBtns}
            renderItem={({ item }) => (
              <MypageBtn title={item} currentWeight={97} />
            )}
            keyExtractor={(item, index) => index}
            ItemSeparatorComponent={HorizontalLine}
            scrollEnabled={false}
          ></BtnFlatList> */
