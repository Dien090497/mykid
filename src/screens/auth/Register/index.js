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
import React, {useLayoutEffect, useRef, useState} from "react";
import {getOtpApi} from "../../../network/UserInfoService";
import {phoneTest, passwordTest, saveUserDataFromToken, showAlert} from "../../../functions/utils";

import Button from "../../../components/buttonGradient";
import {Colors} from "../../../assets/colors/Colors";
import Consts from "../../../functions/Consts";
import CustomInput from "../../../components/inputRegister";
import Images from "../../../assets/Images";
import {String} from "../../../assets/strings/String";
import {styles} from "./styles";
import {ErrorMsg} from "../../../assets/strings/ErrorMsg";
import {CheckBox} from "react-native-elements";
import {ScreenHeight} from "react-native-elements/dist/helpers";

const Register = ({navigation}) => {
  const refLoading = useRef(null);
  const [phone, setPhone] = useState('');
  const [checkPhone, setCheckPhone] = useState(false);
  const [pass, setPass] = useState('');
  const [isPass, setIsPass] = useState('');
  const [checkPass, setCheckPass] = useState(false);
  const [showPass, setShowPass] = useState(true);
  const [showUserVerification, setShowUserVerification] = useState(true);
  const [checkbox, setCheckbox] = useState(false);
  const [submitActive, setSubmitActive] = useState(false);

  useLayoutEffect(() => {
    setSubmitActive(phone && pass)
  }, [phone, pass]);

  const onChangePhone = (text) => {
    setPhone(text.replace(/[^0-9]/g, ''));
  };

  const onChangePass = (text) => {
    setPass(text);
  }

  const onChangePass1 = (text) => {
     setIsPass(text);
  }

  const onChangeShowPass = () => {
    setShowPass(!showPass);
  };

  const ShowUserVerification = () => {
    setShowUserVerification(!showUserVerification);
  };

  const oncRegister = () => {
     if (pass === isPass) {
       setCheckPhone(!passwordTest(pass));
       if (passwordTest(phone)) {
         getOtpApi(phone , {
             success: res => {
               navigation.navigate(Consts.ScreenIds.OTP, {phone: phone, pass: pass})
             }
           }
         );
       }

     } else {
       showAlert('Mật khẩu không hợp lệ')
     }
  }
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : ""}
      style={styles.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <Header title={String.register}/>
          <View style={{alignItems: 'center', height: 600, justifyContent: 'center', marginHorizontal: 20}}>
            <View style={styles.Sty_txt}>
              <CustomInput
                placeholder={String.placeholderPhone}
                onChangeText={onChangePhone}
                value={phone}
                notification={checkPhone}
                txtnotification={String.errorGmail}
                maxLength={true}
                checkKeyboard={true}
              />
            </View>
            <View style={styles.Sty_txt}>
              <CustomInput
                placeholder={String.passwordUser}
                onChangeText={onChangePass}
                value={pass}
                notification={checkPass}
                secureTextEntry={showPass}
                txtnotification={String.txtNotification}
                icon
                onChange={onChangeShowPass}
                maxLength={false}
                checkKeyboard={false}
              />
            </View>

            <View style={styles.Sty_txt}>
              <CustomInput
                placeholder={String.userVerification}
                onChangeText={onChangePass1}
                value={isPass}
                notification={checkPass}
                secureTextEntry={showUserVerification}
                txtnotification={String.txtNotification}
                icon
                onChange={ShowUserVerification}
                maxLength={false}
                checkKeyboard={false}
              />
            </View>
            {pass !== '' && isPass !== '' && phone !== '' && checkbox ? (
              <TouchableOpacity onPress={oncRegister} style={styles.btnSubmit}>
                <Text style={styles.textSubmit}>{String.register}</Text>
              </TouchableOpacity>
            ):(
              <View style={[styles.btnSubmit, {backgroundColor: 'rgba(228, 228, 228, 1)'}]}>
                <Text style={styles.textSubmit}>{String.register}</Text>
              </View>
            )
            }
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
