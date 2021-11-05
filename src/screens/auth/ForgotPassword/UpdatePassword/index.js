import {View, Text, TouchableOpacity, TextInput, Image} from 'react-native';
import React, {useRef, useState} from 'react';
import {Colors} from '../../../../assets/colors/Colors';
import LoadingIndicator from '../../../../components/LoadingIndicator';
import { passwordTest } from "../../../../functions/utils";
import {useTranslation} from 'react-i18next';
import styles from "./styles";
import Images from "../../../../assets/Images";
import NotificationModal from '../../../../components/NotificationModal';
import {UpdatePasswordApi} from '../../../../network/UserInfoService';
import Consts from "../../../../functions/Consts";

export default function UpdatePassword({navigation, route}) {
  const refLoading = useRef(null);
  const refNotification = useRef();
  const [pass, setPass] = useState('');
  const [isPass, setIsPass] = useState('');
  const [showPass, setShowPass] = useState(true);
  const [showIsPass, setShowIsPass] = useState(true);
  const {t} = useTranslation();

  const onConfirm = () => {
    if (pass !== isPass) {
      refNotification.current.open(t('common:error_pass'));
      return;
    }

    if (!passwordTest(pass)) {
      refNotification.current.open(t('common:error_pass1'))
      return;
    }

    let data = {
      phone: route.params.phone,
      newPassword: pass
    }

    UpdatePasswordApi(data, {
      success: res => {
        refNotification.current.open(t('common:successPassword'), () => {
            navigation.navigate(Consts.ScreenIds.Login)
          }
        );
        setPass('');
        setIsPass('');
      },
      refNotification
    });
  }

  return (
    <View style={{flex: 1, alignItems: 'center', backgroundColor: Colors.white}}>
      <Header title={t('common:updatePassword')}/>
      <View style={{height: 800, width: '90%', marginHorizontal: '5%', marginTop: '8%'}}>
        <View style={styles.viewInput}>
          <TextInput
            placeholder={t('common:newPassword')}
            placeholderTextColor={"#9D9D9D"}
            secureTextEntry={showPass}
            keyboardType={"default"}
            value={pass}
            onChangeText={(text) => setPass(text.trim())}
            underlineColorAndroid={"transparent"}
            maxLength={20}
            minLength={6}
            style={styles.txtInput}
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
            placeholder={t('common:isNewPassword')}
            placeholderTextColor={"#9D9D9D"}
            secureTextEntry={showIsPass}
            keyboardType={"default"}
            onChangeText={(text) => setIsPass(text.trim())}
            underlineColorAndroid={"transparent"}
            value={isPass}
            maxLength={20}
            minLength={6}
            style={styles.txtInput}
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
        {pass !== '' && isPass !== '' ? (
          <TouchableOpacity onPress={onConfirm} style={styles.tobConfirm}>
            <Text style={styles.txt}>{t('common:confirm')}</Text>
          </TouchableOpacity>
        ) : (
          <View style={[styles.tobConfirm, {backgroundColor: 'rgba(228, 228, 228, 1)'}]}>
            <Text style={styles.txt}>{t('common:confirm')}</Text>
          </View>
        )}
        <NotificationModal ref={refNotification}/>
      </View>

      <LoadingIndicator ref={refLoading}/>
    </View>
  );
}
