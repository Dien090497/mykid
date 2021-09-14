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
import {Divider, Icon, Slider, Switch} from 'react-native-elements';
import MapView, {Circle, Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import React, {memo, useCallback, useMemo, useRef, useState} from 'react';
import {convertDateTimeToString, showAlert} from '../../../functions/utils';

import Button from '../../../components/buttonGradient';
import {Colors} from '../../../assets/colors/Colors';
import DatePicker from 'react-native-date-picker';
import {FontSize} from '../../../functions/Consts';
import Header from '../../../components/Header';
import Images from '../../../assets/Images';
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

export default ({}) => {
  const refMap = useRef(null);
  const [listSafeArea, setListSafeArea] = useState(mockData);
  const [date, setDate] = useState(new Date());
  const [visibleDate, setVisibleDate] = useState(false);
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');

  const toggleModal = () => setVisibleDate(prev => !prev);

  const renderFilter = () => {
    return (
      <View style={styles.containerFilter}>
        <Image source={Images.icCalendar} style={styles.icCalendar} />
        <TouchableOpacity style={styles.containerTime} onPress={toggleModal}>
          <Text
            children={convertDateTimeToString(date).date}
            style={styles.txtTime}
          />
        </TouchableOpacity>
        <FromToDate
          onClearDate={() => setFromDate('')}
          onDate={date => setFromDate(date)}
          title={String.from}
          value={fromDate}
          containerStyle={{marginRight: 3}}
        />
        <FromToDate
          onClearDate={() => setToDate('')}
          onDate={date => setToDate(date)}
          title={String.to}
          value={toDate}
          minValue={fromDate}
          containerStyle={{marginLeft: 5}}
        />
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
          provider={PROVIDER_GOOGLE}
          showsUserLocation={true}
          region={initialRegion}>
          {listSafeArea
            .filter(val => val.status === 'on')
            .map(val => (
              <View key={val.id}>
                <Marker coordinate={val} title={val.name}>
                  <Image
                    source={Images.icWatchMarker}
                    style={styles.icMarker}
                  />
                </Marker>
                <Circle
                  fillColor={'rgba(160, 214, 253, 0.5)'}
                  center={val}
                  radius={(1000 * val.radius) / 1000}
                  strokeColor="#4F6D7A"
                  strokeWidth={0.1}
                />
              </View>
            ))}
        </MapView>
      </View>
      <DatePicker
        modal
        open={visibleDate}
        date={date}
        mode="date"
        onConfirm={date => {
          toggleModal();
          setDate(date);
        }}
        onCancel={() => {
          toggleModal();
        }}
        confirmText={String.confirm}
        cancelText={String.cancel}
        locale="vi"
      />
    </KeyboardAvoidingView>
  );
};

const FromToDate = ({
  title,
  value,
  containerStyle,
  onClearDate,
  minValue,
  onDate,
}) => {
  const [visible, setVisible] = useState(false);
  const toggleModal = useCallback(() => {
    setVisible(prev => !prev);
  }, []);
  const formatDateToString = useMemo(() => {
    if (!value) return convertDateTimeToString(new Date()).time;
    return convertDateTimeToString(value).time;
  }, [value, title]);
  return (
    <>
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
      <DatePicker
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
        minimumDate={minValue && new Date(minValue)}
        onCancel={toggleModal}
        confirmText={String.confirm}
        cancelText={String.cancel}
        locale="vi"
        timeZoneOffsetInMinutes={420}
        minuteInterval={30}
      />
    </>
  );
};
