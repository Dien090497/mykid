import React, { useRef } from 'react';
import {
  View,
  Image,
  Text,
  TouchableOpacity,
} from 'react-native';
import {styles} from './styles';
import Header from '../../../components/Header';
import Images from '../../../assets/Images';
import LoadingIndicator from '../../../components/LoadingIndicator';
import { findWatchsApi } from '../../../network/UserInfoService';
import DataLocal from '../../../data/dataLocal';
import { useTranslation } from 'react-i18next';
import NotificationModal from '../../../components/NotificationModal';
import Consts from "../../../functions/Consts";

export default function FindDevice({navigation}) {
  const refLoading = useRef();
  const refNotification = useRef();
  const { t } = useTranslation();

  const handleFindDevice = async () => {
    await findWatchsApi(DataLocal.deviceId, {
      success: resData => {
        if (resData.data) {
          refNotification.current.open(t('common:sendRequestSuccess'))
        }
      },
      refLoading,
      refNotification,
    });
  };

  const gotoHomeScreen = () => {
    if (DataLocal.haveSim === '0') {
        navigation.navigate(Consts.ScreenIds.Tabs)
    }
  }

  return (
    <View style={styles.contain}>
      <Header title={t('common:header_findDevice')} />
      <View style={styles.container}>
        <View style={styles.imageView}>
         <Image
           source={Images.icAlarmClocks}
           resizeMode={'stretch'}
           style={styles.iconClock}
         />
       </View>
        <View style={styles.viewText}>
          <Text style={styles.textPlus}>{t('common:find_device_note0')}</Text>
          <Text style={styles.textPlus}>{t('common:find_device_note1')}</Text>
          <Text style={styles.textPlus}>{t('common:find_device_note2')}</Text>
          <Text style={styles.textPlus}>{t('common:find_device_note3')}</Text>
          <Text style={styles.textPlus}>{t('common:find_device_note4')}</Text>
        </View>
        <TouchableOpacity style={styles.button} onPress={handleFindDevice}>
          <Text style={styles.buttonText}>{t('common:header_findDevice')}</Text>
        </TouchableOpacity>
      </View>
      <LoadingIndicator ref={refLoading} />
      <NotificationModal ref={refNotification} goBack={gotoHomeScreen} />
    </View>
  );
}
