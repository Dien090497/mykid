import React, { useLayoutEffect, useRef, useState } from 'react';
import {
  ScrollView,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {styles} from './styles';
import Header from '../../../components/Header';
import LoadingIndicator from '../../../components/LoadingIndicator';
import { Colors } from '../../../assets/colors/Colors';
import DataLocal from '../../../data/dataLocal';
import { Image } from 'react-native';
import Images from '../../../assets/Images';
import Consts from '../../../functions/Consts';
import { getAlarmsApi, setAlarmApi } from '../../../network/AlarmService';
import { useTranslation } from 'react-i18next';
import NotificationModal from '../../../components/NotificationModal';

export default function AlarmClock({navigation}) {
  const refLoading = useRef();
  const refNotification = useRef();
  const [alarmConfig, setAlarmConfig] = useState();
  const { t } = useTranslation();
  const dayOfWeeks = [
    t('common:sun'),
    t('common:monDay'),
    t('common:tueDay'),
    t('common:wed'),
    t('common:thu'),
    t('common:fri'),
    t('common:sat')
  ];

  useLayoutEffect(() => {
    getAlarms();
  }, []);

  const getAlarms = async () => {
    getAlarmsApi(DataLocal.deviceId, {
      success: resData => {
        setAlarmConfig(resData.data);
      },
      refLoading,
      refNotification,
    });
  };

  const toggleSwitch = (obj, i) => {
    const config = Object.assign([], alarmConfig);
    if (config[i].status === 'ON')
      config[i].status = 'OFF';
    else config[i].status = 'ON';
    setAlarmApi(DataLocal.deviceId, config[i], {
      success: resData => {
        setAlarmConfig(config);
      },
      refLoading,
      refNotification,
    });
  };

  const toggleAlarmSetting = (obj, i) => {
    navigation.navigate(Consts.ScreenIds.AlarmSetting, {config: obj, saveConfig: onSaveConfig});
  };

  const onSaveConfig = (config) => {
    const configs = Object.assign([], alarmConfig);
    const index = configs.findIndex((element) => { return element.number === config.number } );
    configs[index] = config;
    setAlarmConfig(configs);
  }

  const getTextFrequency = (obj) => {
    if (obj.frequency === 'ONCE') {
      return t('common:once');
    } else if (obj.frequency === 'EVERY_DAY') {
      return t('common:everyday');
    } else if (obj.custom) {
      let custom = '';
      for (let index = 0; index < dayOfWeeks.length; index++) {
        if (obj.custom.charAt(index) === '1') {
          custom = custom + dayOfWeeks[index]  + ' ';
        }
      }
      return custom
    }
  }

  const gotoHomeScreen = () => {
    if (DataLocal.haveSim === '0') {
        navigation.navigate(Consts.ScreenIds.Tabs)
    }
  }

  return (
    <View style={styles.contain}>
      <Header title={t('common:header_alarmClock')} />
      <View style={styles.container}>
        <View style={styles.viewImg}>
          <Image source={Images.icAlarmClock} resizeMode={'contain'} style={styles.iconClock}/>
        </View>
        <ScrollView>
          {alarmConfig && alarmConfig.map((obj, i) => (
            <View key={i} style={styles.viewItem}>
              <TouchableOpacity style={styles.viewText} onPress={() => {
                toggleAlarmSetting(obj, i);
              }}>
                <View style={styles.rowDirection}>
                  <Text style={styles.txtTime}>{obj.time.substring(0, 5)}</Text>
                  <Image source={Images.icRightArrow} style={styles.icArrow}/>
                </View>
                <Text style={styles.txtMode}>{getTextFrequency(obj)}</Text>
              </TouchableOpacity>
              <View style={styles.viewSwitch}>
                <Switch
                  trackColor={{false: Colors.gray, true: Colors.colorMain}}
                  thumbColor={Colors.white}
                  onValueChange={() => {toggleSwitch(obj, i)}}
                  value={obj.status === 'ON'}
                />
              </View>
            </View>
          ))}
        </ScrollView>
      </View>
      <LoadingIndicator ref={refLoading} />
      <NotificationModal ref={refNotification} goBack={gotoHomeScreen}/>
    </View>
  );
}
