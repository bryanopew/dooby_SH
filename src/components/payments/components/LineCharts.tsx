import { View, Text } from "react-native";
import React, { useEffect, useRef } from "react";
import colors from "../colors";
import { LineChart } from "react-native-gifted-charts";
import styled from "styled-components/native";

const CustomDataPoint = styled.View`
  width: 10px;
  height: 10px;
  background-color: ${colors.main};
  border-radius: 10px;
  border-color: ${colors.main};
  border-width: 2px;
  align-self: center;
  justify-self: center;
`;

const minValue = (arr) => {
  let min = arr[0];
  if (arr.length <= 1) {
    return min;
  } else {
    for (let i = 1; i < arr.length; i++) {
      if (arr[i] < min) {
        min = arr[i];
      }
    }
  }
  return min;
};
const maxValue = (arr) => {
  let max = arr[0];
  if (arr.length <= 1) {
    return max;
  } else {
    for (let i = 1; i < arr.length; i++) {
      if (arr[i] > max) {
        max = arr[i];
      }
    }
  }
  return max;
};

const LineCharts = ({ data }) => {
  // console.log("LineCharts: data: ", data);
  const arr = data.map((item) => item.value);
  // console.log(arr);
  const min = minValue(arr);
  const max = maxValue(arr);
  // console.log(min, max);
  // const min = 80;
  if (data) {
    return (
      <LineChart
        // 종류, 크기, 데이터
        areaChart
        height={200}
        data={data} // offset 주면 왜 원래 데이터가 변하는거여?!
        //축, 축레이블
        xAxisLabelTextStyle={{ fontSize: 11 }}
        yAxisTextStyle={{ fontSize: 11 }}
        rotateLabel={false}
        maxValue={max - min + 5}
        yAxisOffset={min - 5}
        // hideAxesAndRules
        yAxisColor={colors.white}
        // line, area
        curved
        color={colors.main}
        startFillColor={colors.main}
        endFillColor={colors.white}
        startOpacity={0.2}
        endOpacity={0}
        thickness={3}
        hideRules={false}
        initialSpacing={10}
        spacing={48}
        // 기본포인터
        hideDataPoints
        showVerticalLines={false}
        isAnimated
        // 포인터
        pointerConfig={{
          pointerStripUptoDataPoint: true,
          pointerStripColor: "lightgray",
          pointerStripWidth: 2,
          strokeDashArray: [5],
          // pointerColor: "lightgray",
          radius: 4,
          pointerLabelWidth: 100,
          pointerLabelHeight: 120,
          activatePointersOnLongPress: true,
          autoAdjustPointerLabelPosition: false,
          shiftPointerLabelX: 0,
          shiftPointerLabelY: -20,
          pointerComponent: () => <CustomDataPoint />,
          pointerLabelComponent: (items) => {
            return (
              <View
                style={{
                  height: "auto",
                  width: "auto",
                  padding: 8,
                  backgroundColor: "#282C3E",
                  borderRadius: 10,
                  justifyContent: "center",
                  paddingLeft: 16,
                }}
              >
                <Text style={{ color: "lightgray", fontSize: 12 }}>
                  {items[0].label}
                </Text>
                <Text style={{ color: "white", fontWeight: "bold" }}>
                  {items[0].value + min}
                </Text>
              </View>
            );
          },
        }}
      />
    );
  } else {
    return <></>;
  }
};

export default LineCharts;
