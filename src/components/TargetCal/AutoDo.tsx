import React, {Component, useState} from 'react';
import {Button, Text, StyleSheet, Pressable} from 'react-native';

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
    fontWeight: 'bold',
  },
  emph: {
    color: 'blue',
  },
});

const Contents = props => {
  let meal = Math.round((parseInt(props.info) + parseInt(props.conTarget)) / 3);
  return (
    <Text style={styles.text}>
      고객님의 기초대사량과 활동대사량을 추정하여 하루 총 사용하는 칼로리를{' '}
      <Text style={styles.emph}>{props.info}kcal</Text>로 계산.
      <Text style={styles.emph}>{props.target}</Text>을 위해 하루에{' '}
      <Text style={styles.emph}>{props.conTarget}</Text>를 제한하여 한 끼 기준
      <Text style={styles.emph}>{meal}kcal</Text>를 추천드립니다. 탄수화물,
      단백질, 지방 비율은 보건복지부 한국인 영양섭취기준(2020)에서 권장하는
      비율로 설정했습니다.
    </Text>
  );
};

const AutoDo = props => {
  const [open, setOpen] = useState(false);
  const handleClick = () => setOpen(!open);
  return (
    <>
      <Pressable
        style={styles.button}
        onPress={() => {
          handleClick();
        }}>
        <Text>귀찮다 두비가 알아서 다 해줘!</Text>
      </Pressable>
      {open && (
        <Contents
          info={props.info}
          target={props.target}
          conTarget={props.conTarget}
        />
      )}
    </>
  );
};

export default AutoDo;
