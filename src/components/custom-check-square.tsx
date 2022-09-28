import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {pColor} from '~/styles/colors';
import Icons from 'react-native-vector-icons/FontAwesome';
export const CheckSquare = ({
  onCheck,
  style = {
    width: 20,
    height: 20,
    borderWidth: 1,
    ...{},
  },
  isCheck,
  ...props
}: {
  onCheck: any;
  style: any;
  [x: string]: any;
}) => {
  const [_isCheck, set_isCheck] = useState(isCheck);
  return (
    <View>
      <TouchableOpacity
        style={[
          {
            backgroundColor: !_isCheck ? pColor.neutral0 : pColor.secondary,
            borderRadius: 4,
            justifyContent: 'center',
            alignItems: 'center',
            borderColor: !_isCheck ? pColor.neutral60 : pColor.secondary,
          },
          style,
        ]}
        onPress={() => {
          onCheck(!_isCheck);
          set_isCheck(!_isCheck);
        }}
        disabled={props.disable}>
        {_isCheck ? (
          <View
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Icons name="check" color={pColor.white}></Icons>
          </View>
        ) : (
          <></>
        )}
      </TouchableOpacity>
    </View>
  );
};
