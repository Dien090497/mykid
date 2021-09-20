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
  const [visibleDate, setVisibleDate] = useState(false);
  const [fromDate, setFromDate] = useState(fromDateDefault());
  const [toDate, setToDate] = useState(toDateDefault());
  const [deviceInfo, setDeviceInfo] = useState(null);
  const refLoading = useRef();

  const toggleModalDate = useCallback(() => {
    setVisibleDate(prev => !prev);
  }, []);

  const toggleJourney = () => {
    const fromDatePayload = date,
      toDatePayload = date;
    fromDatePayload.setHours(fromDate.getHours(), fromDate.getMinutes());
    toDatePayload.setHours(fromDate.getHours(), fromDate.getMinutes());
    getJourneyApi(
      DataLocal.deviceId,
      fromDatePayload.toISOString(),
      toDatePayload.toISOString(),
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

  const minValue = () => {
    var date = new Date();
    date.setHours(0, 0);
    return date;
  };

  const renderFilter = () => {
    return (
      <View style={styles.wrapperFilter}>
        <View style={styles.containerFilter}>
          <Image source={Images.icCalendar} style={styles.icCalendar} />
          <TouchableOpacity
            style={styles.containerTime}
            onPress={toggleModalDate}>
            <Text
              children={convertDateTimeToString(date).date}
              style={styles.txtTime}
            />
          </TouchableOpacity>
          <FromToDate
            onClearDate={() => setFromDate('')}
            onDate={date => setFromDate(date)}
            title={String.from}
            key={String.from}
            value={fromDate}
            minValue={minValue()}
            maxValue={toDate}
            containerStyle={{marginRight: 3}}
          />
          <FromToDate
            onClearDate={() => setToDate('')}
            onDate={date => setToDate(date)}
            title={String.to}
            key={String.to}
            value={toDate}
            minValue={fromDate}
            containerStyle={{marginLeft: 5}}
          />
        </View>
        <TouchableOpacity style={styles.containerTime} onPress={toggleJourney}>
          <Text children={String.home_journey} style={styles.txtTime} />
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
      {/* <DatePicker
        modal
        open={visibleDate}
        date={date}
        mode="date"
        onConfirm={date => {
          setDate(date);
          setVisibleDate(false);
        }}
        onCancel={toggleModalDate}
        maximumDate={new Date()}
        confirmText={String.confirm}
        cancelText={String.cancel}
        locale="vi"
      /> */}
      <DateTimePickerModal
        isVisible={visibleDate}
        mode="date"
        onConfirm={date => {
          setDate(date);
          setVisibleDate(false);
        }}
        onCancel={toggleModalDate}
        confirmTextIOS={String.confirm}
        cancelTextIOS={String.cancel}
        locale="vi"
      />
      <LoadingIndicator ref={refLoading} />
    </KeyboardAvoidingView>
  );
};

const FromToDate = ({
  title,
  value,
  containerStyle,
  onClearDate,
  minValue,
  maxValue,
  onDate,
}) => {
  const [visible, setVisible] = useState(false);
  const toggleModal = () => {
    // console.log('toggleModal', title, visible);
    setVisible(prev => !prev);
  };
  const formatDateToString = useMemo(() => {
    if (!value) return convertDateTimeToString(new Date()).time;
    return convertDateTimeToString(value).time;
  }, [value, title]);

  const getMiniumDate = () => {
    return minValue ? minValue : new Date();
  };
  const getMaxDate = () => {
    return maxValue ? maxValue : new Date();
  };

  return (
    <View key={title}>
      <View style={[containerStyle, styles.containerHour]}>
        <Text children={title} />
        <TouchableOpacity
          onPress={toggleModal}
          style={[styles.containerTime, {marginLeft: 3}]}>
          <Text
            style={styles.txtTime}
            children={formatDateToString}
            marginTop={5}
          />
        </TouchableOpacity>
      </View>
      <DateTimePickerModal
        isVisible={visible}
        mode="time"
        onConfirm={date => {
          var maxDate = getMaxDate(),
            minDate = getMiniumDate();

          if (
            (maxValue &&
              minValue &&
              new Date(date) >= minDate &&
              new Date(date) <= maxDate) ||
            (minValue && new Date(date) >= minValue && !maxValue)
          ) {
            toggleModal();
            onDate(date);
          } else {
            showAlert(String.time_invalid);
          }
        }}
        date={value ? new Date(value) : new Date()}
        minimumDate={getMiniumDate()}
        maximumDate={getMaxDate()}
        onCancel={toggleModal}
        confirmTextIOS={String.confirm}
        cancelTextIOS={String.cancel}
        locale="vi"
        is24Hour={true}
      />
      {/* <DatePicker
        title={title}
        modal
        mode="time"
        is24hourSource="locale"
        open={visible}
        date={value ? new Date(value) : new Date()}
        onConfirm={date => {
          toggleModal();
          onDate(date);
        }}
        minimumDate={getMiniumDate()}
        onCancel={toggleModal}
        confirmText={String.confirm}
        cancelText={String.cancel}
        locale="vi"
        timeZoneOffsetInMinutes={420}
        minuteInterval={30}
      /> */}
    </View>
  );
};
