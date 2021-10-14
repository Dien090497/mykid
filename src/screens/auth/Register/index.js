import {
  Image,
  ImageBackground,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import React, {useLayoutEffect, useState} from "react";
import {createAccountApi, getCaptchaApi} from "../../../network/UserInfoService";
import {emailTest, passwordTest, saveUserDataFromToken, showAlert} from "../../../functions/utils";

import Button from "../../../components/buttonGradient";
import {Colors} from "../../../assets/colors/Colors";
import Consts from "../../../functions/Consts";
import CustomInput from "../../../components/inputRegister";
import Images from "../../../assets/Images";
import {String} from "../../../assets/strings/String";
import {styles} from "./styles";
import {ErrorMsg} from "../../../assets/strings/ErrorMsg";
import {CheckBox} from "react-native-elements";

const Register = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [checkGmail, setCheckGmail] = useState(false);
  const [code, setCode] = useState('');
  const [checkCode, setCheckCode] = useState(false);
  const [pass, setPass] = useState('');
  const [checkPass, setCheckPass] = useState(false);
  const [showPass, setShowPass] = useState(true);
  const [showUserVerification, setShowUserVerification] = useState(true);
  const [checkbox, setCheckbox] = useState(false);
  const [captchaData, setCaptchaData] = useState();
  const [submitActive, setSubmitActive] = useState(false);
  let isGetCaptcha = false;

  useLayoutEffect(() => {
    getCaptcha();
  }, []);

  useLayoutEffect(() => {
    setSubmitActive(email && pass && code)
  }, [email, pass, code]);

  const onChangeGmail = (text) => {
    setEmail(text);
  };
  const onChangePass = (text) => {
    setPass(text);
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
      }).then();
    isGetCaptcha = false;
  };
  const onChangeCode = (text) => {
    setCode(text);
  };
  const onChangeShowPass = () => {
    setShowPass(!showPass);
  };

  const ShowUserVerification = () => {
    setShowUserVerification(!showUserVerification);
  };

  const onclick = () => {
    if (!submitActive) return;
    let data = {
      email: email,
      password: pass,
      answer: code,
      captchaId: captchaData.captchaId,
    };
    if (checkbox) {
      setCheckGmail(!emailTest(email));
      setCheckPass(!passwordTest(pass));
      if (emailTest(email) && passwordTest(pass)) {
        createAccountApi(data,
          {
            success: resData => {
              if (resData && resData.data && resData.data.token) {
                setCheckCode(false)
                saveUserDataFromToken(resData.data.token).then(token => {
                  navigation.navigate(Consts.ScreenIds.ConnectionScreen)
                });
              }
            },
            failure: error => {
              console.log(error);
              setCode('');
              getCaptcha();
            }
          }).then();
      }
    } else {
      showAlert(String.error_message)
    }
  };
  const oncRegister = () => {}
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : ""}
      style={styles.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <Header title={String.register}/>
          <View style={{alignItems: 'center', height: '70%', width: '100%'}}>
            <View style={styles.Sty_txt}>
              <CustomInput
                placeholder={String.placeholderPhone}
                onChangeText={onChangeGmail}
                value={email}
                notification={checkGmail}
                txtnotification={String.errorGmail}
              />
            </View>
            <View style={styles.Sty_txt}>
              <CustomInput
                placeholder={String.passwordUser}
                onChangeText={onChangeCode}
                value={code}
                notification={checkCode}
                secureTextEntry={showPass}
                txtnotification={String.txtNotification}
                icon
                onChange={onChangeShowPass}
                maxLength={16}
              />
            </View>

            <View style={styles.Sty_txt}>
              <CustomInput
                placeholder={String.userVerification}
                onChangeText={onChangePass}
                value={pass}
                notification={checkPass}
                secureTextEntry={showUserVerification}
                txtnotification={String.txtNotification}
                icon
                onChange={ShowUserVerification}
                maxLength={16}
              />
            </View>
            <TouchableOpacity onPress={oncRegister} style={styles.btnSubmit}>
              <Text style={styles.textSubmit}>{String.register}</Text>
            </TouchableOpacity>
            <View style={{marginTop: 15, flexDirection: "row", height: '20%'}}>
              <CheckBox checkedColor='red' uncheckedColor='red' checked={checkbox}
                        onPress={() => setCheckbox(!checkbox)}/>
              <Text style={styles.txt_Policy}>{String.acceptMy}{' '}
                <Text style={styles.txtPolicy}>{String.agreement}</Text>
                <Text style={styles.txtPolicy}>{String.privacyPolicy}</Text>
              </Text>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};
export default Register;
