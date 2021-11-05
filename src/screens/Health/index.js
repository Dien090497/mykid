import {
  Image,
  ScrollView,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useLayoutEffect, useRef, useState } from 'react';
import Header from '../../components/Header';
import { Colors } from '../../assets/colors/Colors';
import { styles } from './styles';
import Images from '../../assets/Images';
import { useTranslation } from 'react-i18next';
import {
  createWalkingMode,
  getListWalkingTime,
  updateActiveWalkingMode,
  updateWalkingMode, walkingTimeTracking,
} from "../../network/HealthService";
import DataLocal from '../../data/dataLocal';
import LoadingIndicator from '../../components/LoadingIndicator';
import NotificationModal from '../../components/NotificationModal';
import FromToTimeModal from '../../components/FromToTimeModal';
import Consts from '../../functions/Consts';

export default function Health({ navigation }) {
  const refLoading = useRef();
  const refNotification = useRef();
  const refFromToTime = useRef();
  const { t } = useTranslation();
  const [data, setData] = useState(null);
  const [tracking, setTracking] = useState(null);

  useLayoutEffect(() => {
    getData();
  }, []);

  const getData = () =>{
    getListWalkingTime(DataLocal.deviceId, {
      success: res => {
        const d = []
        d[0] = res.data[0]
        d[1] = res.data[1]
        d[2] = res.data[2]
        setData(d);
      },
      refLoading,
      refNotification,
    });
    walkingTimeTracking(
      {
        deviceId: DataLocal.deviceId,
        startDate: new Date().toISOString().slice(0,10),
        endDate: new Date().toISOString().slice(0,10),
        page: 0,
        size: 100
      },{
        success: res =>{
          setTracking(res.data);
        },
        refLoading,
        refNotification,
      }
    )
  }

  const updateTime = (obj, i) =>{
    const body ={
      deviceId: obj.deviceId,
      startTime: obj.startTime.slice(0,5),
      endTime: obj.endTime.slice(0,5),
      active: obj.active
    }
    updateWalkingMode(obj.id, body,{
      success: res=>{
        const newData = Object.assign([],data);
        newData[i] = res.data
        setData(newData)
      },
      refLoading,
      refNotification,
    });
  }

  const setTimeItem = (obj, i) =>{
    if (obj){
      const from = obj.startTime.split(':');
      const to = obj.endTime.split(':');
      const timeFrom = new Date();
      timeFrom.setHours(from[0]);
      timeFrom.setMinutes(from[1]);
      const timeTo = new Date();
      timeTo.setHours(to[0]);
      timeTo.setMinutes(to[1]);
      refFromToTime.current.openModal(timeFrom, timeTo,
        (config)=>{
          updateWalkingMode(obj.id, {
            deviceId: obj.deviceId,
            startTime: config.from.slice(0,5),
            endTime: config.to.slice(0,5),
            active: obj.active
          },{
            success: res=>{
              const newData = Object.assign([],data);
              newData[i] = res.data
              setData(newData)
            },
            refLoading,
            refNotification,
          });
        });
    } else {
      refFromToTime.current.openModal(new Date(), new Date(),
        (config) => {
          const timeFrom = config.from.slice(0,5);
          const timeTo = config.to.slice(0,5);
          createWalkingMode(
            {
              deviceId: DataLocal.deviceId,
              startTime: timeFrom,
              endTime: timeTo,
            },
            {
              success: res =>{
                const newData = Object.assign([],data);
                newData[i] = res.data
                setData(newData)
              },
              refLoading,
              refNotification
            }
          )
        },
      );
    }
  }

  const toggleSwitch = (obj, i) =>{
    let active = obj.active === 0 ? 1 : 0;
    updateActiveWalkingMode(obj.id, {deviceId: obj.deviceId ,active: active},{
      success: res=>{
        const newData = Object.assign([],data);
        newData[i] = res.data
        setData(newData)
      },
      refLoading,
      refNotification,
    })
  }

  return (
    <View style={styles.body}>
      <Header title={t('common:header_health')} />
      <ScrollView>
        <View style={styles.viewTop}>
          <View style={styles.viewCount}>
            <Image source={Images.icHealthHeart} style={styles.icon} resizeMode={'stretch'} />
            <Text style={[styles.txtTop, { color: Colors.greenHealth }]}>{tracking && (tracking[0] ? tracking[0].distance : '0')}</Text>
            <Text style={[styles.subTxtTop, { color: Colors.greenHealth }]}>m</Text>
          </View>
          <View style={styles.viewCount}>
            <Image source={Images.icHealthStep} style={styles.iconMid} resizeMode={'stretch'} />
            <Text style={[styles.txtTop, { color: Colors.orangeHealth }]}>{tracking && (tracking[0] ? tracking[0].steps : '0')}</Text>
            <Text style={[styles.subTxtTop, { color: Colors.orangeHealth }]}>{t('common:step')}</Text>
          </View>
          <View style={styles.viewCount}>
            <Image source={Images.icHealthCalo} style={styles.icon} resizeMode={'stretch'} />
            <Text style={[styles.txtTop, { color: Colors.blueHealth }]}>{tracking && (tracking[0] ? tracking[0].calo : '0')}</Text>
            <Text style={[styles.subTxtTop, { color: Colors.blueHealth }]}>{t('common:calo')}</Text>
          </View>
        </View>
        {data && data.map((obj, i) => (
          <View key={i} style={styles.viewItem}>
            <TouchableOpacity style={styles.viewText} onPress={() =>{setTimeItem(obj, i)}}>
              <View style={styles.rowDirection}>
                {!obj ?
                  <View style={{flex:9}}>
                    <Text style={styles.txtAddTime}>{t('common:textAddTime')}</Text>
                  </View> :
                  <View style={{flex:9}}>
                    <Text style={styles.txtTime}>{obj.startTime.slice(0,5) +' - ' + obj.endTime.slice(0,5)}</Text>
                  </View>}
                <Image source={Images.icRightArrow} style={styles.icArrow}/>
              </View>
            </TouchableOpacity>
            {!obj ? null :
              <View style={styles.viewSwitch}>
                <Switch
                  trackColor={{false: '#8E8E93', true: Colors.colorMain}}
                  thumbColor={Colors.white}
                  onValueChange={() => {toggleSwitch(obj, i)}}
                  value={obj.active === 1}
                />
              </View>}
          </View>
        ))}
        <TouchableOpacity style={styles.button} onPress={()=>{navigation.navigate(Consts.ScreenIds.DetailHealth)}}>
          <Text style={styles.buttonText}>{t('common:detail')}</Text>
        </TouchableOpacity>
      </ScrollView>
      <LoadingIndicator ref={refLoading} />
      <NotificationModal ref={refNotification} />
      <FromToTimeModal ref={refFromToTime} />
    </View>
  );
}
