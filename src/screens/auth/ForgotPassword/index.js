import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Text, TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import React, {useRef, useState} from "react";
import Header from '../../../components/Header';
import {styles} from "./style";
import {useTranslation} from "react-i18next";
import Consts from '../../../functions/Consts';
import {Colors} from "../../../assets/colors/Colors";
import {getOtpResettingApi, getVerificationOtpApi} from "../../../network/UserInfoService";
import {phoneTest1} from "../../../functions/utils";
import NotificationModal from "../../../components/NotificationModal";
import LoadingIndicator from "../../../components/LoadingIndicator";

const ForgotPassword = ({navigation}) => {
  const refLoading = useRef(null);
  const refNotification = useRef();
  const {t} = useTranslation();
  const [timerCount, setTimerCount] = useState(60);
  const [check, setCheck] = useState(false);
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  let timer = 0;
  const [isActive, setIsActive] = useState(false);
  const [otpSent, setOtpSent] = useState(false);

  const editPhone = () => {
    if (phone[0] === '0') {
      return '+84' + phone.substring(1);
    }
    if (phone[0] === '8' && phone[1] === '4') {
      return ('+84' + phone.substring(2));
    }
  }

  const sendTo = () => {
    let phoneNumber = editPhone();
    if (!phoneTest1(phoneNumber)) {
      refNotification.current.open(t('common:error_phone'))
      return;
    }
    getOtpResettingApi(phoneNumber, {
        success: res => {
          setCheck(true);
          setIsActive(true);
          setOtpSent(true)
          timer = getTime() + 60;
          refreshCountdown();
        },
        refNotification
      }
    );
  }

  const isContinue = () => {
    if (!phoneTest1(editPhone())) {
      refNotification.current.open(t('common:error_phone'))
      return;
    }
    if (otp.length < 6) {
      refNotification.current.open(t('common:error_otp'))
      return;
    }
    const data = {
      phone: editPhone(),
      otp: otp
    }
    getVerificationOtpApi(data, {
      success: res => {
        navigation.navigate(Consts.ScreenIds.UpdatePassword, {phone: editPhone()})
      },
      refNotification
    })
  }

  const isChangePhone = (text) => {
    setPhone(text.replace(/[^0-9]/g, ''));
  }

  const isChangeOtp = (text) => {
    setOtp(text.replace(/[^0-9]/g, ''));
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
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : ''}
      style={styles.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <Header title={t('common:forgotPassword')}/>
          <View style={{alignItems: 'center', height: 800, marginVertical: '8%'}}>
            <View style={styles.Sty_txt}>
              <TextInput
                placeholderTextColor={"#9D9D9D"}
                placeholder={t('common:inputTxt')}
                underlineColorAndroid={"transparent"}
                maxLength={11}
                keyboardType={"number-pad"}
                style={styles.textInput}
                value={phone}
                onChangeText={(text) => isChangePhone(text)}
              />
            </View>
            <View style={styles.viewOtp}>
              <View style={styles.viewInput}>
                <TextInput
                  placeholderTextColor={'rgba(181, 180, 180, 1)'}
                  placeholder={t('common:importOTP')}
                  maxLength={6}
                  keyboardType={'number-pad'}
                  value={otp}
                  style={styles.textInput}
                  onChangeText={(text) => isChangeOtp(text)}
                />
              </View>
              <TouchableOpacity
                onPress={sendTo}
                style={phone === '' ? [styles.tobOtp, {backgroundColor: 'rgba(228, 228, 228, 1)'}]
                  : !check ? styles.tobOtp : [styles.tobOtp, {backgroundColor: 'rgba(228, 228, 228, 1)'}]}
                disabled={check}
              >
                <Text
                  style={{fontSize: 14, color: Colors.white}}>{check ? timerCount + 's' : t('common:getCode')}</Text>
              </TouchableOpacity>
            </View>
            <View style={{marginTop: 20, width: '90%'}}>
              <Text style={styles.text}>{t('common:txtForgotPassWord1')}</Text>
              <Text style={[styles.text, {marginTop: 20}]}>{t('common:txtForgotPassWord2')}</Text>
            </View>
            {otp !== '' && phone !== '' ? (
              <TouchableOpacity onPress={isContinue} style={styles.btnSubmit}>
                <Text style={styles.textSubmit}>{t('common:txtContinue')}</Text>
              </TouchableOpacity>
            ) : (
              <View style={[styles.btnSubmit, {backgroundColor: 'rgba(228, 228, 228, 1)'}]}>
                <Text style={styles.textSubmit}>{t('common:txtContinue')}</Text>
              </View>
            )}
            <NotificationModal ref={refNotification}/>
          </View>
        </View>
      </TouchableWithoutFeedback>
      <LoadingIndicator ref={refLoading}/>
    </KeyboardAvoidingView>
  );
};
export default ForgotPassword;
