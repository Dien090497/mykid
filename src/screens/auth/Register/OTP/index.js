import {View, Text, TouchableOpacity, TextInput} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {Colors} from '../../../../assets/colors/Colors';
import {getOtpApi, createAndLogin, createTokenFirebase} from '../../../../network/UserInfoService';
import Consts from '../../../../functions/Consts';
import {styles} from './styles';
import LoadingIndicator from '../../../../components/LoadingIndicator';
import {saveUserDataFromToken} from '../../../../functions/utils';
import { useTranslation } from 'react-i18next';
import NotificationModal from '../../../../components/NotificationModal'
import DataLocal from "../../../../data/dataLocal";
export default function OTP({navigation, route}) {
  const refLoading = useRef(null);
  const refNotification = useRef();
  const [otp, setOTP] = useState('');
  const [check, setCheck] = useState(false);
  const [phone, setPhone] = useState();
  const [isActive, setIsActive] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [timerCount, setTimerCount] = useState(60);
  const { t } = useTranslation();
  let timer = 0;

  useEffect(() => {
    setPhone(route.params.phone);
    setCheck(true);
    setIsActive(true);
    setOtpSent(true)
    timer = getTime() + 60;
    refreshCountdown();
  },[route.params.check])

  const isChangeOTP = (text) => {
    setOTP(text.replace(/[^0-9]/g, ''));
  }

  const sendTo = () => {
    getOtpApi(phone, {
      success: res => {
        setCheck(true);
        setIsActive(true);
        setOtpSent(true)
        timer = getTime() + 60;
        refreshCountdown();
      },
      refNotification,
    })
  }

  const onRegister = () => {
    const data = {
      phone: phone,
      password: route.params.pass,
      otp: otp
    }
    if (otp === '') {
      refNotification.current.open(t('common:error_otp1'))
      return;
    }
    if (otp.length < 6) {
      refNotification.current.open(t('common:error_otp'))
      return;
    }

    createAndLogin(data, {
      success: res => {
        const token = res.data.token;
        saveUserDataFromToken(token).then(_ => {
          createTokenFirebase(DataLocal.tokenFirebase, {
            success: resData => {
            },
          }).then();
        });
        navigation.navigate(Consts.ScreenIds.ConnectionScreen);
        setCheck(false);
      },
      refLoading,
      refNotification,
    })
  }

  const refreshCountdown = () => {
    setTimeout(() => {
      if (timer - getTime() <= 0) {
        setOtpSent(false);
        setIsActive(false);
        setTimerCount(60);
        setCheck(false);
      } else {
        setTimerCount(timer - getTime());
        refreshCountdown();
      }
    }, 1000)
  };

  const getTime = () => {
    return Math.floor(Date.now() / 1000);
  };
  return (
    <View style={{flex: 1, alignItems: 'center', backgroundColor: Colors.white}}>
      <Header title={t('common:submitOTP')}/>
      <View style={styles.viewContainer}>
        <View style={styles.viewInput}>
          <TextInput
            placeholderTextColor={'rgba(181, 180, 180, 1)'}
            placeholder={t('common:importOTP')}
            maxLength={6}
            value={otp}
            keyboardType={'number-pad'}
            style={styles.textInput}
            onChangeText={isChangeOTP}
          />
        </View>
        {!check ? (
          <TouchableOpacity
            onPress={sendTo}
            style={styles.tob}
          >
            <Text style={styles.text}>{t('common:getCode')}</Text>
          </TouchableOpacity>
        ) : (
          <View
            style={styles.viewTxt}
          >
            <Text style={[styles.text, {color: 'rgba(181, 180, 180, 1)'}]}>{timerCount}{'s'}</Text>
          </View>
        )}

      </View>

      <TouchableOpacity onPress={onRegister} style={styles.viewTob}>
        <Text style={styles.textConfirm}>{t('common:register')}</Text>
      </TouchableOpacity>
      <NotificationModal ref = {refNotification} />
      <LoadingIndicator ref={refLoading}/>
    </View>
  );
}
