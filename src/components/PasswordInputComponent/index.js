import React, {useState} from 'react';
import {TouchableOpacity, TextInput, View} from 'react-native';
import { styles } from './styles';

const PasswordInputComponent = (props) => {
  const [isShowPassword, setShowPassword] = useState(false);
  const handleVisiblePassword = () => {
    setShowPassword(!isShowPassword);
  }
  return (
    <View
      style={styles.container}>
      <TextInput
        style={styles.textInput}
        onChangeText={props.onChangePassword}
        value={props.password}
        placeholder={props.placeholder}
        secureTextEntry={!isShowPassword}
      />
      <TouchableOpacity
        onPress={handleVisiblePassword}>
      </TouchableOpacity>
    </View>
  );
};
export default PasswordInputComponent;
