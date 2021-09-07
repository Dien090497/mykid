import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  TextInput,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
} from 'react-native';
import {styles} from './styles';
import Images from '../../../assets/Images';
import {String} from '../../../assets/strings/String';
import {useDispatch} from 'react-redux';
import * as Actions from '../../../redux/actions';
import PasswordInputComponent from "../../../components/PasswordInputComponent";
import {showAlert} from '../../../functions/utils';
import LoadingIndicator from '../../../components/LoadingIndicator';

export default function Login({navigation}) {
  const dispatch = useDispatch();

  const [phone, onChangePhone] = useState('');
  const [password, onChangePassword] = useState('');

  const refLoading = useRef();

  const handleLogin = (username, password) => {
    if (username === '' || password === '') {
      showAlert(String.phoneNumberOrPasswordNotBlank);
    } else {
      Keyboard.dismiss();
      dispatch(Actions.actionLogin({username, password, refLoading}));
    }
  };

  const handleForgotPassword = () => {
  };

  const handleRegister = () => {
    navigation.navigate('Register');
  };

  const goBack = () => {
    navigation.goBack();
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ImageBackground source={Images.bgLogin} style={styles.image}>
          <TouchableOpacity
            style={styles.btnClose}
            hitSlop={{top: 10, left: 10, right: 10, bottom: 10}}
            onPress={goBack}>
          </TouchableOpacity>
          <View style={styles.body}>
            <Text style={styles.txtTitle}>{'String.dangNhap'}</Text>
            <View style={styles.blockInput}>
              <Text style={styles.txtPhone}>{'String.soDienThoai'}</Text>
              <TextInput
                style={styles.txtInput}
                onChangeText={onChangePhone}
                value={phone}
                placeholder={'String.nhapSoDienThoai'}
                keyboardType={'number-pad'}
              />
              <Text style={styles.txtPhone}>{'String.matKhau'}</Text>
                <PasswordInputComponent password = {password} onChangePassword ={onChangePassword}  placeholder={'String.nhapMatKhau'}/>
              <TouchableOpacity
                style={styles.btnDangNhap}
                onPress={() => {
                  handleLogin(phone, password);
                }}>
                <Text style={styles.txtDangNhap}>{'String.dangNhap'}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.btnQuenMk}
                onPress={handleForgotPassword}>
                <Text style={styles.txtQuenMk}>{'String.quenMatKhau'}</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.btnDangKy}>
            <Text style={styles.txtQuenMk}>{'String.chuaCoTaiKhoan'}</Text>
            <TouchableOpacity
              hitSlop={{top: 10, bottom: 10, left: 15, right: 15}}
              onPress={handleRegister}>
              <Text style={styles.txtDangKy}>{'String.dangKy'}</Text>
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </TouchableWithoutFeedback>
      <LoadingIndicator ref={refLoading}/>
    </KeyboardAvoidingView>
  );
}
