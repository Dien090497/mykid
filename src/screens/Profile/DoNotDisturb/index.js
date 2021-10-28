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
import PeriodModal from '../../../components/PeriodModal';
import { getClassModesApi, setClassModesApi } from '../../../network/ClassModesService';
import Consts from '../../../functions/Consts';
import { useTranslation } from "react-i18next";

export default function DoNotDisturb({navigation}) {
  const refLoading = useRef();
  const refPeriodModal = useRef();
  const [classConfig, setClassConfig] = useState();
  const { t } = useTranslation();
  const dayOfWeeks = [
    t('common:monDay'),
    t('common:tueDay'),
    t('common:wed'),
    t('common:thu'),
    t('common:fri'),
    t('common:sat'),
    t('common:sun')
  ];

  useLayoutEffect(() => {
    getClassModes();
  }, []);

  const getClassModes = async () => {
    getClassModesApi(DataLocal.deviceId, {
      success: resData => {
        const data = Object.assign([],resData.data)
        data.map((item,i)=>{
          if (item.period === null || item.period === undefined){
            item.period = '0000000'
          }
        })
        setClassConfig(data);
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
    navigation.navigate(Consts.ScreenIds.DisturbSetting, {config: obj,  saveConfig: onSaveConfig});
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
  const dayOfWeek = (text) => {
    const day = text.split('')
    const dayOfWeek = day.reduce((total,item,index) =>{
      return item === '0' ? total : total+' '+dayOfWeeks[index];
    },'');
    return dayOfWeek
  }

  return (
    <View style={styles.contain}>
      <Header title={t('common:header_doNotDisturb')} />
      <ScrollView style={styles.container}>
        <View style={styles.viewImg}>
          <Image source={Images.icDoNotDisturb} resizeMode={'contain'} style={styles.iconClock}/>
        </View>
        <View style={{width:'100%',paddingHorizontal:15,flex:1}}>
          {classConfig && classConfig.map((obj, i) => (
            <View key={i} style={styles.viewItem}>
              <TouchableOpacity style={styles.viewText} onPress={() => {
                toggleClassSetting(obj, i)}}>
                <View style={styles.rowDirection}>
                  {obj.from === obj.to ?
                    <View style={{flex:9}}>
                      <Text style={styles.txtAddTime}>{t('common:textAddTime')}</Text>
                    </View> :
                    <View style={{flex:9}}>
                      <Text style={styles.txtTime}>{obj.from.substring(0, 5)} - {obj.to.substring(0, 5)}</Text>
                      <Text style={styles.txtDay}>{dayOfWeek(obj.period)}</Text>
                    </View>}
                  <Image source={Images.icRightArrow} style={styles.icArrow}/>
                </View>
              </TouchableOpacity>
              {obj.from === obj.to ? null :
                <View style={styles.viewSwitch}>
                  <Switch
                    trackColor={{false: '#8E8E93', true: Colors.colorMain}}
                    thumbColor={Colors.white}
                    onValueChange={() => {toggleSwitch(obj, i)}}
                    value={obj.status === 'ON'}
                  />
                </View>}
            </View>
          ))}
        </View>
        <TouchableOpacity style={styles.button} onPress={handleSave}>
          <Text style={styles.buttonText}>{t('common:confirm')}</Text>
        </TouchableOpacity>
      </ScrollView>
      <PeriodModal ref={refPeriodModal}/>
      <LoadingIndicator ref={refLoading} />
    </View>
  );
}
