import React, {useState} from 'react';
import DropDownPicker from 'react-native-dropdown-picker';

const WTimePicker = props => {
  const [wOpen, setWopen] = useState(false);
  const [wValue, setWvalue] = useState();

  const [wtime, setWtime] = useState([
    {label: '안함', value: 'SP003001'},
    {label: '하루 30분 이하', value: 'SP003002'},
    {label: '하루 30분~1시간 이하', value: 'SP003003'},
    {label: '하루 1시간~1시간30분이하', value: 'SP003004'},
    {label: '하루 1시간30분~2시간 이하', value: 'SP003005'},
    {label: '하루 2시간 이상', value: 'SP003006'},
  ]);
  const {setData, openToggle} = props;
  return (
    <>
      <DropDownPicker
        style={{
          borderColor: '#white',
          borderBottomWidth: 1,
          marginBottom: 10,
          zIndex: -1,
        }}
        placeholder="웨이트 운동시간"
        open={wOpen}
        setOpen={setWopen}
        value={wValue}
        items={wtime}
        setValue={setWvalue}
        setItems={setWtime}
        textStyle={{fontSize: 15}}
        onPress={() => {
          setData(wValue);
        }}
      />
    </>
  );
};

export default WTimePicker;
