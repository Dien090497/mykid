import React, {useRef, useState, useEffect} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import Header from '../../../components/Header';
import {styles} from './styles';
import {
  setEacesDropApi,
  getPhoneApi
} from '../../../network/EacesDropingService';
import DataLocal from '../../../data/dataLocal';
import LoadingIndicator from '../../../components/LoadingIndicator';
import {useTranslation} from 'react-i18next';
import NotificationModal from '../../../components/NotificationModal';
import {phoneTest1} from "../../../functions/utils";
import Consts from "../../../functions/Consts";

export default function EacesDroping({navigation}) {
  const [number, setNumber] = useState('');
  const refLoading = useRef();
  const refNotification = useRef();
  const {t} = useTranslation();
  useEffect(() => {
    getPhoneApi(DataLocal.deviceId, {
      success: res => {
        setNumber(res.data.phoneNumber)
      },
      refLoading: refLoading,
      refNotification: refNotification,
    });
  }, []);
  const checkNumber = () => {
    if (!phoneTest1(editPhone())) {
      refNotification.current.open(t('common:error_phone'))
    } else {
      eacesDropingApi();
    }
  }
  const editPhone = () => {
    if (number[0] === '0') {
      return '+84' + number.substring(1);
    }
    if (number[0] === '8' && number[1] === '4') {
      return ('+' + number);
    }
  }

  const eacesDropingApi = () => {
    const body = {
      phoneNumber: editPhone()
    }
    setEacesDropApi(DataLocal.deviceId, body, {
      success: res => {
        refNotification.current.open(t('common:addDeviceSuccess'))
      },
      refLoading: refLoading,
      refNotification: refNotification,
    })
  }

  const gotoHomeScreen = () => {
    if (DataLocal.haveSim === '0') {
      DataLocal.saveHaveSim('1').then(r =>
        navigation.navigate(Consts.ScreenIds.Tabs)
      );
    }
  }

  return (
    <View style={styles.viewContainer}>
      <Header title={t('common:header_soundGuardian')}/>
      <View style={styles.viewInput}>
        <View style={styles.viewInputText}>
          <TextInput
            scrollEnabled={true}
            underlineColorAndroid={'transparent'}
            style={styles.inputText}
            value={number}
            keyboardType={'number-pad'}
            placeholder={t('common:header_account')}
            placeholderTextColor='#B5B4B4'
            disableFullscreenUI
            onChangeText={(text => setNumber(text))}
          />
        </View>
        <TouchableOpacity style={styles.tob}
                          onPress={() => checkNumber(number)}
        >
          <Text style={styles.text}>{t('common:confirm')}</Text>
        </TouchableOpacity>
      </View>
      <LoadingIndicator ref={refLoading}/>
      <NotificationModal ref={refNotification} goBack={gotoHomeScreen}/>
    </View>
  );
}
