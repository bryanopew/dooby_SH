import {View, Text, Image} from 'react-native';
import React, {useEffect, useState} from 'react';
import styled from 'styled-components/native';
import {colors} from '~/constants/constants';
import colorsHs from '~/styles/stylesHS/colors';
import {useDispatch} from 'react-redux';
import {useSelector} from 'react-redux';
import {addCart, selectCart} from '~/stores/slices/addDietSlice';
import {removeAll} from '~/stores/slices/basketSlice';
import {cleanCalorieBar} from '~/stores/slices/calorieBarSlice';
import DropDownPicker from 'react-native-dropdown-picker';

const Container = styled.View`
  flex: 1;
`;

const AddDietButton = ({onRefresh}) => {
  const dispatch = useDispatch();
  const content = useSelector((state: RootState) => {
    return state.basketProduct.cart;
  });
  const selectedCart = useSelector((state: RootState) => {
    return state.addDiet.selected;
  });
  const dietContent = useSelector((state: RootState) => {
    return state.addDiet.cartsArray;
  });
  const cartPage = useSelector((state: RootState) => {
    return state.addDiet.selectedCartPage;
  });
  console.log('Home/cartPage', cartPage);
  const picked = useSelector((state: RootState) => {
    return state.addDiet.pick;
  });
  const [value, setValue] = useState();
  const [open, setOpen] = useState(false);
  const [state, setState] = useState(1);
  const [items, setItems] = useState([
    {
      label: '식단 1',
      value: 1,
      icon: () => (
        <Image
          source={require('~/Assets/Images/24_searchCancel.png')}
          style={{
            transform: [{scale: 100}],
          }}
        />
      ),
    },
    {label: '식단 추가하기', value: 'add'},
  ]);
  const createCart = () => {
    dispatch(addCart(content));
  };
  //식단 추가하기 순서 정렬
  const selectDiet = i => {
    if (i === undefined) {
      return [{calorie: 0, carb: 0, protein: 0, fat: 0}];
    }
    return console.log('성공', dietContent[i - 1]);
  };
  const changeItemOrder = function (list, targetIdx, moveValue) {
    if (list.length < 0) return;
    const newPosition = targetIdx + moveValue;
    if (newPosition < 0 || newPosition >= list.length) return;
    const tempList = JSON.parse(JSON.stringify(list));
    const target = tempList.splice(targetIdx, 1)[0];
    tempList.splice(newPosition, 0, target);
    return tempList;
  };
  const orderedItems = changeItemOrder(items, 1, items.length - 2);
  const onIncrease = () => {
    return setState(prev => prev + 1);
  };
  const addDiet = () => {
    onIncrease();
    setItems([...items, {label: `식단 ${state + 1}`, value: state + 1}]);
    createCart();
    onRefresh();
    dispatch(removeAll());
    dispatch(cleanCalorieBar());
    dispatch(selectCart(items.length));
  };
  useEffect(() => {
    setValue(cartPage);
    onRefresh();
  }, [cartPage]);
  const removediet = () => {};
  return (
    <Container>
      <DropDownPicker
        style={{
          width: '100%',
          height: 48,
          borderWidth: 0,
          paddingLeft: -10,
        }}
        // textStyle={{fontSize: 16, color: colorsHs.textMain}}
        labelStyle={{
          fontSize: 20,
          fontWeight: 'bold',
          marginRight: 10,
          color: colorsHs.textMain,
        }}
        dropDownContainerStyle={{
          position: 'relative',
          width: 150,
          marginTop: -50,
          borderRadius: 4,
          borderWidth: 1,
          elevation: 3,
          borderColor: colors.inActivated,
          backgroundColor: colors.white,
        }}
        listItemLabelStyle={{
          color: colorsHs.textMain,
          fontWeight: 'normal',
          fontSize: 16,
        }}
        selectedItemContainerStyle={{
          backgroundColor: 'white',
        }}
        selectedItemLabelStyle={{
          color: colorsHs.main,
        }}
        arrowIconStyle={{marginLeft: -10}}
        itemSeparator={true}
        itemSeparatorStyle={{
          backgroundColor: colorsHs.inActivated,
        }}
        placeholder="식단1"
        open={open}
        setOpen={setOpen}
        value={value}
        items={orderedItems}
        onSelectItem={item => {
          item.value === 'add'
            ? addDiet()
            : (dispatch(selectCart(item.value)), onRefresh());
        }}
        onChangeValue={value => {
          value === 'add' ? setValue(items.length - 1) : setValue(value);
        }}
        setValue={setValue}
        setItems={setItems}
        listMode="SCROLLVIEW"
        dropDownDirection="BOTTOM"
      />
    </Container>
  );
};

export default AddDietButton;
