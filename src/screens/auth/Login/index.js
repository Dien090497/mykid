import * as Actions from "../../../redux/actions";

import {
  Alert,
  Image,
  ImageBackground,
  Keyboard,
  KeyboardAvoidingView,
  Platform, ScrollView,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  TextInput, StatusBar,
} from "react-native";
import React, { useLayoutEffect, useRef, useState } from "react";
import { emailTest, passwordTest, showAlert } from "../../../functions/utils";
import { useDispatch, useSelector } from "react-redux";

import { Colors } from "../../../assets/colors/Colors";
import Consts from "../../../functions/Consts";
import Images from "../../../assets/Images";
import LoadingIndicator from "../../../components/LoadingIndicator";
import { String } from "../../../assets/strings/String";
import { getListDeviceApi } from "../../../network/DeviceService";
import { styles } from "./styles";
import { CheckBox } from "react-native-elements";
import DataLocal from "../../../data/dataLocal";

const Login = ({ navigation }) => {
  const dispatch = useDispatch();
  const loggedInUserInfo = useSelector((state) => state.loginReducer.dataInfo);

  const [email, setEmail] = useState('');
  // const [email, setEmail] = useState("hyhung@gmail.com");
  const [password, setPassword] = useState('');
  const [checkbox, setCheckbox] = useState(false);

  const refLoading = useRef();

  useLayoutEffect(() => {
    onLoggedIn();
  }, [loggedInUserInfo]);

  const onLoggedIn = async () => {
    if (loggedInUserInfo.id && checkbox) {
      getListDeviceApi(loggedInUserInfo.id, Consts.pageDefault, 100, "", "", {
        success: resData => {
          onNavigate(resData);
        },
        refLoading,
      });
    }
  };

  const onNavigate = async (resData) => {
    let devices = resData.data.filter(val => val.status === 'ACTIVE');
    if (devices.length === 0) {
      navigation.navigate(Consts.ScreenIds.AddDeviceScreen, { isShowAlert: resData.data.length > 0 });
    } else {
      if (DataLocal.deviceIndex >= devices.length) {
        DataLocal.deviceIndex = 0;
        await DataLocal.saveDeviceId(devices[0].deviceId);
      } else {
        await DataLocal.saveDeviceId(devices[DataLocal.deviceIndex].deviceId);
      }
      navigation.navigate(Consts.ScreenIds.Tabs);
    }
  };

  const onChangeGmail = (text) => {
    setEmail(text);
  };

  const onChangePassword = (text) => {
    setPassword(text);
  };

  const onSubmit = () => {
    if (checkbox) {
      if (!passwordTest(password)) {
        showAlert(String.txtNotification);
        return;
      }
      dispatch(Actions.actionLogin({ email, password, refLoading }));
    } else {
      Alert.alert(String.notification, String.error_message);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}>
      <StatusBar backgroundColor={Colors.white} barStyle='dark-content' animated={true}/>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView>
          <ImageBackground source={Images.bgLogin} style={styles.image} resizeMode="stretch">
            <Image source={Images.bannerLogin} style={styles.banner} />
            <Text style={styles.title}>{String.login}</Text>
            <TextInput
              placeholder={String.header_account + ":"}
              placeholderTextColor="#B5B4B4"
              onChangeText={onChangeGmail}
              value={email}
              style={styles.textInput}
            />
            <TextInput
              placeholder={String.header_password + ":"}
              placeholderTextColor="#B5B4B4"
              onChangeText={onChangePassword}
              value={password}
              secureTextEntry={true}
              style={styles.textInput}
            />
            <View style={styles.ViewResetPass}>
              <View />
              <TouchableOpacity onPress={() => navigation.navigate(Consts.ScreenIds.Register)}>
                <Text
                  style={styles.txtRegister}>{String.register}</Text>
              </TouchableOpacity>
            </View>
            <View style={{
              width: "100%",
              marginTop: 10,
              justifyContent: "center",
            }}>
              <TouchableOpacity onPress={onSubmit} style={styles.btnSubmit}>
                <Text style={styles.textSubmit}>{String.login}</Text>
              </TouchableOpacity>
            </View>

            <View style={{ marginTop: 15, flexDirection: "row", marginBottom: 40 }}>
              <CheckBox checkedColor={Colors.colorMain} uncheckedColor={Colors.colorMain} checked={checkbox}
                        onPress={() => setCheckbox(!checkbox)} />
              <Text style={styles.txt_Policy}>{String.acceptMy}
                <Text> </Text>
                <Text style={styles.txtPolicy} onPress={() => console.log("hello")}>{String.agreement}</Text>
                <Text> </Text>
                <Text style={styles.txtPolicy}
                      onPress={() => console.log("Chính sách bảo mật")}>{String.privacyPolicy}</Text>
              </Text>
            </View>
          </ImageBackground>
        </ScrollView>
      </TouchableWithoutFeedback>
      <LoadingIndicator ref={refLoading} />
    </KeyboardAvoidingView>
  );
};
export default Login;
