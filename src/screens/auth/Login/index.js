import * as Actions from "../../../redux/actions";

import {
  Alert,
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
import React, { useEffect, useRef, useState } from "react";
import { emailTest, passwordTest, showAlert } from "../../../functions/utils";
import { useDispatch, useSelector } from "react-redux";

import Button from "../../../components/buttonGradient";
import { Colors } from "../../../assets/colors/Colors";
import ComponentInput from "../../../components/CustomInput";
import Consts from "../../../functions/Consts";
import Images from "../../../assets/Images";
import LoadingIndicator from "../../../components/LoadingIndicator";
import { String } from "../../../assets/strings/String";
import { getListDeviceApi } from "../../../network/DeviceService";
import { styles } from "./styles";
import { CheckBox } from "react-native-elements";

const Login = ({ navigation }) => {
  const dispatch = useDispatch();
  const loggedInUserInfo = useSelector((state) => state.loginReducer.dataInfo);

  const [email, setEmail] = useState("hyhung@gmail.com");
  const [password, setPassword] = useState("hung12345");
  const [checkbox, setCheckbox] = useState(false);

  const refLoading = useRef();

  useEffect(() => {
    onLoggedIn();
  }, [loggedInUserInfo])

  const onLoggedIn = async () => {
    if (loggedInUserInfo.id && checkbox) {
      getListDeviceApi(loggedInUserInfo.id, Consts.pageDefault, 100, '', {
        success: resData => {
          let devices = resData.data.filter(val => val.status === 'ACTIVE');
          if (devices.length === 0) {
            navigation.navigate(Consts.ScreenIds.AddDeviceScreen, {isShowAlert: resData.data.length > 0});
          } else {
            navigation.navigate(Consts.ScreenIds.Tabs);
          }
        },
        refLoading,
      });
    }
  };

  const onChangeGmail = (text) => {
    setEmail(text);
  };

  const onChangePassword = (text) => {
    setPassword(text);
  };

  const onSubmit = () => {
    if(checkbox){
      if (!emailTest(email)) {
        showAlert(String.errorGmail);
        return;
      }
      if (!passwordTest(password)) {
        showAlert(String.txtNotification);
        return;
      }
      dispatch(Actions.actionLogin({email, password, refLoading}));
    }else {
      Alert.alert(String.notification, String.error_message);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ImageBackground source={Images.bgLogin} style={styles.image}>
          <View style={styles.ViewResetPass}>
            <View/>
            <TouchableOpacity onPress={() => navigation.navigate(Consts.ScreenIds.Register)}>
              <Text
                style={styles.txtRegister}>{String.register}</Text>
            </TouchableOpacity>
          </View>
          <ComponentInput
            placeholder={"Hộp thư"}
            value={email}
            onChangeText={onChangeGmail}
            Sty_input={{ backgroundColor: "#FFF", borderRadius: 100 }}
            title={"Tài khoản: "}
          />
          <ComponentInput
            placeholder={'Nhập 8-16 ký tự'}
            value={password}
            secureTextEntry
            onChangeText={onChangePassword}
            Sty_input={{ backgroundColor: "#FFF", borderRadius: 100 }}
            title={"Mật khẩu: "}
          />
          <View
            style={{
              width: "100%",
              marginTop: 10,
              justifyContent: "center",
            }}
          >
            <Button
              onclick={onSubmit}
              title={String.login}
              color={Colors.gradient}
              Sty_btn={{ borderWidth: 4, borderColor: "#D71921" }}
              txtColor={"#000000"}
            />
          </View>

          <View style={{ marginTop: 15, flexDirection: "row"}}>
            <CheckBox checkedColor='green' uncheckedColor='green' checked={checkbox}
              onPress={() => setCheckbox(!checkbox)} />
            <Text style={styles.txt_Policy}>{String.acceptMy} <Text style={styles.txtPolicy}
                                      onPress={() => console.log("hello")}>{String.agreement}</Text>    <Text
              style={styles.txtPolicy} onPress={() => console.log("Chính sách bảo mật")}>{String.privacyPolicy}</Text>
            </Text>
          </View>
        </ImageBackground>
      </TouchableWithoutFeedback>
      <LoadingIndicator ref={refLoading} />
    </KeyboardAvoidingView>
  );
};
export default Login;
