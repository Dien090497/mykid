import React, { useLayoutEffect, useRef, useState } from 'react';
import {
  Switch,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {styles} from './styles';
import Header from '../../../components/Header';
import {String} from '../../../assets/strings/String';
import LoadingIndicator from '../../../components/LoadingIndicator';
import { Colors } from '../../../assets/colors/Colors';
import { getSoundModesApi, setSoundModesApi } from '../../../network/UserInfoService';
import DataLocal from '../../../data/dataLocal';
import { Image } from 'react-native';
import Images from '../../../assets/Images';
import { showAlert } from '../../../functions/utils';
import Consts from '../../../functions/Consts';

export default function AlarmClock({navigation}) {
  const [mode, setMode] = useState();
  const refLoading = useRef();
  const [alarmConfig, setAlarmConfig] = useState([
    {time: '00:00', value: 1, isOn: true, mode: 'Một lần'},
    {time: '00:00', value: 2, isOn: true, mode: 'Một lần'},
    {time: '00:00', value: 3, isOn: false, mode: 'Một lần'},
  ]);

  useLayoutEffect(() => {
    // getSoundModes();
  }, []);

  const getSoundModes = async () => {
    // getSoundModesApi(DataLocal.deviceId, {
    //   success: resData => {
    //     if (resData.data && resData.data.mode) {
    //       setMode(resData.data.mode)
    //     }
    //     console.log(resData.data.mode);
    //     if (resData.data.mode === -1) {
    //       console.log('unknown mode => set to vibration');
    //       setSoundModes(3);
    //     }
    //   },
    //   refLoading,
    // });
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

  const toggleSwitch = (obj, i) => {
    const config = Object.assign([], alarmConfig);
    config[i].isOn = !config[i].isOn;
    setAlarmConfig(config);
    console.log(obj);
    console.log(i);
  };

  const toggleAlarmSetting = (obj, i) => {
    navigation.navigate(Consts.ScreenIds.AlarmSetting);
  };

  return (
    <View style={styles.contain}>
      <Header title={String.header_alarmClock} />
      <View style={styles.container}>
        <View style={styles.viewImg}>
          <Image source={Images.icAlarmClock} resizeMode={'stretch'} style={styles.iconClock}/>
        </View>
        {alarmConfig.map((obj, i) => (
          <View style={styles.viewItem}>
            <TouchableOpacity style={styles.viewText} onPress={() => {
                toggleAlarmSetting(obj, i);
              }}>
              <View style={styles.rowDirection}>
                <Text style={styles.txtTime}>{obj.time}</Text>
                <Image source={Images.icRightArrow} style={styles.icArrow}/>
              </View>
              <Text style={styles.txtMode}>{obj.mode}</Text>
            </TouchableOpacity>
            <View style={styles.viewSwitch}>
              <Switch
                trackColor={{false: Colors.gray, true: '#81b0ff'}}
                onValueChange={() => {toggleSwitch(obj, i)}}
                value={obj.isOn}
              />
            </View>
          </View>
        ))}
      </View>
      <LoadingIndicator ref={refLoading} />
    </View>
  );
}
