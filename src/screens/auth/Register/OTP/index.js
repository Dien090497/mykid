import {View, Text, TouchableOpacity, TextInput} from 'react-native';
import React, {useEffect, useRef, useState} from "react";
import {Colors} from "../../../../assets/colors/Colors";
import {getOtpApi, createAndLogin} from "../../../../network/UserInfoService";
import Consts from "../../../../functions/Consts";
import {styles} from "../styles";
import {String} from "../../../../assets/strings/String";
import LoadingIndicator from "../../../../components/LoadingIndicator";
import {saveUserDataFromToken, showAlert} from "../../../../functions/utils";

export default function OTP({navigation, route}) {
  const refLoading = useRef(null);
  const [otp, setOTP] = useState('');
  const [check, setCheck] = useState(false);
  const [phone, setPhone] = useState();
  const [isActive, setIsActive] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [timerCount, setTimerCount] = useState(60);
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
    })
  }

  const onRegister = () => {
    const data = {
      phone: phone,
      password: route.params.pass,
      otp: otp
    }
    if (otp === '') {
      showAlert(String.error_otp1);
      return;
    }
    if (otp.length < 6) {
      showAlert(String.error_otp);
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
      <Header title={String.submitOTP}/>
      <View style={{
        width: '90%',
        height: 45,
        backgroundColor: Colors.white,
        marginTop: 40,
        flexDirection: 'row'
      }}>
        <View style={{
          width: '80%',
          height: '100%',
          borderColor: 'rgba(231, 231, 231, 1)',
          borderWidth: 0.5,
          borderRadius: 10,
          color: Colors.black,
          justifyContent: 'center'
        }}>
          <TextInput
            placeholderTextColor={'rgba(181, 180, 180, 1)'}
            placeholder={String.importOTP}
            maxLength={6}
            value={otp}
            keyboardType={"number-pad"}
            style={{
              marginHorizontal: 10,
              color: Colors.black
            }}
            onChangeText={isChangeOTP}
          />
        </View>
        {!check ? (
          <TouchableOpacity
            onPress={sendTo}
            style={{
              width: '18%',
              backgroundColor: Colors.redTitle,
              height: '100%',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 10,
              marginLeft: '2%'
            }}
          >
            <Text style={{fontSize: 14, color: Colors.white}}>Lấy mã</Text>
          </TouchableOpacity>
        ) : (
          <View
            style={{
              width: '18%',
              backgroundColor: 'rgba(228, 228, 228, 1)',
              height: '100%',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 10,
              marginLeft: '2%'
            }}
          >
            <Text style={{fontSize: 14, color: Colors.white}}>{timerCount}{'s'}</Text>
          </View>
        )}

      </View>

      <TouchableOpacity onPress={onRegister} style={styles.btnSubmit}>
        <Text style={styles.textSubmit}>{String.register}</Text>
      </TouchableOpacity>
      <LoadingIndicator ref={refLoading}/>
    </View>
  );
}
