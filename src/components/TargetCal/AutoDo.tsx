import React, { Component, useState } from 'react';
import { Button, Text, StyleSheet, Pressable } from 'react-native';


const styles = StyleSheet.create({
    button: {
        marginTop: 10,
        marginBottom: 10,
        alignItems: "center",
        backgroundColor: 'white',
        padding: 20,
        color: 'grey'
      },
    contents: {
        marginTop: 10,
        marginBottom: 10,
    }
})

const Contents = () => {
    return(
        <Text>입력된 정보를 바탕으로 계산된 결과 반영</Text>
    )
}

const AutoDo = () => {
    const [open, setOpen] = useState(false);
    const handleClick = () =>setOpen(!open);
    return(
        <>
        <Pressable style={styles.button} onPress={handleClick}><Text>귀찮다 두비가 알아서 다 해줘!</Text></Pressable>
       {open && <Contents />}
        </>
    )
}

export default AutoDo;