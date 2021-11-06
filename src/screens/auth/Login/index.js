import * as Actions from '../../../redux/actions';

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
  TextInput, StatusBar, Modal,
} from 'react-native';
import React, {useLayoutEffect, useRef, useState} from 'react';
import {passwordTest, phoneTest1} from '../../../functions/utils';
import {useDispatch, useSelector} from 'react-redux';

import {Colors} from '../../../assets/colors/Colors';
import Consts from '../../../functions/Consts';
import Images from '../../../assets/Images';
import LoadingIndicator from '../../../components/LoadingIndicator';
import {getListDeviceApi} from '../../../network/DeviceService';
import {styles} from './styles';
import {CheckBox} from 'react-native-elements';
import DataLocal from '../../../data/dataLocal';
import {useTranslation} from 'react-i18next';
import {WheelPicker} from 'react-native-wheel-picker-android';
import NotificationModal from '../../../components/NotificationModal'

const LANGUAGES = [
  {code: 'vi', label: 'Việt Nam'},
  {code: 'en', label: 'English'}
];
const NAME_LANGUAGE = [ 'Việt Nam', 'English' ];

const Login = ({navigation}) => {
  const dispatch = useDispatch();
  const loggedInUserInfo = useSelector((state) => state.loginReducer.dataInfo);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [checkbox, setCheckbox] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [indexLanguage, setIndexLanguage] = useState(0);
  const refLoading = useRef();
  const refNotification = useRef();
  const {t, i18n} = useTranslation();

  useLayoutEffect(() => {
    for (const key in LANGUAGES) {
      if (LANGUAGES[key].code === DataLocal.language) setIndexLanguage(parseInt(key));
    }
    onLoggedIn();

  }, [loggedInUserInfo]);

  const onLoggedIn = async () => {
    if (loggedInUserInfo.id && checkbox) {
      getListDeviceApi(loggedInUserInfo.id, Consts.pageDefault, 100, '', '', {
        success: resData => {
          onNavigate(resData);
        },
        refLoading,
        refNotification,
      });
    }
  };

  const onNavigate = async (resData) => {
    let devices = resData.data.filter(val => val.status === 'ACTIVE');
    if (devices.length === 0) {
      navigation.navigate(Consts.ScreenIds.AddDeviceScreen, {isShowAlert: resData.data.length > 0});
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

  const onChangePhone = (text) => {
    setPhoneNumber(text);
  };

  const onChangePassword = (text) => {
    setPassword(text);
  };

  const editPhone = () => {
    if (phoneNumber[0] === '0') {
      return '+84' + phoneNumber.substring(1);
    }
    if (phoneNumber[0] === '8' && phoneNumber[1] === '4') {
      return ('+' + phoneNumber);
    }
  }

  const onSubmit = () => {
    let phone = editPhone(phoneNumber);
    if (checkbox) {
      if (!phoneTest1(phone)) {
        refNotification.current.open(t('common:error_phone'))
        return;
      }
      if (!passwordTest(password)) {
        refNotification.current.open(t('common:txtNotification'))
        return;
      }
      dispatch(Actions.actionLogin({phone, password, refLoading, refNotification}));
    } else {
      refNotification.current.open(t('common:error_message'))
    }
  };

  const setChooseLanguage = () => {
    i18n.changeLanguage(LANGUAGES[indexLanguage].code);
    setShowModal(false)
  };

  const onItemSelected = (selectedItem) => {
    setIndexLanguage(selectedItem)
  }


  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}>
      <StatusBar backgroundColor={Colors.white} barStyle='dark-content' animated={true}/>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView>
          <ImageBackground source={Images.bgLogin} style={styles.image} resizeMode='stretch'>
            <Image source={Images.bannerLogin} style={styles.banner}/>
            <Text style={styles.title}>{t('common:login')}</Text>
            <TextInput
              placeholder={t('common:header_account')}
              placeholderTextColor='#B5B4B4'
              onChangeText={onChangePhone}
              value={phoneNumber}
              style={styles.textInput}
              keyboardType={'phone-pad'}
            />
            <TextInput
              placeholder={t('common:header_password')}
              placeholderTextColor='#B5B4B4'
              onChangeText={onChangePassword}
              value={password}
              secureTextEntry={true}
              style={styles.textInput}
            />
            <View style={styles.ViewResetPass}>
              <View/>
              <TouchableOpacity
                onPress={() => navigation.navigate(Consts.ScreenIds.ForgotPassword)}
                style={{position: 'absolute', left: 0}}
              >
                <Text
                  style={[styles.txtRegister, {color: 'rgba(95, 95, 95, 1)'}]}>{t('common:forgotPassword')}</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => navigation.navigate(Consts.ScreenIds.Register)}>
                <Text
                  style={styles.txtRegister}>{t('common:register')}</Text>
              </TouchableOpacity>
            </View>
            <View style={{
              width: '100%',
              marginTop: 10,
              justifyContent: 'center',
            }}>
              <TouchableOpacity onPress={onSubmit} style={styles.btnSubmit}>
                <Text style={styles.textSubmit}>{t('common:login')}</Text>
              </TouchableOpacity>
            </View>

            <View style={{marginTop: 15, flexDirection: 'row', marginBottom: 20}}>
              <CheckBox checkedColor={Colors.colorMain} uncheckedColor={Colors.colorMain} checked={checkbox}
                        onPress={() => setCheckbox(!checkbox)}/>
              <Text style={styles.txt_Policy}>{t('common:acceptMy')}
                <Text> </Text>
                <Text style={styles.txtPolicy} onPress={() => console.log('hello')}>{t('common:agreement')}</Text>
                <Text>{'\n'}</Text>
                <Text style={styles.txtPolicy}
                      onPress={() => console.log('Chính sách bảo mật')}>{t('common:privacyPolicy')}</Text>
              </Text>
            </View>

            <View style={{
              width: '100%',
              marginTop: 10,
              justifyContent: 'center',
              alignItems: 'flex-end',
            }}>
              <TouchableOpacity onPress={() => {
                setShowModal(true)
              }}>
                <Text>{t('common:txtLanguage')}<Text style={{
                  color: Colors.colorMain,
                  textDecorationLine: 'underline',
                }}>{DataLocal.language === 'vi' ? 'Việt Nam' : 'English'}</Text></Text>
              </TouchableOpacity>
            </View>
          </ImageBackground>
        </ScrollView>
      </TouchableWithoutFeedback>
      <Modal
        visible={showModal}
        transparent={true}
        animationType='slide'
      >
        <View style={styles.modalView}>
          <TouchableOpacity style={styles.modalViewTob} onPress={() => {
            setShowModal(false)
          }}/>
          <View style={styles.wheelPickerView}>
            <View style={styles.tobWheel}>
              <TouchableOpacity style={styles.confirmView} onPress={setChooseLanguage}>
                <Text style={styles.textConfirm}>{t('common:confirm')}</Text>
              </TouchableOpacity>
            </View>
            <WheelPicker
              data={NAME_LANGUAGE}
              style={styles.wheel}
              selectedItemTextSize={20}
              initPosition={indexLanguage}
              selectedItem={indexLanguage}
              selectedItemTextFontFamily={'Roboto'}
              itemTextFontFamily={'Roboto'}
              onItemSelected={onItemSelected}
            />
          </View>
        </View>
      </Modal>
      <LoadingIndicator ref={refLoading}/>
      <NotificationModal ref={refNotification}/>
    </KeyboardAvoidingView>
  );
};
export default Login;
