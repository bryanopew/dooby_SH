import styled from 'styled-components/native';

export const nutrientStyle = {
  BarView: styled.View`
    flex: 1;
    width: 40%;
    padding: 0 15px;
    margin-top: 20px;
  `,

  Bar: styled.View`
    margin: 5px 0;
  `,

  BarText: styled.Text`
    text-align: left;
    font-size: 10px;
    padding: 3px 0 0 5px;
    font-weight: bold;
  `,
  BarNumber: styled.Text`
    text-align: right;
    font-size: 12px;
  `,
};
