import {View, Text, TouchableOpacity, TextInput} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {Colors} from '../../../../assets/colors/Colors';
import {getOtpApi, createAndLogin} from '../../../../network/UserInfoService';
import Consts from '../../../../functions/Consts';
import LoadingIndicator from '../../../../components/LoadingIndicator';
import {saveUserDataFromToken, showAlert} from '../../../../functions/utils';
import {useTranslation} from 'react-i18next';
import {styles} from "../../Register/styles";
import CustomInput from "../../../../components/inputRegister";

export default function UpdatePassword({navigation, route}) {
  const refLoading = useRef(null);
  const [otp, setOTP] = useState('');
  const [check, setCheck] = useState(false);
  const [phone, setPhone] = useState();
  const [isActive, setIsActive] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [timerCount, setTimerCount] = useState(60);
  const {t} = useTranslation();
  let timer = 0;

  useEffect(() => {

  })

  const sendTo = () => {

  }

  const onRegister = () => {
    const data = {
      phone: phone,
      password: route.params.pass,
      otp: otp
    }
    if (otp === '') {
      showAlert(t('common:error_otp1'));
      return;
    }
    if (otp.length < 6) {
      showAlert(t('common:error_otp'));
      return;
    }

    createAndLogin(data, {
      success: res => {
        const token = res.data.token;
        saveUserDataFromToken(token).then(_ => {
        });
        navigation.navigate(Consts.ScreenIds.ConnectionScreen);
        setCheck(false);
      },
      refLoading,
    })
  }
  return (
    <View style={{flex: 1, alignItems: 'center', backgroundColor: Colors.white}}>
      <Header title={t('common:submitOTP')}/>
      <View style={{
        width: '90%',
        height: 45,
        backgroundColor: Colors.white,
        marginTop: 40,
        flexDirection: 'row'
      }}>
        <View style={{alignItems: 'center', height: 600, justifyContent: 'center'}}>
          <View style={{
            marginTop: 25,
            width: width * 0.9,
            flexDirection: 'row',
            marginVertical: 15,
            alignItems: 'center',
          }}>

          </View>
        </View>

      </View>
      <LoadingIndicator ref={refLoading}/>
    </View>
  );
}
