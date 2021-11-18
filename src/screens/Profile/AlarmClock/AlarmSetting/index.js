import React, { useLayoutEffect, useRef, useState } from 'react';
import {
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { styles } from './styles';
import Header from '../../../../components/Header';
import LoadingIndicator from '../../../../components/LoadingIndicator';
import { Colors } from '../../../../assets/colors/Colors';
import DataLocal from '../../../../data/dataLocal';
import { Image } from 'react-native';
import Images from '../../../../assets/Images';
import { TimePicker } from 'react-native-wheel-picker-android';
import { setAlarmApi } from '../../../../network/AlarmService';
import { useTranslation } from 'react-i18next';
import NotificationModal from '../../../../components/NotificationModal';
import Consts from "../../../../functions/Consts";

export default function AlarmSetting({navigation, route}) {
  const refLoading = useRef();
  const refNotification = useRef();
  const [config, setConfig] = useState();
  const [time, setTime] = useState();
  const { t } = useTranslation();
  const [dayOfWeeks, setdayOfWeeks] = useState([
    {day: t('common:sun'), value: 7, isOn: false},
    {day: t('common:monDay'), value: 1, isOn: false},
    {day: t('common:tueDay'), value: 2, isOn: false},
    {day: t('common:wed'), value: 3, isOn: false},
    {day: t('common:thu'), value: 4, isOn: false},
    {day: t('common:fri'), value: 5, isOn: false},
    {day: t('common:sat'), value: 6, isOn: false},
  ]);

  useLayoutEffect(() => {
    if (route.params && route.params.config) {
      setConfig(route.params.config);
      if (route.params.config.frequency === 'CUSTOM') {
        const custom = route.params.config.custom;
        for (let index = 0; index < dayOfWeeks.length; index++) {
          dayOfWeeks[index].isOn = custom.charAt(index) === '1';
        }
      }
      const splitTime = route.params.config.time.split(':');
      let date = new Date();
      date.setHours(Math.floor(splitTime[0]));
      date.setMinutes(Math.floor(splitTime[1]));
      date.setSeconds(0);
      setTime(date);
    }
  }, []);

  const resetDay = () => {
    const days = Object.assign([], dayOfWeeks);
    days.forEach(day => day.isOn = false);
    setdayOfWeeks(days);
  };
  const chooseAllDay = () => {
    const days = Object.assign([], dayOfWeeks);
    days.forEach(day => day.isOn = true);
    setdayOfWeeks(days);
  };

  const toggleDay = (day, i) => {
    const days = Object.assign([], dayOfWeeks);
    days[i].isOn = !days[i].isOn;
    setdayOfWeeks(days);
    let custom = '';
    days.forEach(element => {
      custom += element.isOn ? '1' : '0';
    });
    const obj = Object.assign({}, config);
    obj.frequency = 'CUSTOM';
    obj.custom = custom;
    setConfig(obj);
  };

  const handleSave = () => {
    const obj = Object.assign({}, config);
    obj.status = 'ON';
    if (obj.frequency === 'CUSTOM') {
      obj.custom = '';
      dayOfWeeks.forEach(element => {
        obj.custom += element.isOn ? '1' : '0';
      });
      if (obj.custom === '0000000') {
        refNotification.current.open(t('common:selectAtLeastOneDay'))
        return;
      }
    }

    setConfig(obj);
    setAlarmApi(DataLocal.deviceId, obj, {
      success: resData => {
        if (route.params && route.params.saveConfig) {
          route.params.saveConfig(resData.data);
          navigation.goBack();
        }
      },
      refLoading,
      refNotification,
    });
  };

  const onTimeSelected = (timeSelect) => {
    const split = timeSelect.toString().split(' ');
    if (split.length > 4) {
      const obj = Object.assign({}, config);
      obj.time = split[4];
      setConfig(obj);
    }
  }

  const gotoHomeScreen = () => {
    if (DataLocal.haveSim === '0') {
      DataLocal.saveHaveSim('1').then(r =>
        navigation.navigate(Consts.ScreenIds.Tabs)
      );
    }
  }

  return (
    <View style={styles.contain}>
      <Header title={t('common:header_alarmSetting')} />
      <ScrollView>
        <View style={styles.chooseClock}>
          <View style={[styles.viewTime, Platform.OS !== 'ios' ? {height: 150, paddingTop: 20} : {}]}>
              {time && <TimePicker
                initDate={time}
                onTimeSelected={onTimeSelected}
                format24
              />}
            </View>
        </View>
        <View style={{flex:1, marginHorizontal:20}}>
          <Text style={styles.txtTitle}>{t('common:repeat')}</Text>
          { config &&
          <TouchableOpacity style={styles.viewItem} onPress={() => {
            const obj = Object.assign([], config);
            obj.frequency = 'ONCE';
            obj.custom = null;
            setConfig(obj);
            resetDay();
          }}>
            <View style={styles.viewText}>
              <Text style={[styles.txtTitle, config.frequency !== 'ONCE' ? {color: Colors.titleTxt} : {color: Colors.black}]}>{t('common:once')}</Text>
            </View>
            <View style={styles.viewSwitch}>
              { config.frequency === 'ONCE' &&
              <Image source={Images.icCheck} style={styles.icArrow}/>
              }
            </View>
          </TouchableOpacity>
          }
          { config &&
          <TouchableOpacity style={styles.viewItem} onPress={() => {
            const obj = Object.assign([], config);
            obj.frequency = 'EVERY_DAY';
            obj.custom = null;
            setConfig(obj);
            resetDay();
          }}>
            <View style={styles.viewText} >
              <Text style={[styles.txtTitle, config.frequency !== 'EVERY_DAY' ? {color: Colors.titleTxt} : {color:Colors.black}]}>{t('common:everyday')}</Text>
            </View>
            <View style={styles.viewSwitch}>
              { config.frequency === 'EVERY_DAY' &&
              <Image source={Images.icCheck} style={styles.icArrow}/>
              }
            </View>
          </TouchableOpacity>
          }
          { config &&
          <View style={styles.customView}>
            <TouchableOpacity style={styles.customTitle} onPress={()=>{
              const obj = Object.assign([], config);
              obj.frequency = 'CUSTOM';
              obj.custom = null;
              setConfig(obj);
              chooseAllDay();
            }
            }>
              <View style={styles.viewText}>
                <Text style={[styles.txtMode, config.frequency !== 'CUSTOM' ? {color: Colors.titleTxt} : {}]}>{t('common:custom')}</Text>
              </View>
              <View style={styles.viewSwitch}>
                { config.frequency === 'CUSTOM' &&
                <Image source={Images.icCheck} style={styles.icArrow}/>
                }
              </View>
            </TouchableOpacity>
            <View style={{flexDirection:'row',marginVertical:5,marginHorizontal:15}}>
              {dayOfWeeks.map((day, i) => (
                <TouchableOpacity key={day.day} style={[styles.viewDay, day.isOn ? {backgroundColor: Colors.colorMain} : {}]} onPress={() => {
                  toggleDay(day, i);
                }}>
                  <Text style={styles.txtDay}>{day.day}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
          }
          <TouchableOpacity style={styles.button} onPress={handleSave}>
            <Text style={styles.buttonText}>{t('common:save')}</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <LoadingIndicator ref={refLoading} />
      <NotificationModal ref={refNotification} goBack={gotoHomeScreen}/>
    </View>
  );
}
