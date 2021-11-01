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
import {ScaleHeight} from "../../../functions/Consts";
import {Colors} from "../../../assets/colors/Colors";
import {getOtpApi} from "../../../network/UserInfoService";
import {phoneTest1, showAlert} from "../../../functions/utils";

const ForgotPassword = ({navigation}) => {
  const {t} = useTranslation();
  const [timerCount, setTimerCount] = useState(60);
  const [check, setCheck] = useState(false);
  const [phone, setPhone] = useState();
  const [otp, setOtp] = useState();

  const sendTo = () => {
    if (!phoneTest1(phone)) {
      showAlert(t('common:error_phone'));
      return;
    }

  }

  const isChangePhone = (text) => {
    setPhone(text.replace(/[^0-9]/g, ''));
  }

  const isChangeOtp = (text) => {
    setOtp(text.replace(/[^0-9]/g, ''));
  }

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
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};
export default ForgotPassword;
