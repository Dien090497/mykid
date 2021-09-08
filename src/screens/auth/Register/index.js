import React, { useRef, useState, useLayoutEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  Alert,
  Platform,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Linking,
  Image,
} from "react-native";
import { styles } from "./styles";
import Images from "../../../assets/Images";
import { String } from "../../../assets/strings/String";
import { Colors } from "../../../assets/colors/Colors";
import { emailTest, passwordTest } from "../../../functions/utils";
import { createAccountApi, getCaptchaApi } from "../../../network/UserInfoService";
import CustomInput from "../../../components/inputRegister";
import Button from "../../../components/buttonGradient";

const Register = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [checkGmail, setCheckGmail] = useState(false);
  const [code, setCode] = useState("");
  const [checkCode, setCheckCode] = useState(false);
  const [pass, setPass] = useState("");
  const [checkPass, setCheckPass] = useState(false);
  const [showPass, setShowPass] = useState(true);
  const [checkbox, setCheckbox] = useState(false);
  const [captchaData, setCaptchaData] = useState();
  let isGetCaptcha = false;

  useLayoutEffect(() => {
    getCaptcha();
  }, []);

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
              if (resData.data) {
                setCheckCode(false)
                navigation.navigate('connectionScreen')
              }
            },
            failure: erro => {
              setCheckCode(true)
            }
          }).then();
      }
    } else {
      Alert.alert("Thông báo", "Vui lòng đọc thảo thuận người dùng và chính sách bảo mật rồi đánh dấu vào đồng ý");
    }
  };
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : ""}
      style={styles.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ImageBackground source={Images.bgLogin} style={styles.image}>
          <CustomInput
            placeholder={String.placeholderGmail}
            onChangeText={onChangeGmail}
            value={email}
            notification={checkGmail}
            txtnotification={String.errorGmail}
          />
          <View style={styles.Sty_txtCode}>
            <View style={{ width: "50%" }}>
              <CustomInput
                number
                placeholder={String.placeholderCode}
                onChangeText={onChangeCode}
                value={code}
                notification={checkCode}
                txtnotification={String.errorCode}
              />
            </View>
            <View style={{ width: "40%", padding: 2 }}>
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
          <CustomInput
            placeholder={String.txtNotification}
            onChangeText={onChangePass}
            value={pass}
            notification={checkPass}
            secureTextEntry={showPass}
            txtnotification={String.txtNotification}
            icon
            onChange={onChangeShowPass}
          />
          <View
            style={{
              width: "100%",
              marginTop: 50,
              justifyContent: "center",
            }}
          >
            <Button
              onclick={onclick}
              title={String.registrationConfirmation}
              color={Colors.GradientColor}
            />
          </View>
          <View style={{ marginTop: 30, flexDirection: "row" }}>
            <TouchableOpacity
              onPress={() => setCheckbox(!checkbox)}
            >
              {
                checkbox ?
                  <Image
                    style={styles.Sty_iconCheckbox}
                    source={Images.iconCheck} />
                  :
                  <View
                    style={{ ...styles.Sty_iconCheckbox, borderRadius: 10, borderColor: "#009900", borderWidth: 1 }} />
              }
            </TouchableOpacity>
            <Text style={styles.txt_Policy}>
              {String.acceptMy} <Text style={styles.txtPolicy}
                                      onPress={() => console.log("hello")}>{String.agreement}</Text><Text
              style={styles.txtPolicy} onPress={() => console.log("Chính sách bảo mật")}> {String.privacyPolicy}</Text>
            </Text>
          </View>
        </ImageBackground>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};
export default Register;
