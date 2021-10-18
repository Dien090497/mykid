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
import React, { useLayoutEffect, useState } from "react";
import { createAccountApi, getCaptchaApi } from "../../../network/UserInfoService";
import { emailTest, passwordTest, saveUserDataFromToken, showAlert } from "../../../functions/utils";

import Button from "../../../components/buttonGradient";
import { Colors } from "../../../assets/colors/Colors";
import Consts from "../../../functions/Consts";
import CustomInput from "../../../components/inputRegister";
import Images from "../../../assets/Images";
import { String } from "../../../assets/strings/String";
import { styles } from "./styles";
import { ErrorMsg } from "../../../assets/strings/ErrorMsg";
import { CheckBox } from "react-native-elements";

const Register = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [checkGmail, setCheckGmail] = useState(false);
  const [code, setCode] = useState('');
  const [checkCode, setCheckCode] = useState(false);
  const [pass, setPass] = useState('');
  const [checkPass, setCheckPass] = useState(false);
  const [showPass, setShowPass] = useState(true);
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
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : ""}
      style={styles.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <Header title={String.register} />
          <View style={styles.Sty_txtEmail}>
            <CustomInput
              placeholder={String.placeholderGmail}
              onChangeText={onChangeGmail}
              value={email}
              notification={checkGmail}
              txtnotification={String.errorGmail}
            />
          </View>
          <View style={styles.Sty_txtCode}>
            <View style={{ width: "100%" }}>
              <CustomInput
                number
                placeholder={String.placeholderCode}
                onChangeText={onChangeCode}
                value={code}
                notification={checkCode}
                txtnotification={String.errorCode}
                maxLength={10}
              />
            </View>
            <View style={{ width: 130, marginLeft: -155 }}>
              <Image
                style={styles.Sty_iconCode}
                source={captchaData ? { uri: `data:image/png;base64,${captchaData.captcha}` } : null} />
            </View>
            <TouchableOpacity
              onPress={getCaptcha}>
              <Image
                style={styles.Sty_iconReset}
                source={Images.icReload} />
            </TouchableOpacity>
          </View>

          <View style={styles.Sty_txtPass}>
            <CustomInput
              placeholder={String.txtNotification}
              onChangeText={onChangePass}
              value={pass}
              notification={checkPass}
              secureTextEntry={showPass}
              txtnotification={String.txtNotification}
              icon
              onChange={onChangeShowPass}
              maxLength={16}
            />
          </View>
          <View style={styles.viewButton}>
            <Button
              activeOpacity={submitActive ? 0 : 1}
              onclick={onclick}
              title={String.registrationConfirmation}
              color={submitActive ? Colors.GradientColor : Colors.GradientColorGray}
            />
          </View>
          <View style={{ marginTop: 15, flexDirection: "row", width: '90%' }}>
            <CheckBox checkedColor='green' uncheckedColor='green' checked={checkbox}
                      onPress={() => setCheckbox(!checkbox)} />
            <Text style={styles.txt_Policy}>{String.acceptMy} <Text style={styles.txtPolicy}
                                                                    onPress={() => console.log("hello")}>{String.agreement}</Text>   <Text
              style={styles.txtPolicy} onPress={() => console.log("Chính sách bảo mật")}>{String.privacyPolicy}</Text>
            </Text>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};
export default Register;
