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
import { String } from '../../../../assets/strings/String';
import LoadingIndicator from '../../../../components/LoadingIndicator';
import { Colors } from '../../../../assets/colors/Colors';
import DataLocal from '../../../../data/dataLocal';
import { Image } from 'react-native';
import Images from '../../../../assets/Images';
import { TimePicker } from 'react-native-wheel-picker-android';
import { setAlarmApi } from '../../../../network/AlarmService';
import { showAlert } from "../../../../functions/utils";

export default function AlarmSetting({navigation, route}) {
  const refLoading = useRef();
  const [config, setConfig] = useState();
  const [time, setTime] = useState();
  const [dayOfWeeks, setdayOfWeeks] = useState([
    {day: 'CN', value: 1, isOn: false},
    {day: 'T2', value: 2, isOn: false},
    {day: 'T3', value: 3, isOn: false},
    {day: 'T4', value: 4, isOn: false},
    {day: 'T5', value: 5, isOn: false},
    {day: 'T6', value: 6, isOn: false},
    {day: 'T7', value: 7, isOn: false},
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
        showAlert(String.selectAtLeastOneDay)
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

  return (
    <View style={styles.contain}>
      <Header title={String.header_alarmSetting} />
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
          <Text style={styles.txtTitle}>{String.repeat}</Text>
          { config &&
          <TouchableOpacity style={styles.viewItem} onPress={() => {
            const obj = Object.assign([], config);
            obj.frequency = 'ONCE';
            obj.custom = null;
            setConfig(obj);
            resetDay();
          }}>
            <View style={styles.viewText}>
              <Text style={[styles.txtTitle, config.frequency !== 'ONCE' ? {color: Colors.titleTxt} : {color: Colors.black}]}>{String.once}</Text>
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
              <Text style={[styles.txtTitle, config.frequency !== 'EVERY_DAY' ? {color: Colors.titleTxt} : {color:Colors.black}]}>{String.everyday}</Text>
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
                <Text style={[styles.txtMode, config.frequency !== 'CUSTOM' ? {color: Colors.titleTxt} : {}]}>{String.custom}</Text>
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
            <Text style={styles.buttonText}>{String.save}</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <LoadingIndicator ref={refLoading} />
    </View>
  );
}
