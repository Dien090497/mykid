import {View, Text, TouchableOpacity, TextInput} from 'react-native';
import React, {useEffect, useRef, useState} from "react";
import {Colors} from "../../../../assets/colors/Colors";
import {getOtpApi} from "../../../../network/UserInfoService";
import Consts from "../../../../functions/Consts";
import {styles} from "../styles";
import {String} from "../../../../assets/strings/String";

export default function OTP({navigation, route}) {
  const refLoading = useRef(null);
  const [otp, setOTP] = useState('');
  const [color, setColor] = useState(Colors.redTitle);
  const [phone, setPhone] = useState();
  const [isActive, setIsActive] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [timerCount, setTimerCount] = useState(60);
  let timer = 0;

  useEffect(() => {
    setPhone(route.params.phone)
  })

  const isChangeOTP = (text) => {
     setOTP(text);
  }

  const sendTo = () => {
    setColor('rgba(228, 228, 228, 1)');
    getOtpApi(phone , {
      success: res => {
        setIsActive(true);
        setOtpSent(true)
        timer = getTime() + 60;
        refreshCountdown();
      }
    })
  }

  const oncRegister = () => {

  }

  const refreshCountdown = () => {
    setTimeout(()=>{
      if (timer - getTime() <= 0) {
        setOtpSent(false);
        setIsActive(false);
        setTimerCount(60);
      } else {
        setTimerCount(timer - getTime());
        refreshCountdown();
      }
    }, 1000)
  };

  const getTime = () => { return Math.floor(Date.now() / 1000); };

  return(
    <View style={{flex:1, alignItems: 'center', backgroundColor: Colors.white}}>
      <Header title={'Xác thực SĐT'}/>
      <View style={{width: '90%', height:45, backgroundColor: Colors.white, marginTop: 40,  flexDirection: 'row'}}>
        <TextInput
          placeholderTextColor={"#9D9D9D"}
          placeholder={'Nhập mã OTP'}
          style={{width: '80%',height: '100%', borderColor: Colors.gray, borderWidth: 0.5, borderRadius: 10}}
          onChangeText={(text => isChangeOTP(text))}
        />
          <TouchableOpacity
            onPress={sendTo}
            style={{
              width: '18%',
              backgroundColor: (color === 0 ? Colors.redTitle : 'rgba(228, 228, 228, 1)'),
              height: '100%',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 10,
              marginLeft: '2%'
            }}
          >
            {color === Colors.redTitle ? (
              <Text style={{fontSize: 14, color: Colors.white}}>Gửi lại</Text>
            ):(
              <Text style={{fontSize: 14, color: Colors.white}}>{timerCount}{'s'}</Text>
            )}
          </TouchableOpacity>

      </View>
      {otp !== '' ? (
        <TouchableOpacity onPress={oncRegister} style={styles.btnSubmit}>
          <Text style={styles.textSubmit}>{String.register}</Text>
        </TouchableOpacity>
      ):(
        <View style={[styles.btnSubmit, {backgroundColor: 'rgba(228, 228, 228, 1)'}]}>
          <Text style={styles.textSubmit}>{String.register}</Text>
        </View>
      )
      }
    </View>
  );
}