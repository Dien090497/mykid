import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React, {useLayoutEffect, useRef, useState} from 'react';
import {getOtpApi} from '../../../network/UserInfoService';
import {passwordTest1, phoneTest1 } from '../../../functions/utils';

import Consts from '../../../functions/Consts';
import CustomInput from '../../../components/inputRegister';
import {String} from '../../../assets/strings/String';
import {styles} from './styles';
import {CheckBox} from 'react-native-elements';
import { useTranslation } from 'react-i18next';
import NotificationModal from '../../../components/NotificationModal'

const Register = ({navigation}) => {
  const refLoading = useRef(null);
  const refNotification = useRef();
  const [phone, setPhone] = useState('');
  const [checkPhone, setCheckPhone] = useState(false);
  const [pass, setPass] = useState('');
  const [isPass, setIsPass] = useState('');
  const [checkPass, setCheckPass] = useState(false);
  const [showPass, setShowPass] = useState(true);
  const [showUserVerification, setShowUserVerification] = useState(true);
  const [checkbox, setCheckbox] = useState(false);
  const [submitActive, setSubmitActive] = useState(false);
  const { t } = useTranslation();

  useLayoutEffect(() => {
    setSubmitActive(phone && pass)
  }, [phone, pass]);

  const onChangePhone = (text) => {
    setPhone(text.replace(/[^0-9]/g, ''));
  };

  const onChangePass = (text) => {
    setPass(text.trim());
  }

  const onChangePass1 = (text) => {
    setIsPass(text.trim());
  }

  const onChangeShowPass = () => {
    setShowPass(!showPass);
  };

  const ShowUserVerification = () => {
    setShowUserVerification(!showUserVerification);
  };

  const oncRegister = () => {
    if (!checkbox) {
      refNotification.current.open(t('common:error_message'))
      return;
    }
    if (!phoneTest1(phone)) {
      refNotification.current.open(t('common:error_phone'))
      return;
    }
    if (pass !== isPass) {
      refNotification.current.open(t('common:error_pass'))
      return;
    }
    if (!passwordTest1(pass)) {
      refNotification.current.open(t('common:error_pass1'))
      return;
    }

    getOtpApi(phone, {
        success: res => {
          navigation.navigate(Consts.ScreenIds.OTP, {phone: phone, pass: pass, check: true})
        },
        refNotification,
      }
    );
  }
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : ''}
      style={styles.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <Header title={t('common:register')}/>
          <View style={{alignItems: 'center', height: 600, justifyContent: 'center'}}>
            <View style={styles.Sty_txt}>
              <CustomInput
                placeholder={t('common:placeholderPhone')}
                onChangeText={onChangePhone}
                value={phone}
                notification={checkPhone}
                maxLength={true}
                checkKeyboard={true}
              />
            </View>
            <View style={styles.Sty_txt}>
              <CustomInput
                placeholder={t('common:passwordUser')}
                onChangeText={onChangePass}
                value={pass}
                notification={checkPass}
                secureTextEntry={showPass}
                icon
                onChange={onChangeShowPass}
                maxLength={false}
                checkKeyboard={false}
              />
            </View>

            <View style={styles.Sty_txt}>
              <CustomInput
                placeholder={t('common:userVerification')}
                onChangeText={onChangePass1}
                value={isPass}
                notification={checkPass}
                secureTextEntry={showUserVerification}
                icon
                onChange={ShowUserVerification}
                maxLength={false}
                checkKeyboard={false}
              />
            </View>
            {pass !== '' && isPass !== '' && phone !== '' ? (
              <TouchableOpacity onPress={oncRegister} style={styles.btnSubmit}>
                <Text style={styles.textSubmit}>{t('common:register')}</Text>
              </TouchableOpacity>
            ) : (
              <View style={[styles.btnSubmit, {backgroundColor: 'rgba(228, 228, 228, 1)'}]}>
                <Text style={styles.textSubmit}>{t('common:register')}</Text>
              </View>
            )
            }
            <View style={{marginTop: 15, flexDirection: 'row', height: '20%'}}>
              <CheckBox checkedColor='red' uncheckedColor='red' checked={checkbox}
                        onPress={() => setCheckbox(!checkbox)}/>
              <View>
                <Text style={styles.txt_Policy}>{t('common:acceptMy')}{' '}
                  <Text style={styles.txtPolicy}>{t('common:agreement')}</Text>
                </Text>
                <Text style={styles.txtPolicy1}>{t('common:privacyPolicy')}</Text>
              </View>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
      <NotificationModal ref = {refNotification} />
    </KeyboardAvoidingView>
  );
};
export default Register;
