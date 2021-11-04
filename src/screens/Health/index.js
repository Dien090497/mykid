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
import { getListWalkingTime } from '../../network/HealthService';
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

  useLayoutEffect(() => {
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
  }, []);

  const setTimeItem = (obj) =>{
    obj ? refFromToTime.current.openModal(new Date(), new Date()) : 
    console.log(obj)
  }
  return (
    <View style={styles.body}>
      <Header title={'sức khỏe'} />
      <ScrollView>
        <View style={styles.viewTop}>
          <View style={styles.viewCount}>
            <Image source={Images.icHealthHeart} style={styles.icon} resizeMode={'stretch'} />
            <Text style={[styles.txtTop, { color: Colors.greenHealth }]}>123</Text>
            <Text style={[styles.subTxtTop, { color: Colors.greenHealth }]}>m</Text>
          </View>
          <View style={styles.viewCount}>
            <Image source={Images.icHealthStep} style={styles.iconMid} resizeMode={'stretch'} />
            <Text style={[styles.txtTop, { color: Colors.orangeHealth }]}>123</Text>
            <Text style={[styles.subTxtTop, { color: Colors.orangeHealth }]}>Bước</Text>
          </View>
          <View style={styles.viewCount}>
            <Image source={Images.icHealthCalo} style={styles.icon} resizeMode={'stretch'} />
            <Text style={[styles.txtTop, { color: Colors.blueHealth }]}>123</Text>
            <Text style={[styles.subTxtTop, { color: Colors.blueHealth }]}>Calo</Text>
          </View>
        </View>
        {data && data.map((obj, i) => (
          <View key={i} style={styles.viewItem}>
            <TouchableOpacity style={styles.viewText} onPress={() =>{setTimeItem(obj)}}>
              <View style={styles.rowDirection}>
                {!obj ?
                  <View style={{flex:9}}>
                    <Text style={styles.txtAddTime}>{t('common:textAddTime')}</Text>
                  </View> :
                  <View style={{flex:9}}>
                    <Text style={styles.txtTime}>{(obj.startTime.hour < 10 ? '0'+ obj.startTime.hour : obj.startTime.hour) + ':' +
                    (obj.startTime.minute < 10 ? '0'+ obj.startTime.minute : obj.startTime.minute) +' - ' +
                    (obj.startTime.hour < 10 ? '0'+ obj.startTime.hour : obj.startTime.hour) + ':' +
                    (obj.startTime.minute < 10 ? '0'+ obj.startTime.minute : obj.startTime.minute)}</Text>
                  </View>}
                <Image source={Images.icRightArrow} style={styles.icArrow}/>
              </View>
            </TouchableOpacity>
            {!obj ? null :
              <View style={styles.viewSwitch}>
                <Switch
                  trackColor={{false: '#8E8E93', true: Colors.colorMain}}
                  thumbColor={Colors.white}
                  // onValueChange={() => {toggleSwitch(obj, i)}}
                  value={obj.active === 1}
                />
              </View>}
          </View>
        ))}
        <TouchableOpacity style={styles.button} onPress={()=>{navigation.navigate(Consts.ScreenIds.DetailHealth)}}>
          <Text style={styles.buttonText}>Chi tiết</Text>
        </TouchableOpacity>
      </ScrollView>
      <LoadingIndicator ref={refLoading} />
      <NotificationModal ref={refNotification} />
      <FromToTimeModal ref={refFromToTime} />
    </View>
  );
}
