import React, {useState} from 'react';
import DropDownPicker from 'react-native-dropdown-picker';
import colors from '~/styles/stylesHS/colors';

const WTimePicker = props => {
  const [wOpen, setWopen] = useState(false);
  const [wValue, setWvalue] = useState('SP003001');

  const [wtime, setWtime] = useState([
    {label: '하루 30분 이하', value: 'SP003001'},
    {label: '하루 30분~1시간 이하', value: 'SP003002'},
    {label: '하루 1시간~1시간30분이하', value: 'SP003003'},
    {label: '하루 1시간30분~2시간 이하', value: 'SP003004'},
    {label: '하루 2시간 이상', value: 'SP003005'},
  ]);
  const {setData, openToggle} = props;
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
          borderColor: 'white',
        }}
        selectedItemContainerStyle={{
          backgroundColor: colors.highlight,
        }}
        textStyle={{fontSize: 16}}
        showTickIcon={false}
        // placeholder="웨이트 운동시간"
        open={wOpen}
        setOpen={setWopen}
        value={wValue}
        items={wtime}
        setValue={setWvalue}
        onChangeValue={() => {
          setData(wValue);
        }}
        listMode="SCROLLVIEW"
        dropDownDirection="BOTTOM"
      />
    </>
  );
};

export default WTimePicker;
