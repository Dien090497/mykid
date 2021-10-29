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
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import {convertDateTimeToString, showAlert} from '../../../functions/utils';
import { getJourneyApi, getLocationDeviceApi } from '../../../network/DeviceService';

import {Colors} from '../../../assets/colors/Colors';
import DataLocal from '../../../data/dataLocal';
import DatePicker from 'react-native-date-picker';
import Header from '../../../components/Header';
import Images from '../../../assets/Images';
import LoadingIndicator from '../../../components/LoadingIndicator';
import styles from './styles';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import TimePickerModal from '../../../components/TimePickerModal';
import { useTranslation } from 'react-i18next';

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

export default ({}) => {
  const refMap = useRef(null);
  const refTime = useRef();
  const [listSafeArea, setListSafeArea] = useState([]);
  const [date, setDate] = useState(new Date());
  const [fromDate, setFromDate] = useState(fromDateDefault());
  const [toDate, setToDate] = useState(toDateDefault());
  const [deviceInfo, setDeviceInfo] = useState({location: {lat: 26.013197, lng: 105.78073}});
  const refLoading = useRef();
  const { t } = useTranslation();
  const [openDatePicker, setOpenDatePicker] = useState(false)

  const toggleModalDate = useCallback(() => {
    setOpenDatePicker(prev => !prev);
  }, []);

  const headerScreen = () => {
    let title = t('common:journey').toLocaleLowerCase();
    return title.charAt(0).toUpperCase() + title.slice(1);
  };

  const toggleJourney = () => {
    if (fromDate.getHours() > toDate.getHours()){
      showAlert(t('common:timeInvalidNote'));
      return
    }else if (fromDate.getHours() > toDate.getHours() && fromDate.getMinutes() > toDate.getMinutes()){
      showAlert(t('common:timeInvalidNote'));
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
            showAlert(`${deviceInfo.deviceName} - ${t('common:history_empty')}`);
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
      },
    );
  };

  useEffect(() => {
    getLocationDeviceApi(DataLocal.deviceId, {
      success: res => {
        setDeviceInfo(res.data);
        const {lat, lng} = res.data?.location;
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
    });
  }, []);

  const datePicker = () => {
    return(
      <DatePicker
        mode={'date'}
        modal
        open={openDatePicker}
        date={date}
        onConfirm={(time) => {
          setOpenDatePicker(false)
          setDate(time);
        }}
        onCancel={() => {
          setOpenDatePicker(false)
        }}
        title={'Chọn ngày'}
        cancelText={t('common:cancel')}
        confirmText={t('common:confirm')}
      />
    );
  }

  const renderFilter = () => {
    return (
      <View style={styles.wrapperFilter}>
        <View style={styles.containerFilter}>
          <Image source={Images.icCalendar} style={styles.icCalendar} />
          <TouchableOpacity
            style={styles.containerTime}
            onPress={()=>{
              toggleModalDate();
            }}>
            <Text
              children={convertDateTimeToString(date).date}
              style={styles.txtTime}
            />
          </TouchableOpacity>
          <View style={styles.containerHour}>
            <Text style={{fontFamily:'Roboto-Medium', marginRight:10}} children={t('common:from')} />
            <TouchableOpacity
              onPress={()=>{
                refTime.current.openModal(
                  fromDate,
                  (date)=>{
                    console.log(date)
                    setFromDate(date);
                  })
              }}
              style={[styles.containerTime]}>
              <Text
                style={styles.txtTime}
                children={(fromDate.getHours()<10? '0'+fromDate.getHours() : fromDate.getHours())+':'+(fromDate.getMinutes()<10 ? '0'+fromDate.getMinutes() : fromDate.getMinutes())}
                marginTop={5}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.containerHour}>
            <Text style={{fontFamily:'Roboto-Medium', marginRight:10}} children={t('common:to')} />
            <TouchableOpacity
              onPress={()=>{
                refTime.current.openModal(
                  toDate,
                  (date)=>{
                    console.log(date)
                    setToDate(date);
                  })
              }}
              style={[styles.containerTime]}>
              <Text
                style={styles.txtTime}
                children={(toDate.getHours() < 10 ? '0'+toDate.getHours() : toDate.getHours())+':'+(toDate.getMinutes()<10 ? '0'+toDate.getMinutes() : toDate.getMinutes())}
                marginTop={5}
              />
            </TouchableOpacity>
          </View>
        </View>
        <TouchableOpacity style={[styles.containerTime,{backgroundColor: Colors.colorMain,marginVertical: 10}]} onPress={toggleJourney}>
          <Text children={t('common:journey')} style={styles.txtBtn} />
        </TouchableOpacity>
      </View>
    );
  };

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
          // provider={PROVIDER_GOOGLE}
          showsUserLocation={true}
          >
          <Marker
            coordinate={{
              latitude: deviceInfo.location.lat,
              longitude: deviceInfo.location.lng,
            }}>
            <Image source={Images.icWatchMarker} style={{ width: 30, height: 30, resizeMode: 'contain' }} />
          </Marker>
          {listSafeArea.map(val => (
            <View key={val.id}>
              <Marker
                coordinate={{
                  latitude: val.location.lat,
                  longitude: val.location.lng,
                }}>
                <Image
                  source={Images.icMarkerDefault}
                  style={styles.icMarker}
                />
              </Marker>
            </View>
          ))}
        </MapView>
      </View>
      {datePicker()}
      <TimePickerModal ref={refTime}/>
      <LoadingIndicator ref={refLoading} />
    </KeyboardAvoidingView>
  );
};
