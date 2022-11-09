import {ScrollView, Modal, Dimensions, Alert} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  useUserInfoContext,
  useSetUserInfoContext,
  useInputValuesContext,
  useSetInputValuesContext,
  useComponentRefContext,
} from '../context';
import styled from 'styled-components/native';
import colors from '../colors';
import {deleteUserAddress, modifyUserAddress} from '../pageConsts';
import {
  BtnCTA,
  BtnText,
  HorizontalSpace,
  Row,
  TextMain,
  TextSub,
} from '../styledConsts';
import AnimationTextForm from '../components/AnimationTextForm';
import Postcode from '@actbase/react-daum-postcode';
import {MaterialIcons} from '@expo/vector-icons';
import Icon from 'react-native-vector-icons/Ionicons';

const {width: SCREENWIDTH, height: SCREENHEIGHT} = Dimensions.get('window');

const Container = styled.View`
  flex: 1;
  padding: 0px 16px 8px 16px;
  background-color: ${colors.white};
`;

const PostalCode = styled(TextSub)`
  font-size: 16px;
`;

const AddressDeleteBtn = styled.TouchableOpacity`
  width: 24px;
  height: 24px;
`;

const AddressBase = styled(TextMain)`
  font-size: 20px;
  margin-top: 16px;
`;

const AddressEditBtn = styled(BtnCTA)`
  height: 48px;
`;
const AddressConfirmBtn = styled(BtnCTA)`
  margin-top: 8px;
`;
const ModalBackGround = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: #000000a6;
`;

const AddressEdit = ({navigation, route}) => {
  // context
  const userData = useUserInfoContext();
  const setUserData = useSetUserInfoContext();
  const componentRef = useComponentRefContext();
  const inputValues = useInputValuesContext();
  const setInputValues = useSetInputValuesContext();
  // state
  const [modalVisible, setModalVisible] = useState(false);
  const [addressId, setAddressId] = useState(route.params.addressId);
  const [isCreated, setIsCreated] = useState(false);
  const [postalCode, setPostalCode] = useState(
    addressId != null && userData?.address[addressId]?.postalCode
      ? userData?.address[addressId]?.postalCode
      : '',
  );
  const [addressBase, setAddressBase] = useState(
    addressId != null && userData?.address[addressId]?.addressBase
      ? userData?.address[addressId]?.addressBase
      : '',
  );
  const defaultAddressDetail =
    addressId != null && userData?.address[addressId]?.addressDetail
      ? userData?.address[addressId]?.addressDetail
      : '';

  useEffect(() => {
    let arr = [...inputValues];
    arr[2] = defaultAddressDetail;
    setInputValues(arr);
  }, []);

  return (
    <Container>
      <ScrollView>
        {addressId != null ? (
          <>
            <Row style={{marginTop: 24, justifyContent: 'space-between'}}>
              <PostalCode>우편번호: {postalCode}</PostalCode>
              <AddressDeleteBtn
                onPress={() => {
                  console.log('delete!');
                  if (userData.address.length == 0) {
                    console.log('address Data 이미 없음');
                    setPostalCode('');
                    setAddressBase('');
                    setAddressId(null);
                    return;
                  }
                  const deletedData = deleteUserAddress(userData, addressId);
                  setUserData(deletedData);
                  navigation.navigate('BottomTabNav', {
                    screen: 'Order',
                    params: {
                      isEdited: true,
                      isDeleted: true,
                      isCreated: isCreated,
                      editedId: addressId,
                    },
                  });
                }}>
                <Icon name="cancel" size={24} color={colors.inActivated} />
              </AddressDeleteBtn>
            </Row>
            <AddressBase>{addressBase}</AddressBase>
            <HorizontalSpace height={8} />
            <AnimationTextForm
              placeholder="상세주소"
              refId={2}
              componentRef={componentRef}
              inputValues={inputValues}
              setInputValues={setInputValues}
              autoFocusNext={false}
              defaultValue={defaultAddressDetail}
            />
          </>
        ) : null}
      </ScrollView>

      <AddressEditBtn
        btnStyle="border"
        onPress={() => {
          setModalVisible(true);
        }}>
        <BtnText style={{color: colors.textSub, fontSize: 14}}>
          {addressId == null ? `주소 추가` : `주소 전체변경`}
        </BtnText>
      </AddressEditBtn>
      <AddressConfirmBtn
        btnStyle="activated"
        onPress={() => {
          console.log('confirm!');
          if (addressId != null) {
            const modifiedData = modifyUserAddress(
              userData,
              addressId,
              postalCode,
              addressBase,
              inputValues[2],
            );
            console.log(modifiedData);
            setUserData(modifiedData); // 추가로 서버에 저장도!
          }
          navigation.navigate('BottomTabNav', {
            screen: 'Order',
            params: {
              isEdited: true,
              isCreated: isCreated,
              isDeleted: false,
              editedId: addressId,
            },
          });
        }}>
        <BtnText>확인</BtnText>
      </AddressConfirmBtn>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <ModalBackGround>
          <Postcode
            style={{width: SCREENWIDTH - 32, height: SCREENHEIGHT / 2}}
            jsOptions={{animation: true, hideMapBtn: false}}
            onSelected={data => {
              console.log(data);
              if (addressId == null) {
                setAddressId(userData.address.length);
                setIsCreated(true);
              }
              setPostalCode(data.zonecode);
              setAddressBase(data.roadAddress);
              setModalVisible(false);
            }}
          />
        </ModalBackGround>
      </Modal>
    </Container>
  );
};

export default AddressEdit;
