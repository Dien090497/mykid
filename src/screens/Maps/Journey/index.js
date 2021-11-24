import {
  Image,
  KeyboardAvoidingView,
  Platform,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import React, {
  useEffect,
  useRef,
  useState,
} from 'react';
import { getJourneyApi, getLocationDeviceApi } from '../../../network/DeviceService';

import {Colors} from '../../../assets/colors/Colors';
import DataLocal from '../../../data/dataLocal';
import Header from '../../../components/Header';
import Images from '../../../assets/Images';
import LoadingIndicator from '../../../components/LoadingIndicator';
import styles from './styles';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import TimePickerModal from '../../../components/TimePickerModal';
import { useTranslation } from 'react-i18next';
import NotificationModal from '../../../components/NotificationModal';
import DatePickerModal from "../../../components/DatePickerModal";
import Consts from "../../../functions/Consts";
import Moment from 'moment';

const roundMinutes = (date = new Date()) => {
  var minute = date.getMinutes();
  if (minute < 30) date.setMinutes(0);
  else if (minute > 30) date.setMinutes(30);
  return date;
};

const fromDateDefault = () => {
  var fromDate = new Date();
  fromDate.setHours(
    fromDate.getHours() > 1 ? fromDate.getHours() - 1 : fromDate.getHours(),
  );
  return roundMinutes(fromDate);
};
const toDateDefault = () => {
  return roundMinutes();
};

export default ({navigation}) => {
  const refMap = useRef(null);
  const refTime = useRef();
  const [listSafeArea, setListSafeArea] = useState([]);
  const [date, setDate] = useState(new Date());
  const [fromDate, setFromDate] = useState(fromDateDefault());
  const [toDate, setToDate] = useState(toDateDefault());
  const [deviceInfo, setDeviceInfo] = useState({location: {lat: 26.013197, lng: 105.78073}});
  const refLoading = useRef();
  const { t } = useTranslation();
  const refNotification = useRef();
  const refDatePicker = useRef();

  const headerScreen = () => {
    let title = t('common:journey').toLocaleLowerCase();
    return title.charAt(0).toUpperCase() + title.slice(1);
  };

  const toggleJourney = () => {
    if (fromDate.getHours() > toDate.getHours()){
      refNotification.current.open(t('common:timeInvalidNote'))
      return
    }else if (fromDate.getHours() > toDate.getHours() && fromDate.getMinutes() > toDate.getMinutes()){
      refNotification.current.open(t('common:timeInvalidNote'))
      return
    }
    fromDate.setMonth(date.getMonth(), date.getDate())
    fromDate.setSeconds(0,0)
    toDate.setMonth(date.getMonth(), date.getDate())
    toDate.setSeconds(0,0)
    getJourneyApi(
      DataLocal.deviceId,
      fromDate.toISOString(),
      toDate.toISOString(),
      1,
      100,
      {
        success: resData => {
          if (!resData.data.content.length) {
            refNotification.current.open(`${deviceInfo.deviceName} - ${t('common:history_empty')}`)
          } else {
            setListSafeArea(resData.data.content);
            const {lat, lng} = resData.data.content[0].location;
            refMap.current.animateCamera({
              center: {
                latitude: lat,
                longitude: lng,
              },
              zoom: 15,
            });
          }
        },
        refLoading: refLoading,
        refNotification: refNotification,
      },
    );
  };

  const setDateTime = (config) =>{
    const deadTime = new Date( new Date() -(86400000 * 90)).getTime();
    if (config.getTime() < deadTime) return refNotification.current.open(t('common:errorChooseDate'));
    setDate(config);
  }

  useEffect(() => {
    getLocationDeviceApi([DataLocal.deviceId], {
      success: res => {
        setDeviceInfo(res.data[0]);
        const {lat, lng} = res.data[0]?.location;
        if (lat && lng) {
          refMap.current.animateCamera({
            center: {
              latitude: lat,
              longitude: lng,
            },
            zoom: 15,
          });
        }
      },
      refLoading: refLoading,
      refNotification: refNotification,
    });
  }, []);

  const renderFilter = () => {
    return (
      <View style={styles.wrapperFilter}>
        <View style={styles.containerFilter}>
          <Image source={Images.icCalendar} style={styles.icCalendar} />
          <TouchableOpacity
            style={styles.containerTime}
            onPress={()=>{
              refDatePicker.current.openModal(date,(config)=>{setDateTime(config)})
            }}>
            <Text style={styles.txtTime}>
              {Moment(date).format('DD/MM/yyyy')}
            </Text>
          </TouchableOpacity>
          <View style={styles.containerHour}>
            <Text style={{fontFamily:'Roboto-Medium', marginRight:10}} children={t('common:from')} />
            <TouchableOpacity
              onPress={()=>{
                refTime.current.openModal(
                  fromDate,
                  (date)=>{
                    setFromDate(date);
                  })
              }}
              style={[styles.containerTime]}>
              <Text style={styles.txtTime}>
                {Moment(fromDate).format('HH:mm')}
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.containerHour}>
            <Text style={{fontFamily:'Roboto-Medium', marginRight:10}} children={t('common:to')} />
            <TouchableOpacity
              onPress={()=>{
                refTime.current.openModal(
                  toDate,
                  (date)=>{
                    setToDate(date);
                  })
              }}
              style={[styles.containerTime]}>
              <Text style={styles.txtTime}>
                {Moment(toDate).format('HH:mm')}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <TouchableOpacity style={[styles.containerTime,{backgroundColor: Colors.colorMain,marginVertical: 10}]} onPress={toggleJourney}>
          <Text children={t('common:journey')} style={styles.txtBtn} />
        </TouchableOpacity>
      </View>
    );
  };

  const gotoHomeScreen = () => {
    if (DataLocal.haveSim === '0') {
      DataLocal.saveHaveSim('1').then(r =>
        navigation.navigate(Consts.ScreenIds.Tabs)
      );
    }
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}>
      <View
        style={[styles.container, {paddingBottom: useSafeAreaInsets().bottom}]}>
        <Header title={headerScreen()} />
        {renderFilter()}

        <MapView
          ref={refMap}
          style={styles.container}
          >
          {deviceInfo &&<Marker
            coordinate={{
              latitude: deviceInfo.location.lat,
              longitude: deviceInfo.location.lng,
            }}>
            <Image source={Images.icWatchMarker} style={{ width: 30, height: 30, resizeMode: 'contain' }} />
          </Marker>}
          {listSafeArea.map((val,i) => (
            <View key={i}>
              <Marker
                coordinate={{
                  latitude: val.location.lat,
                  longitude: val.location.lng,
                }}>
                <View style={{alignItems: 'center'}}>
                  <Text>{i}</Text>
                  <Image
                    source={Images.icMarkerDefault}
                    style={[styles.icMarker,val.type === 'GPS' ? {tintColor: 'blue'}: val.type === 'WIFI' ? {tintColor: 'yellow'} : {tintColor: 'origin'}]}
                  />
                </View>
              </Marker>
            </View>
          ))}
        </MapView>
      </View>
      <TimePickerModal ref={refTime}/>
      <LoadingIndicator ref={refLoading} />
      <NotificationModal ref={refNotification} goBack={gotoHomeScreen}/>
      <DatePickerModal ref={refDatePicker} />
    </KeyboardAvoidingView>
  );
};
