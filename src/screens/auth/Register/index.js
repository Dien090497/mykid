import React, {useRef, useState, useLayoutEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  TextInput,
  Platform,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Linking,
  Image,
} from 'react-native';
import {styles} from './styles';
import Images from '../../../assets/Images';
import {String} from '../../../assets/strings/String';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {Colors} from '../../../assets/colors/Colors';
import {hideLoading, phoneTest, showAlert, showLoading} from '../../../functions/utils';
import LoadingIndicator from '../../../components/LoadingIndicator';
import {appConfig} from '../../../network/http/ApiUrl';
import Consts from '../../../functions/Consts';
import { getCaptchaApi } from '../../../network/UserInfoService';

export default function Register({navigation}) {
  const [timerCount, setTimerCount] = useState(60);
  const [phone, setChangePhone] = useState('');
  const [isActive, setIsActive] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const insets = useSafeAreaInsets();
  const refMethodRadio = useRef();
  const [genderTitle, setGenderTitle] = useState('VOICE');
  const [otp, onChangeOtp] = useState('');
  const refLoading = useRef();
  const TYPE_ACTION = 'REGISTER';
  let phoneFormat;
  let timer = 0;

  const radio_props = [
    {label: String.sms, value: 'VOICE'},
    {label: String.telegram, value: 'TELEGRAM'},
  ];

  const [captchaData, setCaptchaData] = useState();
  let isGetCaptcha = false;
  useLayoutEffect(() => {
    getCaptcha();
  }, []);

  const FormatPhone = () => {
    phoneFormat = phone;
    if (phone[0] === '0') {
      phoneFormat = phone.replace('0', '+84');
    }
  };
  const onMethodChanged = (msg) => setGenderTitle(msg);
  const onClick = () => {
  };

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

  const getCaptcha = () => {
    if (isGetCaptcha) return;
    isGetCaptcha = true;
    setCaptchaData();
    getCaptchaApi(
      {
        success: resData => {
          if (resData.data) {
            setCaptchaData(resData.data);
          }
        },
        refLoading,
      }).then();
    isGetCaptcha = false;
  };

  const getTime = () => { return Math.floor(Date.now() / 1000); };

  const GetOTP = () => {
    if (!phone && phone === '') {
      showAlert(String.phoneNumberNotBlank);
      return;
    }
    FormatPhone();
    if (!phoneTest(phoneFormat)) {
      showAlert(String.phoneInvalid);
      return;
    }
    showLoading(refLoading, '');
    sendOtpService(phoneFormat, TYPE_ACTION, {
      success: data => {
        setIsActive(true);
        setOtpSent(true);
        timer = getTime() + 60;
        refreshCountdown();
        hideLoading(refLoading);
      },
      failure: _ => {
        hideLoading(refLoading);
      }
    });
  };
  const ChangeButton = () => {
    if (isActive === true && genderTitle === 'VOICE') {
      return (
        <View style={styles.btnLayMa}>
          <Text style={styles.txtLayMa}>{timerCount}{'s'}</Text>
        </View>
      );
    } else {
      return (
        <TouchableOpacity
          style={styles.btnLayMa}
          onPress={onClick}>
          <Text style={styles.txtLayMa}>{'String.layMa'}</Text>
        </TouchableOpacity>
      );
    }
  };
  const handleBack = () => {
    navigation.goBack();
  };
  const AddTextGuide = () => {
    if (genderTitle === 'TELEGRAM') {
      return (
        <Text style={styles.txtStatus}>{'String.telegramGuide'}</Text>
      );
    }
  };
  const handleContinue = () => {
    navigation.replace(Consts.ScreenIds.Tabs);
  };
  return (
    <>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : ''}
        style={styles.container}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ImageBackground source={Images.bgLogin} style={styles.image}>
            <TouchableOpacity
              hitSlop={{top: 15, left: 15, bottom: 15, right: 15}}
              style={[styles.btnBack, {top: insets.top + 10}]}
              onPress={handleBack}>
            </TouchableOpacity>
            <View style={styles.body}>
              <Text style={styles.txtTitle}>{'String.moiNhapSdtTaoTkMoi'}</Text>
              <View style={styles.blockInput}>
                <View style={styles.MethodRaido}>
                 
                </View>
                <Text style={styles.txtPhone}>{'String.soDienThoai'}</Text>
                <View style={[styles.Otp]}>
                  <TextInput
                    style={styles.otpInput}
                    onChangeText={(newText) => {
                      setOtpSent(false);
                      setChangePhone(newText);
                    }}
                    value={phone}
                    placeholder={'String.nhapSoDienThoai'}
                    keyboardType={'number-pad'}
                  />
                </View>
                <View style={[styles.Otp, {justifyContent: 'flex-end'}]}>
                  <TextInput
                    style={styles.otpInput}
                    onChangeText={onChangeOtp}
                    value={otp}
                    placeholder={'String.nhapMaxacminh'}
                    keyboardType={'number-pad'}
                  />
                  <View style={{
    marginVertical: 10,
    paddingHorizontal: 10,
    paddingVertical: 0,
    height: 40,
    width: 'auto',
    backgroundColor: Colors.grayInput,
    borderRadius: 20,
    justifyContent: 'center',
    minWidth: 100
  }}>
                    {captchaData && 
                    <Image style={{
                      width: 80,
                      height: 30
                    }} resizeMode={'contain'}
                      source={{uri: `data:image/png;base64,${captchaData.captcha}`}} />
                    }
                  </View>
                </View>

                {otpSent && genderTitle === 'VOICE' &&
                <Text style={styles.txtStatus}>{'String.verifyCodeSendTo'}{' '}{phone}</Text>}
                {AddTextGuide()}
                <View style={{flex: 1}}/>
                <TouchableOpacity
                  style={styles.btnDangNhap}
                  onPress={handleContinue}>
                  <Text style={styles.txtDangNhap}>{'String.tiepTuc'}</Text>
                </TouchableOpacity>
              </View>
            </View>
          </ImageBackground>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
      <LoadingIndicator ref={refLoading}/>
    </>
  );
}
