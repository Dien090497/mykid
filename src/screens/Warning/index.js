import {
  FlatList,
  Image,
  Text,
  View,
} from 'react-native';
import React, { useLayoutEffect, useRef, useState } from 'react';
import { styles } from './styles';
import Header from '../../components/Header';
import { useTranslation } from 'react-i18next';
import NotificationModal from '../../components/NotificationModal';
import LoadingIndicator from '../../components/LoadingIndicator';
import { getNotification } from '../../network/WarningService';
import Images from '../../assets/Images';
import Moment from 'moment';
import DataLocal from "../../data/dataLocal";
import Consts from "../../functions/Consts";
let page = 0;
const sizePage = 50;

export default function DeviceManager({navigation}) {
  const refLoading = useRef();
  const refNotification = useRef();
  const [data, setData] = useState([]);
  const { t } = useTranslation();

  useLayoutEffect(()=>{
    getData();
    return () => {
      page = 0;
    }
  },[])

  const getData = () =>{
    const date = new Date();
    date.setHours(0,0,0,0);
    getNotification({
      deviceId: DataLocal.deviceId,
      startDate: encodeURIComponent( new Date(date - 86400000 * 29 ).toISOString()),
      page: page,
      size: sizePage,
      sort: encodeURIComponent('createdAt:DESC')
    },{
      success: res =>{
        const resData = res.data;
        for (const key in resData) {
          if (resData[key].type === 'OUT_OF_SAFE_ZONE'){
            resData[key].icon = Images.icOutZone;
            resData[key].content = resData[key].deviceName+ t('common:txtOutSafeZone');
          }
          if (resData[key].type === 'IN_SAFE_ZONE'){
            resData[key].icon = Images.icInZone;
            resData[key].content = resData[key].deviceName+ t('common:txtInSafeZone');
          }
          if (resData[key].type === 'SOS'){
            resData[key].icon = Images.icSOS;
            resData[key].content = resData[key].deviceName+ t('common:txtSOS');
          }
          if (resData[key].type === 'FULL_BATTERY'){
            resData[key].icon = Images.icFullBattery;
            resData[key].content = resData[key].deviceName+ t('common:txtFullBattery');
          }
          if (resData[key].type === 'LOW_BATTERY'){
            resData[key].icon = Images.icLowBattery;
            resData[key].content = resData[key].deviceName+ t('common:txtLowBattery');
          }
        }
        const newData = Object.assign([], data)
        setData(newData.concat(resData));
      },
      refLoading,
      refNotification,
    })
  }


  const renderItem = (item) => {
    if (DataLocal.deviceId === item.item.deviceId){
      return(
        <View style={styles.itemFlatList}>
          <Image
            source={item.item.icon}
            style={styles.iconItem} resizeMode={'stretch'}/>
          <Text numberOfLines={5} style={styles.contentItem}>{item.item.content}</Text>
          <Text style={styles.itemTime}>{Moment(item.item.createdAt).format('HH:mm:ss DD-MM-yyyy')}</Text>
        </View>
      )
    }
  }

  const handleLoadMore = () => {
    page++;
    getData();
  };

  const gotoHomeScreen = () => {
    if (DataLocal.haveSim === '0') {
      DataLocal.saveHaveSim('1').then(r =>
        navigation.navigate(Consts.ScreenIds.Tabs)
      );
    }
  }

  return (
    <View style={styles.contain}>
      <Header title={t('common:header_warning')}
      />
      <FlatList data={data}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                onEndReached={() =>{handleLoadMore()}}
      />
      <LoadingIndicator ref={refLoading}/>
      <NotificationModal ref={refNotification} goBack={gotoHomeScreen}/>
    </View>
  );
}
