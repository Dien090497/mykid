import {
  Alert,
  Animated,
  Image,
  KeyboardAvoidingView,
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Consts, {FontSize} from '../../../functions/Consts';
import {Divider, Icon, Slider, Switch} from 'react-native-elements';
import MapView, {Circle, Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import React, {
  memo,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import {convertDateTimeToString, showAlert} from '../../../functions/utils';
import {getJourneyApi, getListDeviceApi} from '../../../network/DeviceService';

import Button from '../../../components/buttonGradient';
import {Colors} from '../../../assets/colors/Colors';
import DataLocal from '../../../data/dataLocal';
import DatePicker from 'react-native-date-picker';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import Header from '../../../components/Header';
import Images from '../../../assets/Images';
import LoadingIndicator from '../../../components/LoadingIndicator';
import {String} from '../../../assets/strings/String';
import styles from './styles';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Moment from 'moment';

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
  const [listSafeArea, setListSafeArea] = useState([]);
  const [date, setDate] = useState(new Date());
  const [dateModal, setDateModal] = useState(new Date());
  const [fromDate, setFromDate] = useState(fromDateDefault());
  const [toDate, setToDate] = useState(toDateDefault());
  const [deviceInfo, setDeviceInfo] = useState(null);
  const refLoading = useRef();

  const [openDatePicker, setOpenDatePicker] = useState(false)
  const [typeModal, setTypeModal] = useState(0)

  const toggleModalDate = useCallback(() => {
    setOpenDatePicker(prev => !prev);
  }, []);
  // console.log('FROM',fromDate);
  // console.log('TO',toDate);
  const toggleJourney = () => {
    const fromDatePayload = date,
      toDatePayload = date;
    fromDatePayload.setHours(fromDate.getHours(), fromDate.getMinutes());
    toDatePayload.setHours(toDate.getHours(), toDate.getMinutes());
    getJourneyApi(
      DataLocal.deviceId,
      Moment(fromDatePayload).format('yyyy-MM-DDTHH:mm:00.000Z'),
      Moment(toDatePayload).format('yyyy-MM-DDTHH:mm:00.000Z'),
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
    const getDeviceInfo = () => {
      getListDeviceApi(null, 0, 100, DataLocal.deviceId, '',  {
        success: res => {
          const device = res.data.find(
            val => val.deviceId === DataLocal.deviceId,
          );
          setDeviceInfo(device);
        },
        refLoading: refLoading,
      });
    };
    getDeviceInfo();
  }, []);

  const datePicker = () => {
    return(
      typeModal === 0 ? <DatePicker
        mode={typeModal === 0 ? 'date': 'time'}
        modal
        open={openDatePicker}
        date={typeModal === 0 ? date : typeModal === 1 ? fromDate : toDate}
        onConfirm={(time) => {
          setDate(time)
          setOpenDatePicker(false)
        }}
        onCancel={() => {
          setOpenDatePicker(false)
        }}
        title={'Chọn ngày'}
        cancelText={String.cancel}
        confirmText={String.confirm}
      /> :
        typeModal === 1 ? <DatePicker
          mode={typeModal === 0 ? 'date': 'time'}
          modal
          open={openDatePicker}
          date={typeModal === 0 ? date : typeModal === 1 ? fromDate : toDate}
          onConfirm={(time) => {
            setDateModal(time)
            setOpenDatePicker(false)
          }}
          onCancel={() => {
            setOpenDatePicker(false)
          }}
          title={'Chọn ngày'}
          cancelText={String.cancel}
          confirmText={String.confirm}
        /> :
          <DatePicker
            mode={typeModal === 0 ? 'date': 'time'}
            modal
            open={openDatePicker}
            date={typeModal === 0 ? date : typeModal === 1 ? fromDate : toDate}
            onConfirm={(time) => {
              setDateModal(time)
              setOpenDatePicker(false)
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

  const setTime = (time,type) =>{
    console.log(type);
    // if (typeModal ===0) setDate(date)
    if (typeModal ===0) console.log(typeModal);
    if (typeModal === 1){
      console.log(typeModal);
      // const from = date;
      // from.setHours(date.getHours())
      // from.setMinutes(date.getMinutes())
      // setFromDate(from)
    }
    if (typeModal === 2){
      // const to = date;
      // to.setHours(date.getHours())
      // to.setMinutes(date.getMinutes())
      // setToDate(to)
    }
  }

  const renderFilter = () => {
    return (
      <View style={styles.wrapperFilter}>
        <View style={styles.containerFilter}>
          <Image source={Images.icCalendar} style={styles.icCalendar} />
          <TouchableOpacity
            style={styles.containerTime}
            onPress={()=>{
              setTypeModal(0);
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
                setTypeModal(1);
                toggleModalDate();
              }}
              style={[styles.containerTime]}>
              <Text
                style={styles.txtTime}
                  children={fromDate.getHours()+':'+(fromDate.getMinutes()<10 ? '0'+fromDate.getMinutes() : fromDate.getMinutes())}
                marginTop={5}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.containerHour}>
            <Text style={{fontFamily:'Roboto-Medium', marginRight:10}} children={'Đến'} />
            <TouchableOpacity
              onPress={()=>{
                setTypeModal(2);
                toggleModalDate();
              }}
              style={[styles.containerTime]}>
              <Text
                style={styles.txtTime}
                children={toDate.getHours()+':'+(toDate.getMinutes()<10 ? '0'+toDate.getMinutes() : toDate.getMinutes())}
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
          {listSafeArea.map(val => (
            <View key={val.id}>
              <Marker
                coordinate={{
                  latitude: val.location.lat,
                  longitude: val.location.lng,
                }}>
                <View
                  style={{
                    backgroundColor: 'white',
                    paddingHorizontal: 4,
                    paddingVertical: 2,
                    borderRadius: 6,
                  }}>
                  <Text children={deviceInfo?.deviceName} />
                </View>

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
      <LoadingIndicator ref={refLoading} />
    </KeyboardAvoidingView>
  );
};
