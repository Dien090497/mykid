import React, {useState, useEffect} from 'react';
import {
  View,
  TouchableOpacity,
  Text,
} from 'react-native';
import {styles} from './styles';
import {String} from '../../../../assets/strings/String';
import {showAlert} from '../../../../functions/utils';
// import {changePasswordApi} from '../../../../network/UserInfoService';
import Header from "../../../../components/Header";
import {useSafeAreaInsets} from "react-native-safe-area-context";
import { Colors } from '../../../../assets/colors/Colors';

export default ChangePassword = ({navigation, route}) => {
  const [oldpassword, onChangeOldPassword] = useState('');
  const [newpassword, onChangeNewPassword] = useState('');
  const [renewpassword, onChangeReNewPassword] = useState('');
  const [isSubmitActive, setIsSubmitActive] = useState(false);

  useEffect(() => {
    if (oldpassword && newpassword && renewpassword) {
      setIsSubmitActive(true);
    } else {
      setIsSubmitActive(false);
    }
  }, [oldpassword, newpassword, renewpassword]);

  const handleChangePassword = () => {
    if (!isSubmitActive) return;
    if (newpassword === '') {
      showAlert(String.passwordNotBlank);
    } else if (oldpassword === '' ) {
      showAlert(String.oldPasswordNotBlank);
    }else if (renewpassword === '') {
      showAlert(String.confirmPasswordNotBlank);
    } else if (newpassword.length < 8 || newpassword.length > 32) {
      showAlert(String.passwordLengthNotCorrect);
    } else if (newpassword !== renewpassword) {
      showAlert(String.passwordConfirmNotCorrect);
    } else {
      changePassword();
    }
  };
  const changePassword = () => {
    // changePasswordApi(oldpassword, newpassword, {
    //   success: async (data) => {
    //     if (data.token) {
    //       await saveUserDataFromToken(data.token);
    //     }
    //     showAlert(String.changePasswordSuccess, {
    //       close: () => {
    //         navigation.goBack();
    //       },
    //     });
    //   }, failure: () => {
    //     showAlert(String.changePasswordFail);
    //   },
    // });
  };

  return (
    <View style={[styles.container, {paddingBottom: useSafeAreaInsets().bottom}]}>
      <Header title={String.changePassword.replace('"', '').replace('"', '')}/>
      <View style={styles.mainView}>
        <View style={styles.guide}>
          <Text style={styles.guideText}>{String.passNeed8Char}</Text>
        </View>
        {/* <ChangePasswordInputComponent password={oldpassword} onChangePassword={onChangeOldPassword}
                                      placeholder={String.matKhauCu}/>
        <ChangePasswordInputComponent password={newpassword} onChangePassword={onChangeNewPassword}
                                      placeholder={String.matKhauMoi}/>
        <ChangePasswordInputComponent password={renewpassword}
                                      onChangePassword={onChangeReNewPassword}
                                      placeholder={String.nhapLaiMatKhauMoi}/> */}
        <TouchableOpacity
          style={[styles.btnDangNhap, isSubmitActive ? {backgroundColor: Colors.lightBlue} : {}]}
          onPress={() => {
            handleChangePassword();
          }}>
          <Text style={styles.txtDangNhap}>{String.done}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
