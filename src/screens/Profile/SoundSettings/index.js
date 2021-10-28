import React, { useLayoutEffect, useRef, useState } from 'react';
import {
  Dimensions,
  View,
} from 'react-native';
import {styles} from './styles';
import Header from '../../../components/Header';
import {String} from '../../../assets/strings/String';
import LoadingIndicator from '../../../components/LoadingIndicator';
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';
import { Colors } from '../../../assets/colors/Colors';
import { getSoundModesApi, setSoundModesApi } from '../../../network/UserInfoService';
import DataLocal from '../../../data/dataLocal';
import { useTranslation } from 'react-i18next';

const {width, height} = Dimensions.get('window');
export default function SoundSettings({navigation}) {
  const [mode, setMode] = useState();
  const refLoading = useRef();
  const { t } = useTranslation();

  const radio_props = [
    {label: t('common:vibrateAndRing'), value: 1},
    {label: t('common:ring'), value: 2},
    {label: t('common:vibrate'), value: 3},
    {label: t('common:silent'), value: 4},
  ];

  useLayoutEffect(() => {
    getSoundModes();
  }, []);

  const getSoundModes = async () => {
    getSoundModesApi(DataLocal.deviceId, {
      success: resData => {
        if (resData.data && resData.data.mode) {
          setMode(resData.data.mode)
        }
        console.log(resData.data.mode);
        if (resData.data.mode === -1) {
          console.log('unknown mode => set to vibration');
          setSoundModes(3);
        }
      },
      refLoading,
    });
  };

  const setSoundModes = async (index) => {
    setSoundModesApi(DataLocal.deviceId, index, {
      success: resData => {
        if (resData.data && resData.data.mode) {
          setMode(resData.data.mode)
        }
      },
      refLoading,
    });
  };

  const onMethodChanged = (index) => {
    if (index != mode) {
      setSoundModes(index);
    }
  }

  return (
    <View style={styles.contain}>
      <Header title={t('common:header_soundSettings')} />
      <View style={styles.container}>
        <RadioForm formHorizontal={false} animation={true} style={{marginTop: height* 0.008}}>
          {
            radio_props.map((obj, i) => (
              <RadioButton labelHorizontal={true} key={i} style={styles.radioForm}>
                <RadioButtonInput
                  obj={obj}
                  index={i}
                  isSelected={mode === obj.value}
                  onPress={ (value) => {
                    onMethodChanged(value);
                  }}
                  borderWidth={1}
                  buttonInnerColor={Colors.red}
                  buttonOuterColor={Colors.red}
                  buttonSize={20}
                  buttonOuterSize={30}
                  buttonStyle={{marginRight: width* 0.03}}
                  buttonWrapStyle={{marginLeft: width* 0.03}}
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
