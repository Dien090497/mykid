import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  View,
  TouchableOpacity,
  Text
} from 'react-native';
import React, { useLayoutEffect, useState } from 'react';
import { changePasswordApi } from '../../../network/UserInfoService';
import { passwordTest, saveUserDataFromToken, showAlert } from '../../../functions/utils';

import { Colors } from '../../../assets/colors/Colors';
import CustomInput from '../../../components/inputRegister';
import { styles } from './styles';
import {ScaleHeight} from '../../../functions/Consts';
import { useTranslation } from 'react-i18next';

const ChangePassword = ({ navigation }) => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newPasswordConfirm, setNewPasswordConfirm] = useState('');
  const [showCurrentPassword, setShowCurrentPassword] = useState(true);
  const [showNewPassword, setShowNewPassword] = useState(true);
  const [showNewPasswordConfirm, setShowNewPasswordConfirm] = useState(true);
  const [submitActive, setSubmitActive] = useState(false);
  const { t } = useTranslation();

  useLayoutEffect(() => {
    setSubmitActive(currentPassword && newPassword && newPasswordConfirm)
  }, [currentPassword, newPassword, newPasswordConfirm]);

  const onSubmit = () => {
    if (!submitActive) return;
    if (!passwordTest(currentPassword)) {
      showAlert(('common:currentPasswordInvalid'));
      return;
    }
    if (!passwordTest(newPassword)) {
      showAlert(('common:newPasswordInvalid'));
      return;
    }
    if (newPassword !== newPasswordConfirm) {
      showAlert(('common:passwordConfirmInvalid'));
      return;
    }
    if (newPassword === currentPassword) {
      showAlert(('common:passwordDuplicated'));
      return;
    }

    changePasswordApi(currentPassword, newPassword, {
      success: resData => {
        if (resData.data.token) {
          saveUserDataFromToken(resData.data.token);
        }
        showAlert(('common:changePasswordSuccess'), {
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
      behavior={Platform.OS === 'ios' ? 'padding' : ''}
      style={styles.container}>
      <Header title={t('common:changePassword')} />
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={[styles.container, {marginTop: ScaleHeight.small}]}>
          <View style={styles.Sty_txtPass}>
            <CustomInput
              placeholder={t('common:enterCurrentPassword')}
              onChangeText={(text) => { setCurrentPassword(text) }}
              value={currentPassword}
              notification={false}
              show={false}
              secureTextEntry={showCurrentPassword}
              txtnotification={t('common:enterCurrentPassword')}
              onChange={() => { setShowCurrentPassword(!showNewPassword) }}
              icon
              maxLength={16}
            />
          </View>
          <View style={styles.Sty_txtPass}>
            <CustomInput
              placeholder={t('common:enterNewPassword')}
              onChangeText={(text) => { setNewPassword(text) }}
              value={newPassword}
              notification={false}
              show={true}
              secureTextEntry={showNewPassword}
              txtnotification={t('common:enterNewPassword')}
              onChange={() => { setShowNewPassword(!showNewPassword) }}
              icon
              maxLength={16}
            />
          </View>
          <View style={styles.Sty_txtPass}>
            <CustomInput
              placeholder={t('common:reEnterNewPassword')}
              onChangeText={(text) => { setNewPasswordConfirm(text) }}
              value={newPasswordConfirm}
              notification={false}
              show={true}
              secureTextEntry={showNewPasswordConfirm}
              txtnotification={t('common:reEnterNewPassword')}
              onChange={() => { setShowNewPasswordConfirm(!showNewPasswordConfirm) }}
              icon
              maxLength={16}
            />
          </View>
          <View style={styles.viewButton}>
            <TouchableOpacity
              onPress={onSubmit}
              style={{backgroundColor: Colors.red, width: '88%', height: ScaleHeight.medium* 1.2, justifyContent: 'center', alignItems: 'center', borderRadius: 10}}
            >
              <Text style={{color: Colors.white}}>{t('common:confirm')}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};
export default ChangePassword;
