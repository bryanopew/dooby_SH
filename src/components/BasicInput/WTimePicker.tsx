import React, {useState} from 'react';
import DropDownPicker from 'react-native-dropdown-picker';

const WTimePicker = props => {
  const [wOpen, setWopen] = useState(false);
  const [wValue, setWvalue] = useState();

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
        zIndex={3000}
        zIndexInverse={1000}
        style={{
          borderWidth: 0,
          borderBottomWidth: 1,
          marginBottom: 10,
        }}
        dropDownContainerStyle={{
          borderWidth: 0,
          width: '98%',
          marginLeft: 5,
        }}
        placeholder="웨이트 운동시간"
        open={wOpen}
        setOpen={setWopen}
        value={wValue}
        items={wtime}
        setValue={setWvalue}
        setItems={setWtime}
        textStyle={{fontSize: 15}}
        onChangeValue={() => {
          setData(wValue);
        }}
      />
    </>
  );
};

export default WTimePicker;
