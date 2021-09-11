import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import React, { useLayoutEffect, useState } from "react";
import { changePasswordApi } from "../../../network/UserInfoService";
import { passwordTest, saveUserDataFromToken, showAlert } from "../../../functions/utils";

import Button from "../../../components/buttonGradient";
import { Colors } from "../../../assets/colors/Colors";
import CustomInput from "../../../components/inputRegister";
import { String } from "../../../assets/strings/String";
import { styles } from "./styles";

const ChangePassword = ({ navigation }) => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newPasswordConfirm, setNewPasswordConfirm] = useState('');
  const [showCurrentPassword, setShowCurrentPassword] = useState(true);
  const [showNewPassword, setShowNewPassword] = useState(true);
  const [showNewPasswordConfirm, setShowNewPasswordConfirm] = useState(true);
  const [submitActive, setSubmitActive] = useState(false);

  useLayoutEffect(() => {
    if (currentPassword && newPassword && newPasswordConfirm) {
      setSubmitActive(true)
    }
  }, [currentPassword, newPassword, newPasswordConfirm]);

  const onSubmit = () => {
    if (!submitActive) return;
    if (!passwordTest(currentPassword)) {
      showAlert(String.currentPasswordInvalid);
      return;
    }
    if (!passwordTest(newPassword)) {
      showAlert(String.newPasswordInvalid);
      return;
    }
    if (newPassword !== newPasswordConfirm) {
      showAlert(String.passwordConfirmInvalid);
      return;
    }

    changePasswordApi(currentPassword, newPassword, {
      success: resData => {
        if (resData.data.token) {
          saveUserDataFromToken(resData.data.token);
        }
        showAlert(String.changePasswordSuccess, {
          close: () => {
            navigation.goBack();
          },
        });
      },
      failure: _ => {
      }
    }).then();
  };
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : ""}
      style={styles.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <Header title={String.changePassword} />
          <View style={styles.Sty_txtPass}>
            <CustomInput
              placeholder={String.enterCurrentPassword}
              onChangeText={(text) => { setCurrentPassword(text) }}
              value={currentPassword}
              notification={false}
              secureTextEntry={showCurrentPassword}
              txtnotification={String.enterCurrentPassword}
              onChange={() => { setShowCurrentPassword(!showCurrentPassword) }}
              icon
              maxLength={16}
            />
          </View>
          <View style={styles.Sty_txtPass}>
            <CustomInput
              placeholder={String.enterNewPassword}
              onChangeText={(text) => { setNewPassword(text) }}
              value={newPassword}
              notification={false}
              secureTextEntry={showNewPassword}
              txtnotification={String.enterNewPassword}
              onChange={() => { setShowNewPassword(!showNewPassword) }}
              icon
              maxLength={16}
            />
          </View>
          <View style={styles.Sty_txtPass}>
            <CustomInput
              placeholder={String.reEnterNewPassword}
              onChangeText={(text) => { setNewPasswordConfirm(text) }}
              value={newPasswordConfirm}
              notification={false}
              secureTextEntry={showNewPasswordConfirm}
              txtnotification={String.reEnterNewPassword}
              onChange={() => { setShowNewPasswordConfirm(!showNewPasswordConfirm) }}
              icon
              maxLength={16}
            />
          </View>
          <View style={styles.viewButton}>
            <Button
              activeOpacity={submitActive ? 0 : 1}
              onclick={onSubmit}
              title={String.registrationConfirmation}
              color={submitActive ? Colors.GradientColor : Colors.GradientColorGray}
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};
export default ChangePassword;
