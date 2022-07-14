import React, {useState} from 'react';
import DropDownPicker from 'react-native-dropdown-picker';

const ATimePicker = props => {
  const [aOpen, setAopen] = useState(false);
  const [aValue, setAvalue] = useState();

  const [atime, setAtime] = useState([
    {label: '안함', value: 'SP004001'},
    {label: '하루 30분 이하', value: 'SP004002'},
    {label: '하루 30분~1시간 이하', value: 'SP004003'},
    {label: '하루 1시간~1시간30분이하', value: 'SP004004'},
    {label: '하루 1시간30분~2시간 이하', value: 'SP004005'},
    {label: '하루 2시간 이상', value: 'SP004006'},
  ]);
  const {setData, okNext} = props;
  return (
    <>
      <DropDownPicker
        style={{
          borderColor: '#white',
          borderBottomWidth: 1,
          marginBottom: 10,
        }}
        placeholder="유산소 운동시간"
        open={aOpen}
        setOpen={setAopen}
        value={aValue}
        items={atime}
        setValue={setAvalue}
        setItems={setAtime}
        textStyle={{fontSize: 15}}
        onChangeValue={okNext}
        onPress={() => {
          setData(aValue);
        }}
      />
    </>
  );
};

export default ATimePicker;
