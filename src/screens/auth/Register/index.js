import React, {useRef, useState} from 'react';
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
  Linking,Image
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
import CustomInput from '../../../components/inputRegister';
import Button from '../../../components/buttonGradient';
const Register =({navigation})=> {
  const [gmail, setGmail] = useState("");
  const [checkGmail, setCheckGmail] = useState(false);
  const [code, setCode] = useState("");
  const [checkCode, setCheckCode] = useState(false);
  const [pass, setPass] = useState("");
  const [checkPass, setCheckPass] = useState(false);
  const [showPass, setShowPass] = useState(true);
  const [checkbox, setCheckbox] = useState(false);

  const onChangeGmail = (text) => {
    setGmail(text);
  };
  const onChangePass = (text) => {
    setPass(text);
  };
  const onChangeCode = (text) => {
    setCode(text);
  };
  const onChangeShowPass = () => {
    console.log("11111");
    setShowPass(!showPass);
  };
  const onclick = () => {
    if (checkbox) {
      // if (gmail == "") {
      //   setCheckGmail(true);
      // } else {
      //   let filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
      //   if (!filter.test(gmail)) {
      //     setCheckGmail(true);
      //   } else {
      //     setCheckGmail(false);
      //   }
      // }
      // if (pass == "") {
      //   setCheckPass(true);
      // } else {
      //   let filer = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
      //   if (!filer.test(pass)) {
      //     setCheckPass(true);
      //   } else {
      //     setCheckPass(false);
      //   }
      // }
      // if (checkCode == "") {
      //   setCheckCode(true);
      // }
      navigation.navigate('connectionScreen')
    }else {
      Alert.alert("Thông báo", "Vui lòng đọc thảo thuận người dùng và chính sách bảo mật rồi đánh dấu vào đồng ý")
    }
  };
  return (
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : ''}
        style={styles.container}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ImageBackground source={Images.bgLogin} style={styles.image}>
            <CustomInput
              placeholder={String.placeholderGmail}
              onChangeText={onChangeGmail}
              value={gmail}
              notification={checkGmail}
              txtnotification={String.errorGmail}
            />
            <View style={styles.Sty_txtCode}>
              <View style={{ width: "50%" }}>
                <CustomInput
                  placeholder={String.placeholderCode}
                  onChangeText={onChangeCode}
                  value={code}
                  notification={checkCode}
                  txtnotification={String.errorCode}
                />
              </View>
              <View style={{ width: "40%" }}>
                <Image
                  style={styles.Sty_iconCode}
                  source={Images.materialIcons} />
              </View>
              <TouchableOpacity>
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
                    <View style={{ ...styles.Sty_iconCheckbox, borderRadius: 10, borderColor: "#009900", borderWidth: 1 }} />
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
}
export default Register;
