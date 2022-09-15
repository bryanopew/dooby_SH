// import React, {Component} from 'react';
// import {Platform, StyleSheet, Text, View, Button} from 'react-native';

// import CheckBox from '@react-native-community/checkbox';

// const instructions = Platform.select({
//   ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
//   android:
//     'Double tap R on your keyboard to reload,\n' +
//     'Shake or press menu button for dev menu！',
// });

// const isIOS = Platform.OS === 'ios';

// type Props = {};
// type State = {
//   value0: boolean;
//   value1: boolean;
//   value2: boolean;
//   value3: boolean;
//   value4: boolean;
//   lineWidth: number;
// };

// export default class App extends Component<Props, State> {
//   constructor(props: Props) {
//     super(props);

//     this.state = {
//       value0: true,
//       value1: false,
//       value2: true,
//       value3: false,
//       value4: false,
//       lineWidth: 10,
//     };
//   }

//   renderForIOS() {
//     return (
//       <View style={styles.container}>
//         <Text>{`[value: ${this.state.value0}]`}</Text>
//         <CheckBox
//           disabled={true}
//           value={this.state.value0}
//           onValueChange={value =>
//             this.setState({
//               value0: value,
//             })
//           }
//         />
//         <Text>{`[value: ${this.state.value4}]`}</Text>
//         <CheckBox
//           value={this.state.value4}
//           hideBox={true}
//           onValueChange={value =>
//             this.setState({
//               value4: value,
//             })
//           }
//         />
//         <Text>{`[value: ${this.state.value3}]`}</Text>
//         <CheckBox
//           value={this.state.value3}
//           boxType={'square'}
//           onValueChange={value =>
//             this.setState({
//               value3: value,
//             })
//           }
//         />
//         <Text>{`[value: ${this.state.value2}]`}</Text>
//         <CheckBox
//           value={this.state.value2}
//           onValueChange={value =>
//             this.setState({
//               value2: value,
//             })
//           }
//           onAnimationDidStop={() => console.log('onAnimationDidStopEvent')}
//           lineWidth={2}
//           hideBox={false}
//           boxType={'circle'}
//           tintColors={'#9E663C'}
//           onCheckColor={'#6F763F'}
//           onFillColor={'#4DABEC'}
//           onTintColor={'#F4DCF8'}
//           animationDuration={0.5}
//           disabled={false}
//           onAnimationType={'bounce'}
//           offAnimationType={'stroke'}
//         />
//         <Button
//           onPress={() =>
//             this.setState({
//               value2: !this.state.value2,
//             })
//           }
//           title="toggle the value above"
//         />
//       </View>
//     );
//   }

//   renderForAndroid() {
//     return (
//       <View style={styles.container}>
//         <Text>{`[value: ${this.state.value0}]`}</Text>
//         <CheckBox
//           disabled={true}
//           value={this.state.value0}
//           onValueChange={value =>
//             this.setState({
//               value0: value,
//             })
//           }
//         />
//         <Text>{`[value: ${this.state.value1}]`}</Text>
//         <CheckBox
//           value={this.state.value1}
//           tintColors={{true: 'green'}}
//           onValueChange={value =>
//             this.setState({
//               value1: value,
//             })
//           }
//         />
//         <Button
//           onPress={() =>
//             this.setState({
//               value1: !this.state.value1,
//             })
//           }
//           title="toggle the value above"
//         />
//       </View>
//     );
//   }

//   render() {
//     return (
//       <View style={styles.container}>
//         <Text style={styles.welcome}>Welcome to React Native Checkbox!</Text>
//         {isIOS ? this.renderForIOS() : this.renderForAndroid()}
//         <Text style={styles.instructions}>{instructions}</Text>
//       </View>
//     );
//   }
// }

// const styles = StyleSheet.create({
//   textInput: {
//     borderColor: 'gray',
//     borderWidth: 1,
//   },
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#F5FCFF',
//   },
//   welcome: {
//     fontSize: 20,
//     textAlign: 'center',
//     margin: 10,
//   },
//   instructions: {
//     textAlign: 'center',
//     color: '#333333',
//     marginBottom: 5,
//   },
// });

import React, {useState} from 'react';
import {Text, View, TextInput, Button, Alert} from 'react-native';
import {useForm, Controller} from 'react-hook-form';
import Counter from '~/Components/BasketComponent/Counter';
import SearchBar from './HomeCompo/SearchBar';
import styled from 'styled-components/native';

const ErrorText = styled.Text`
  color: red;
  margin-left: 10px;
`;

const Profile = () => {
  const {
    control,
    handleSubmit,
    formState: {errors, isValid},
  } = useForm({
    defaultValues: {
      age: '',
      lastName: '',
    },
  });
  const onSubmit = data => console.log(data);
  const onError = (errors, e) => console.log(errors, e);

  const [age, setAge] = useState('');
  const [ageError, setAgeError] = useState(false);

  return (
    <View>
      <Controller
        control={control}
        rules={{
          required: true,
          maxLength: 3,
          validate: {
            positive: v => parseInt(v) >= 10,
            lessThan: v => parseInt(v) <= 100,
          },
        }}
        render={({field: {onChange, onBlur, value}}) => (
          <TextInput
            placeholder="만 나이를 입력해주세요"
            maxLength={3}
            onChangeText={onChange}
            value={value}
            keyboardType="numeric"
            onSubmitEditing={handleSubmit(onSubmit)}
          />
        )}
        name="age"
      />
      {errors.age && <ErrorText>길이</ErrorText>}

      <Controller
        control={control}
        rules={{
          required: true,

          maxLength: 5,
        }}
        render={({field: {onChange, onBlur, value}}) => (
          <TextInput
            placeholder="last"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
        name="lastName"
      />
      {errors.lastName && <ErrorText>길이 초과</ErrorText>}
      <Button title="s" onPress={handleSubmit(onSubmit)} disabled={!isValid} />
    </View>
  );
};

export default Profile;
