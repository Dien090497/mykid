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
import DataLocal from '../../../data/dataLocal';
import { Image } from 'react-native';
import Images from '../../../assets/Images';
import PeriodModal from '../../../components/PeriodModal';
import { getClassModesApi, setClassModesApi } from '../../../network/ClassModesService';

export default function DoNotDisturb({navigation}) {
  const refLoading = useRef();
  const refPeriodModal = useRef();
  const [classConfig, setClassConfig] = useState();
  
  useLayoutEffect(() => {
    getClassModes();
  }, []);

  const getClassModes = async () => {
    getClassModesApi(DataLocal.deviceId, {
      success: resData => {
        setClassConfig(resData.data);
      },
      refLoading,
    });
  };

  const toggleSwitch = (obj, i) => {
    const config = Object.assign([], classConfig);
    if (config[i].status === 'ON')
      config[i].status = 'OFF';
    else config[i].status = 'ON';
    setClassConfig(config);
  };

  const toggleClassSetting = (obj, i) => {
    refPeriodModal.current.openModal(obj, onSaveConfig);
  };

  const onSaveConfig = (config) => {
    const configs = Object.assign([], classConfig);
    const index = configs.findIndex((element) => { return element.number === config.number } );
    configs[index] = config;
    setClassConfig(configs);
  }

  const handleSave = () => {
    setClassModesApi(DataLocal.deviceId, classConfig, {
      success: resData => {
        setClassConfig(resData.data);
      },
      refLoading,
    });
  };

  return (
    <View style={styles.contain}>
      <Header title={String.header_doNotDisturb} />
      <View style={styles.container}>
        <View style={styles.viewImg}>
          <Image source={Images.icAlarmClock} resizeMode={'stretch'} style={styles.iconClock}/>
        </View>
        {classConfig && classConfig.map((obj, i) => (
          <View key={i} style={styles.viewItem}>
            <TouchableOpacity style={styles.viewText} onPress={() => {
                toggleClassSetting(obj, i);
              }}>
              <View style={styles.rowDirection}>
                <Text style={styles.txtTime}>{obj.from.substring(0, 5)} - {obj.to.substring(0, 5)}</Text>
                <Image source={Images.icRightArrow} style={styles.icArrow}/>
              </View>
            </TouchableOpacity>
            <View style={styles.viewSwitch}>
              <Switch
                trackColor={{false: Colors.gray, true: '#81b0ff'}}
                onValueChange={() => {toggleSwitch(obj, i)}}
                value={obj.status === 'ON'}
              />
            </View>
          </View>
        ))}
        <TouchableOpacity style={styles.button} onPress={handleSave}>
          <Text style={styles.buttonText}>{String.save}</Text>
        </TouchableOpacity>
      </View>
      <PeriodModal ref={refPeriodModal}/>
      <LoadingIndicator ref={refLoading} />
    </View>
  );
}
