import React, {useState} from 'react';
import DropDownPicker from 'react-native-dropdown-picker';

const ATimePicker = props => {
  const [aOpen, setAopen] = useState(false);
  const [aValue, setAvalue] = useState();

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
          borderColor: '#white',
          borderWidth: 0,
          borderBottomWidth: 1,
          marginBottom: 10,
        }}
        dropDownContainerStyle={{
          borderWidth: 0,
          width: '98%',
          marginLeft: 5,
        }}
        zIndex={2000}
        zIndexInverse={2000}
        placeholder="유산소 운동시간"
        open={aOpen}
        setOpen={setAopen}
        value={aValue}
        items={atime}
        setValue={setAvalue}
        setItems={setAtime}
        textStyle={{fontSize: 15}}
        onChangeValue={() => {
          setData(aValue);
        }}
      />
    </>
  );
};

export default ATimePicker;
