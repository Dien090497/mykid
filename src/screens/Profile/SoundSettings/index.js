import React, { useRef, useState } from 'react';
import {
  View,
} from 'react-native';
import {styles} from './styles';
import Header from '../../../components/Header';
import {String} from '../../../assets/strings/String';
import LoadingIndicator from '../../../components/LoadingIndicator';
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';
import { Colors } from '../../../assets/colors/Colors';

export default function SoundSettings({navigation}) {
  const [value3Index, setValue3Index] = useState(0);
  const refLoading = useRef();

  const radio_props = [
    {label: 'Im lặng', value: 0},
    {label: 'Rung', value: 1},
    {label: 'Tiếng lớn', value: 2},
  ];

  const onMethodChanged = (index) => {
    setValue3Index(index);
  }

  // const handleFindDevice = () => {
  // };

  return (
    <View style={styles.contain}>
      <Header title={String.header_soundSettings} />
      <View style={styles.container}>
        <RadioForm formHorizontal={false} animation={true} style={{ marginTop: 20 }}>
          {
            radio_props.map((obj, i) => (
              <RadioButton labelHorizontal={true} key={i} style={styles.radioForm}>
                <RadioButtonInput
                  obj={obj}
                  index={i}
                  isSelected={value3Index === i}
                  onPress={ (value) => {
                    onMethodChanged(value);
                  }}
                  borderWidth={1}
                  buttonInnerColor={Colors.red}
                  buttonOuterColor={value3Index === i ? '#2196f3' : '#000'}
                  buttonSize={15}
                  buttonOuterSize={20}
                  buttonStyle={{marginRight: 10}}
                  buttonWrapStyle={{marginLeft: 10}}
                />
                <RadioButtonLabel
                  obj={obj}
                  index={i}
                  labelHorizontal={false}
                  onPress={ (value) => {
                    onMethodChanged(value);
                  }}
                  labelStyle={styles.labelStyle}
                  labelWrapStyle={{width: '88%'}}
                />
              </RadioButton>
            ))
          }  
        </RadioForm>
      </View>
      <LoadingIndicator ref={refLoading} />
    </View>
  );
}
