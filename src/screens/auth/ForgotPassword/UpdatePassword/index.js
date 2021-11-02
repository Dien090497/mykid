import {View, Text, TouchableOpacity, TextInput, Image} from 'react-native';
import React, {useRef, useState} from 'react';
import {Colors} from '../../../../assets/colors/Colors';
import LoadingIndicator from '../../../../components/LoadingIndicator';
import {passwordTest1} from '../../../../functions/utils';
import {useTranslation} from 'react-i18next';
import styles from "./styles";
import Images from "../../../../assets/Images";
import NotificationModal from '../../../../components/NotificationModal';
import {UpdatePasswordApi} from '../../../../network/UserInfoService';

export default function UpdatePassword({navigation, route}) {
  const refLoading = useRef(null);
  const refNotification = useRef();
  const [pass, setPass] = useState(false);
  const [isPass, setIsPass] = useState();
  const [showPass, setShowPass] = useState(true);
  const [showIsPass, setShowIsPass] = useState(true);
  const {t} = useTranslation();

  const onConfirm = () => {
    if (pass !== isPass) {
      refNotification.current.open('Mật khấu xác nhận không đúng');
      return;
    }
    if (pass === null || isPass === null) {
      refNotification.current.open('Mật khẩu không được để trống');
      return;
    }
    if (!passwordTest1(pass)) {
      refNotification.current.open(t('common:error_pass1'))
      return;
    }

    let data = {
      phone: route.params.phone,
      newPassword: pass
    }

    UpdatePasswordApi(data, {
      success: res => {
        refNotification.current.open('Cập nhật mật khẩu thành công');
      }
    });

  }

  return (
    <View style={{flex: 1, alignItems: 'center', backgroundColor: Colors.white}}>
      <Header title={t('common:submitOTP')}/>
      <View style={{height: 600, width: '90%', marginHorizontal: '5%', marginTop: '5%'}}>
        <View style={styles.viewInput}>
          <TextInput
            placeholder={'Nhập mật khẩu mới'}
            placeholderTextColor={"#9D9D9D"}
            secureTextEntry={showPass}
            keyboardType={"default"}
            value={pass}
            onChangeText={(text) => setPass(text.trim())}
            underlineColorAndroid={"transparent"}
            maxLength={20}
            minLength={6}
            style={{marginLeft: 10, color: Colors.black, width: '85%'}}
          />
          <TouchableOpacity
            style={styles.viewTob}
            onPress={() => setShowPass(!showPass)}
          >
            <Image
              style={styles.viewImage}
              source={showPass ? Images.icView : Images.icPrivate}/>
          </TouchableOpacity>

        </View>
        <View style={styles.viewInput}>
          <TextInput
            placeholder={'Nhập mã xác minh'}
            placeholderTextColor={"#9D9D9D"}
            secureTextEntry={showIsPass}
            keyboardType={"default"}
            onChangeText={(text) => setIsPass(text.trim())}
            underlineColorAndroid={"transparent"}
            value={isPass}
            maxLength={20}
            minLength={6}
            style={{marginLeft: 10, color: Colors.black, width: '85%'}}
          />
          <TouchableOpacity
            style={styles.viewTob}
            onPress={() => setShowIsPass(!showIsPass)}
          >
            <Image
              style={styles.viewImage}
              source={showIsPass ? Images.icView : Images.icPrivate}/>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={styles.tobConfirm}
          onPress={onConfirm}
        >
          <Text style={styles.txt}>Xác nhận</Text>
        </TouchableOpacity>
        <NotificationModal ref={refNotification}/>
      </View>

      <LoadingIndicator ref={refLoading}/>
    </View>
  );
}
