import React, {Component, useState} from 'react';
import {
  Button,
  Text,
  StyleSheet,
  Pressable,
  TextInput,
  View,
} from 'react-native';

const styles = StyleSheet.create({
  button: {
    marginTop: 10,
    marginBottom: 10,
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 20,
    color: 'grey',
  },
  contents: {
    marginTop: 10,
    marginBottom: 10,
  },
  text: {
    color: '#590DE1',
    fontWeight: 'bold',
  },
  result: {
    marginTop: 10,
    color: 'black',
    fontWeight: 'bold',
  },
});

const Contents = () => {
  return (
    <>
      <Text style={styles.text}>한끼 탄수화물(g)입력 (추천: 100g)</Text>
      <TextInput placeholder="0g" keyboardType="numeric" />
      <Text style={styles.text}>한끼 단백질(g)입력 (추천: 43g)</Text>
      <TextInput placeholder="0g" keyboardType="numeric" />
      <Text style={styles.text}>한끼 지방(g)입력 (추천: 16g)</Text>
      <TextInput placeholder="0g" keyboardType="numeric" />
      <Result />
    </>
  );
};

const Result = () => {
  return <Text style={styles.result}>계산된 결과 반영</Text>;
};

const Manual = () => {
  const [open, setOpen] = useState(false);
  const handleClick = () => setOpen(!open);
  return (
    <>
      <Pressable style={styles.button} onPress={handleClick}>
        <Text>각 영양 성분 직접 입력(고수용)</Text>
      </Pressable>
      {open && <Contents />}
    </>
  );
};

export default Manual;
