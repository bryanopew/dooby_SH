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
        <Text>입력된 정보를 바탕으로 계산된 결과 반영{"\n"}
        고객님의 기초대사량과 활동대사량을 추정하여 하루 총 사용하는 칼로리를 2783kcal로 계산. 한 달 2~3kg 감량을 위해 하루에 700kcal를 제한하여 한 끼 기준 727.8kcal를 추천드립니다. 탄수화물, 단백질, 지방 비율은 보건복지부 한국인 영양섭취기준(2020)에서 권장하는 비율로 설정했습니다.</Text>
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