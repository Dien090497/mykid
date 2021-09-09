import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  TextInput,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView, Image, Alert,
} from "react-native";
import { styles } from "./styles";
import Images from "../../../assets/Images";
import { String } from "../../../assets/strings/String";
import { Colors } from "../../../assets/colors/Colors";
import { useDispatch, useSelector } from "react-redux";
import * as Actions from "../../../redux/actions";
import LoadingIndicator from "../../../components/LoadingIndicator";
import ComponentInput from "../../../components/CustomInput";
import Button from "../../../components/buttonGradient";
import Consts from "../../../functions/Consts";
import { emailTest, passwordTest, showAlert } from "../../../functions/utils";

const Login = ({ navigation }) => {
  const dispatch = useDispatch();
  const loggedInUserInfo = useSelector((state) => state.loginReducer.dataInfo);

  const [email, setEmail] = useState("hyhung@gmail.com");
  const [password, setPassword] = useState("hung12345");
  const [checkbox, setCheckbox] = useState(false);

  const refLoading = useRef();

  useEffect(() => {
    if (loggedInUserInfo.isLoggedIn) {
      navigation.navigate(Consts.ScreenIds.Tabs);
    }
  }, [loggedInUserInfo])

  const onChangeGmail = (text) => {
    setEmail(text);
  };

  const onChangePassword = (text) => {
    setPassword(text);
  };
  const onclick = () => {
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
            placeholder={"8-16 chữ cái + kết hợp số"}
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
              onclick={onclick}
              title={String.login}
              color={Colors.gradient}
              Sty_btn={{ borderWidth: 4, borderColor: "#D71921" }}
              txtColor={"#000000"}
            />
          </View>
          <View style={{ marginTop: 15, flexDirection: "row" }}>
            <TouchableOpacity
              onPress={() => setCheckbox(!checkbox)}
            >
              {
                checkbox ?
                  <Image
                    style={styles.Sty_iconCheckbox}
                    source={Images.iconCheck} />
                  :
                  <View style={styles.Sty_iconCheckbox} />
              }
            </TouchableOpacity>
            <Text style={styles.txt_Policy}>
              {String.acceptMy} <Text style={styles.txtPolicy}
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
