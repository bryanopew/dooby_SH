import React, {useState} from 'react';
import {StyleSheet, Text, Pressable, SafeAreaView} from 'react-native';
const styles = StyleSheet.create({
  button: {
    marginTop: 80,
    alignItems: 'center',
    backgroundColor: '#590DE1',
    padding: 20,
  },
  disabledButton: {
    marginTop: 80,
    alignItems: 'center',
    backgroundColor: 'grey',
    padding: 20,
  },
});

const NextButton = ({isDisabled, goNext}) => {
  return (
    <>
      <Pressable
        onPress={goNext}
        disabled={isDisabled}
        style={isDisabled ? styles.disabledButton : styles.button}>
        <Text style={{color: 'white'}}>다음</Text>
      </Pressable>
    </>
  );
};

export default NextButton;
