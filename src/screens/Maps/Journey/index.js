import {
  Alert,
  Animated,
  Image,
  KeyboardAvoidingView,
  Platform,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import MapView, {Circle, Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import {convertDateTimeToString, showAlert} from '../../../functions/utils';
import { getJourneyApi, getListDeviceApi, getLocationDeviceApi } from "../../../network/DeviceService";

import {Colors} from '../../../assets/colors/Colors';
import DataLocal from '../../../data/dataLocal';
import DatePicker from 'react-native-date-picker';
import Header from '../../../components/Header';
import Images from '../../../assets/Images';
import LoadingIndicator from '../../../components/LoadingIndicator';
import {String} from '../../../assets/strings/String';
import styles from './styles';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import TimePickerModal from "../../../components/TimePickerModal";

const mockData = [
  {
    id: 1,
    name: 'Đi học',
    radius: 1000,
    status: 'on',
    latitude: 21.0070253,
    longitude: 105.843136,
  },
  {
    id: 2,
    name: 'Đi chơi',
    radius: 700,
    status: 'on',
    latitude: 21.0067305,
    longitude: 105.8181346,
  },
];

const initialRegion = {
  latitude: 21.030653,
  longitude: 105.84713,
  latitudeDelta: 0.0922,
  longitudeDelta: 0.0421,
};

const headerScreen = () => {
  let title = String.home_journey.toLocaleLowerCase();
  return title.charAt(0).toUpperCase() + title.slice(1);
};

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
  const [deviceInfo, setDeviceInfo] = useState(null);
  const refLoading = useRef();

  const [openDatePicker, setOpenDatePicker] = useState(false)

  const toggleModalDate = useCallback(() => {
    setOpenDatePicker(prev => !prev);
  }, []);

  const toggleJourney = () => {
    if (fromDate.getHours() > toDate.getHours()){
      showAlert(String.timeInvalidNote);
      return
    }else if (fromDate.getHours() > toDate.getHours() && fromDate.getMinutes() > toDate.getMinutes()){
      showAlert(String.timeInvalidNote);
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
          setListSafeArea(resData.data.content);
          if (!resData.data.content.length) {
            showAlert(`${deviceInfo.deviceName} - ${String.history_empty}`);
          } else {
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
    // const getDeviceInfo = () => {
    //   getListDeviceApi(null, 0, 100, DataLocal.deviceId, '',  {
    //     success: res => {
    //       const device = res.data.find(
    //         val => val.deviceId === DataLocal.deviceId,
    //       );
    //       setDeviceInfo(device);
    //     },
    //     refLoading: refLoading,
    //   });
    // };
    // getDeviceInfo();
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
        cancelText={String.cancel}
        confirmText={String.confirm}
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
            <Text style={{fontFamily:'Roboto-Medium', marginRight:10}} children={'Từ'} />
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
            <Text style={{fontFamily:'Roboto-Medium', marginRight:10}} children={'Đến'} />
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
          <Text children={String.journey} style={styles.txtBtn} />
        </TouchableOpacity>
      </View>
    );
  };
 console.log(deviceInfo)
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
          region={initialRegion}>
          <Marker
            coordinate={{
              latitude: 24,
              longitude: 105,
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
