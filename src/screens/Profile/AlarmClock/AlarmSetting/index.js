import React, { useLayoutEffect, useRef, useState } from 'react';
import {
  Switch,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {styles} from './styles';
import Header from '../../../../components/Header';
import {String} from '../../../../assets/strings/String';
import LoadingIndicator from '../../../../components/LoadingIndicator';
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';
import { Colors } from '../../../../assets/colors/Colors';
import { getSoundModesApi, setSoundModesApi } from '../../../../network/UserInfoService';
import DataLocal from '../../../../data/dataLocal';
import { Image } from 'react-native';
import Images from '../../../../assets/Images';
import { showAlert } from '../../../../functions/utils';
import DateTimePicker from '@react-native-community/datetimepicker';

const getDateDefault = (date = new Date()) => {
  date.setMinutes(0);
  date.setHours(0);
  return date;
};

export default function AlarmSetting({navigation}) {
  const refLoading = useRef();
  const [mode, setMode] = useState(0);
  const [time, setTime] = useState(getDateDefault());
  const [show, setShow] = useState(false);
  const [dayOfWeek, setDayOfWeek] = useState([
    {day: 'T2', value: 2, isOn: false,},
    {day: 'T3', value: 3, isOn: false},
    {day: 'T4', value: 4, isOn: false},
    {day: 'T5', value: 5, isOn: false},
    {day: 'T6', value: 6, isOn: false},
    {day: 'T7', value: 7, isOn: false},
    {day: 'CN', value: 1, isOn: false},
  ]);

  useLayoutEffect(() => {
    // getSoundModes();
  }, []);

  const getSoundModes = async () => {
    getSoundModesApi(DataLocal.deviceId, {
      success: resData => {
        if (resData.data && resData.data.mode) {
          setMode(resData.data.mode)
        }
        console.log(resData.data.mode);
        if (resData.data.mode === -1) {
          console.log('unknown mode => set to vibration');
          setSoundModes(3);
        }
      },
      refLoading,
    });
  };

  const setSoundModes = async (index) => {
    // setSoundModesApi(DataLocal.deviceId, index, {
    //   success: resData => {
    //     if (resData.data && resData.data.mode) {
    //       setMode(resData.data.mode)
    //     }
    //   },
    //   refLoading,
    // });
  };

  const onMethodChanged = (index) => {
    if (index != mode) {
      setSoundModes(index);
    }
  }
  const resetDay = () => {
    const days = Object.assign([], dayOfWeek);
    days.forEach(day => day.isOn = false);
    setDayOfWeek(days);
  };

  const toggleDay = (day, i) => {
    const days = Object.assign([], dayOfWeek);
    days[i].isOn = !days[i].isOn;
    setDayOfWeek(days);
    setMode(2);
  };

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    // setShow(Platform.OS === 'ios');
    setTime(currentDate);
  };

  const handleSave = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.contain}>
      <Header title={''} />
      <View style={styles.container}>
        <View style={styles.viewTime}>
          <DateTimePicker
            testID="dateTimePicker"
            value={time}
            mode={'time'}
            is24Hour={true}
            display='spinner'
            onChange={onChange}
        />
        </View>
        <Text style={styles.txtTitle}>{String.repeat}</Text>
        <View style={styles.viewItem}>
          <TouchableOpacity style={styles.viewText} onPress={() => {
              setMode(0);
              resetDay();
            }}>
            <Text style={[styles.txtMode, mode !== 0 ? {color: '#a9a9a9'} : {}]}>{String.once}</Text>
          </TouchableOpacity>
          <View style={styles.viewSwitch}>
            { mode === 0 &&
            <Image source={Images.icCheck} style={styles.icArrow}/>
            }
          </View>
        </View>
        <View style={styles.viewItem}>
          <TouchableOpacity style={styles.viewText} onPress={() => {
              setMode(1);
              resetDay();
            }}>
            <Text style={[styles.txtMode, mode !== 1 ? {color: '#a9a9a9'} : {}]}>{String.everyday}</Text>
          </TouchableOpacity>
          <View style={styles.viewSwitch}>
            { mode === 1 &&
            <Image source={Images.icCheck} style={styles.icArrow}/>
            }
          </View>
        </View>
        <View style={styles.viewItem}>
          <View style={styles.viewText}>
            <Text style={[styles.txtMode, mode !== 2 ? {color: '#a9a9a9'} : {}]}>{String.custom}</Text>
          </View>
          <View style={styles.viewSwitch}>
            { mode === 2 &&
            <Image source={Images.icCheck} style={styles.icArrow}/>
            }
          </View>
        </View>
        <View style={[styles.viewItem, {marginTop: -20, paddingVertical: 10}]}>
        {dayOfWeek.map((day, i) => (
          <TouchableOpacity style={[styles.viewDay, day.isOn ? {backgroundColor: Colors.blueTitle} : {}]} onPress={() => {
            toggleDay(day, i);
            }}>
            <Text style={styles.txtDay}>{day.day}</Text>
          </TouchableOpacity>
        ))}
        </View>
        <TouchableOpacity style={styles.button} onPress={handleSave}>
          <Text style={styles.buttonText}>{String.save}</Text>
        </TouchableOpacity>
      </View>
      <LoadingIndicator ref={refLoading} />
    </View>
  );
}
