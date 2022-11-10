import React, {useState} from 'react';
import DropDownPicker from 'react-native-dropdown-picker';
import colors from '~/styles/stylesHS/colors';

const ATimePicker = props => {
  const [aOpen, setAopen] = useState(false);
  const [aValue, setAvalue] = useState('SP004001');

  const [atime, setAtime] = useState([
    {label: '하루 30분 이하', value: 'SP004001'},
    {label: '하루 30분~1시간 이하', value: 'SP004002'},
    {label: '하루 1시간~1시간30분이하', value: 'SP004003'},
    {label: '하루 1시간30분~2시간 이하', value: 'SP004004'},
    {label: '하루 2시간 이상', value: 'SP004005'},
  ]);
  const {setData, okNext} = props;
  return (
    <>
      <DropDownPicker
        dropDownContainerStyle={{
          position: 'relative',
          marginTop: -48,
          borderRadius: 0,
          borderWidth: 0,
          borderTopWidth: 1,
          borderColor: colors.line,
          elevation: 2, // 안드로이드. ios는 적용 다름
        }}
        style={{
          borderColor: '#white',
          borderWidth: 0,
          borderBottomWidth: 1,
          marginBottom: 10,
        }}
        selectedItemContainerStyle={{
          backgroundColor: colors.highlight,
        }}
        textStyle={{fontSize: 16}}
        showTickIcon={false}
        // placeholder="유산소 운동시간"
        open={aOpen}
        setOpen={setAopen}
        value={aValue}
        items={atime}
        setValue={setAvalue}
        onChangeValue={() => {
          setData(aValue);
        }}
        listMode="SCROLLVIEW"
        dropDownDirection="BOTTOM"
      />
    </>
  );
};

export default ATimePicker;
