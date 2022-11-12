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
        style={{
          borderWidth: 0,
          borderBottomWidth: 1,
          borderColor: colors.inActivated,
        }}
        dropDownContainerStyle={{
          position: 'relative',
          marginTop: -44,
          paddingBottom: 4,
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
