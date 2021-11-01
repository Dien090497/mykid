import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  Text
} from 'react-native';
import {styles} from './styles';
import {String} from '../../assets/strings/String';
import Consts from '../../functions/Consts';
import {useNavigation} from '@react-navigation/core';
import {appStatusBar} from '../../components/CommonUIComponents';
import DataLocal from '../../data/dataLocal';
import { saveUserDataFromToken } from '../../functions/utils';
import { getListDeviceApi } from '../../network/DeviceService';
import { useTranslation } from 'react-i18next';

export default function SplashScreen() {
  const navigation = useNavigation();
  const { t } = useTranslation();

  const [syncFailed, setSyncFailed] = useState(false);
  const [msg, setMsg] = useState(t('common:splashMsg'));

  useEffect(() => {
    loadFromData().then();
  }, []);

  const loadFromData = async () => {
    const token = await DataLocal.getAccessToken();
    if (token) {
      saveUserDataFromToken(token).then(userInfo => {
        getListDeviceApi(userInfo.id, Consts.pageDefault, 100, '', '', {
          success: resData => {
            onNavigate(resData);
          },
        });
      });
      console.log(token);
    } else {
      navigation.replace(Consts.ScreenIds.Auth);
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

  return (
    <View style={{flex: 1, width: '100%'}}>
      {appStatusBar()}
      <View style={styles.container}>
      </View>
      <View style={styles.bottomContainer}>
        {!syncFailed && <Text style={{color: 'grey', padding: 10}}>{msg}</Text>}
        {
          syncFailed &&
          <Text style={{padding: 10}} onPress={retrySync}>{String.resync}</Text>
        }
        {/* {isLoading && <ActivityIndicator style={{marginTop: 20}} animating={true}/>} */}
      </View>
    </View>
  );
}
