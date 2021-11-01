import {
  Dimensions,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Text, TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import React, {useLayoutEffect, useRef, useState} from "react";
import Header from '../../../components/Header';
import {styles} from "./style";
import {useTranslation} from "react-i18next";
import Consts, {ScaleHeight} from "../../../functions/Consts";
import {Colors} from "../../../assets/colors/Colors";
import {getOtpResettingApi, getVerificationOtpApi} from "../../../network/UserInfoService";
import {phoneTest1, showAlert} from "../../../functions/utils";

const ForgotPassword = ({navigation}) => {
  const {t} = useTranslation();
  const [timerCount, setTimerCount] = useState(60);
  const [check, setCheck] = useState(false);
  const [phone, setPhone] = useState();
  const [otp, setOtp] = useState();
  let timer = 0;
  const [isActive, setIsActive] = useState(false);
  const [otpSent, setOtpSent] = useState(false);

  const sendTo = () => {
    if (!phoneTest1(phone)) {
      showAlert(t('common:error_phone'));
      return;
    }
    getOtpResettingApi(phone, {
        success: res => {
          setCheck(true);
          setIsActive(true);
          setOtpSent(true)
          timer = getTime() + 60;
          refreshCountdown();
        }
      }
    );
  }

  const isContinue = () => {
    const data = {
      phone: phone,
      otp: otp
    }
   getVerificationOtpApi(data, {
     success: res => {
       navigation.navigate(Consts.ScreenIds.UpdatePassword, {phone: phone})
     }
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
          <View style={{alignItems: 'center', height: 600, marginVertical: '8%'}}>
            <View style={styles.Sty_txt}>
              <TextInput
                placeholderTextColor={"#9D9D9D"}
                placeholder={'Vui lòng nhập số điện thoại của bạn'}
                underlineColorAndroid={"transparent"}
                maxLength={12}
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
                style={!check ? styles.tobOtp : [styles.tobOtp, {backgroundColor: 'rgba(228, 228, 228, 1)'}]}
                disabled={check}
              >
                <Text style={{fontSize: 14, color: Colors.white}}>{check ? timerCount + 's' : 'Lấy mã'}</Text>
              </TouchableOpacity>
            </View>
            <View style={{marginTop: 20, width: '90%'}}>
              <Text style={styles.text}>{t('common:txtForgotPassWord1')}</Text>
              <Text style={[styles.text, {marginTop: 20}]}>{t('common:txtForgotPassWord2')}</Text>
            </View>
            <TouchableOpacity  style={styles.btnSubmit}  onPress={isContinue}>
              <Text style={styles.textSubmit}>{t('common:register')}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};
export default ForgotPassword;
