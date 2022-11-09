import { View, Text } from "react-native";
import React, { useEffect } from "react";

const UserInfo = ({ navigation, route }) => {
  console.log(route);
  useEffect(() => {
    navigation.setOptions({ title: route.params.nutr });
  }, [navigation]);
  return (
    <View>
      <Text>UserInfo</Text>
    </View>
  );
};

export default UserInfo;
