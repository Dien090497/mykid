import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  View,
  TouchableOpacity,
  Text
} from 'react-native';
import React, {useLayoutEffect, useRef, useState} from "react";
import {changePasswordApi} from '../../../network/UserInfoService';
import {passwordTest, saveUserDataFromToken} from '../../../functions/utils';
import Header from '../../../components/Header';
import CustomInput from '../../../components/inputRegister';
import {styles} from './styles';
import {ScaleHeight} from '../../../functions/Consts';
import {useTranslation} from 'react-i18next';
import NotificationModal from '../../../components/NotificationModal'

const ChangePassword = ({navigation}) => {
  const refNotification = useRef();
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newPasswordConfirm, setNewPasswordConfirm] = useState('');
  const [showCurrentPassword, setShowCurrentPassword] = useState(true);
  const [showNewPassword, setShowNewPassword] = useState(true);
  const [showNewPasswordConfirm, setShowNewPasswordConfirm] = useState(true);
  const [submitActive, setSubmitActive] = useState(false);
  const {t} = useTranslation();

  useLayoutEffect(() => {
    setSubmitActive(currentPassword && newPassword && newPasswordConfirm)
  }, [currentPassword, newPassword, newPasswordConfirm]);

  const onSubmit = () => {
    if (!submitActive) return;
    if (!passwordTest(currentPassword)) {
      refNotification.current.open(t('common:currentPasswordInvalid'));
      return;
    }
    if (!passwordTest(newPassword)) {
      refNotification.current.open(t('common:newPasswordInvalid'));
      return;
    }
    if (newPassword !== newPasswordConfirm) {
      refNotification.current.open(t('common:passwordConfirmInvalid'));
      return;
    }
    if (newPassword === currentPassword) {
      refNotification.current.open(t('common:passwordDuplicated'));
      return;
    }

    changePasswordApi(currentPassword, newPassword, {
      success: resData => {
        if (resData.data.token) {
          saveUserDataFromToken(resData.data.token);
        }
        refNotification.current.open(t('common:changePasswordSuccess'), () => {
          navigation.goBack();
        });
      },
      failure: _ => {
      },
      refNotification: refNotification,
    }).then();
  };
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : ''}
      style={styles.container}>
      <Header title={t('common:changePassword')}/>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={[styles.container, {marginTop: ScaleHeight.small, marginHorizontal: '5%'}]}>
          <View style={styles.Sty_txtPass}>
            <CustomInput
              placeholder={t('common:enterCurrentPassword')}
              onChangeText={(text) => {
                setCurrentPassword(text)
              }}
              value={currentPassword}
              show={true}
              secureTextEntry={showCurrentPassword}
              txtnotification={t('common:enterCurrentPassword')}
              onChange={() => setShowCurrentPassword(!showCurrentPassword)}
              icon
            />
          </View>
          <View style={styles.Sty_txtPass}>
            <CustomInput
              placeholder={t('common:enterNewPassword')}
              onChangeText={(text) => {
                setNewPassword(text)
              }}
              value={newPassword}
              show={true}
              secureTextEntry={showNewPassword}
              txtnotification={t('common:enterNewPassword')}
              onChange={() => setShowNewPassword(!showNewPassword)}
              icon
            />
          </View>
          <View style={styles.Sty_txtPass}>
            <CustomInput
              placeholder={t('common:reEnterNewPassword')}
              onChangeText={(text) => {
                setNewPasswordConfirm(text)
              }}
              value={newPasswordConfirm}
              show={true}
              secureTextEntry={showNewPasswordConfirm}
              txtnotification={t('common:reEnterNewPassword')}
              onChange={() => setShowNewPasswordConfirm(!showNewPasswordConfirm)}
              icon
            />
          </View>
          <View style={styles.viewButton}>
            <TouchableOpacity
              onPress={onSubmit}
              style={((currentPassword === '' || newPassword === '' || newPasswordConfirm === '')) ?
                [styles.tobSubmit, {backgroundColor: 'rgba(228, 228, 228, 1)'}] : styles.tobSubmit}
              disabled={(currentPassword === '' || newPassword === '' || newPasswordConfirm === '') ? true : false}
            >
              <Text style={styles.txtConfirm}>{t('common:confirm')}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
      <NotificationModal ref={refNotification}/>
    </KeyboardAvoidingView>
  );
};
export default ChangePassword;
