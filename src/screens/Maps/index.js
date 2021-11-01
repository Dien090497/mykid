import Consts, {FontSize} from '../../functions/Consts';
import {
  Image,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import React, {useEffect, useRef, useState} from 'react';
import {convertDateTimeToString} from '../../functions/utils.js';
import {
  getListDeviceApi,
  getLocationDeviceApi,
} from '../../network/DeviceService';
import NotificationModal from '../../components/NotificationModal';
import {Colors} from '../../assets/colors/Colors';
import DataLocal from '../../data/dataLocal';
import Header from '../../components/Header';
import Images from '../../assets/Images';
import LoadingIndicator from '../../components/LoadingIndicator';
import {styles} from './styles';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';

const markerDaughter = {
  latitude: 21.0076485,
  longitude: 105.8236356,
  title: 'Con gái',
  battery: 80,
  lastUpdated: '10-09-2021 21:30:18',
};

const initialRegion = {
  latitude: 21.030653,
  longitude: 105.84713,
  latitudeDelta: 0.0922,
  longitudeDelta: 0.0421,
};

export default ({navigation, route}) => {
  const refMap = useRef(null);
  const refLoading = useRef(null);
  const refNotification = useRef(null);
  const [locationDevice, setLocationDevice] = useState(null);
  const [infoDevice, setInfoDevice] = useState(null);
  const { t } = useTranslation();

  const getLocationDevice = async () => {
    try {
      if (!infoDevice) {
        getListDeviceApi(null, 0, 100, DataLocal.deviceId, '', {
          success: res => {
            const device = res.data.find(
              val => val.deviceId === DataLocal.deviceId,
            );
            setInfoDevice(device);
          },
          // refLoading: refLoading,
          refNotification: refNotification,
        });
      }
      getLocationDeviceApi(DataLocal.deviceId, {
        success: res => {
          setLocationDevice(res.data);
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
        refNotification: refNotification,
      });
    } catch (error) {}
  };

  useEffect(() => {
    if (DataLocal.deviceId) getLocationDevice();
    else {
      refNotification.current.open(t('errorMsg:updateDeviceDefault',()=>{
        navigation.replace(Consts.ScreenIds.DeviceManager);
      }))
    }
  }, []);

  const getRegion = () => {
    if (!locationDevice) return initialRegion;
    return {
      ...initialRegion,
      latitude: locationDevice?.location?.lat,
      longitude: locationDevice?.location?.lng,
    };
  };

  return (
    <View
      style={[styles.container, {paddingBottom: useSafeAreaInsets().bottom}]}>
      <Header title={t('common:header_maps')} back />
      <View style={styles.container}>
        <MapView
          ref={refMap}
          style={styles.container}
          provider={PROVIDER_GOOGLE}
          showsUserLocation={true}
          region={getRegion()}>
          {locationDevice && infoDevice && (
            <Marker
              coordinate={{
                latitude: locationDevice?.location?.lat,
                longitude: locationDevice?.location?.lng,
              }}
              title={infoDevice.deviceName}>
              <Image source={Images.icWatchMarker} style={styles.icMarker} />
            </Marker>
          )}
        </MapView>

        {locationDevice && infoDevice && (
          <TouchableOpacity
            onPress={() => {
              const {lat, lng} = locationDevice?.location;
              if (lat && lng)
                refMap.current.animateCamera({
                  center: {
                    latitude: lat,
                    longitude: lng,
                  },
                  zoom: 15,
                });
            }}
            style={styles.containerDevice}>
            <View style={styles.container}>
              <Text
                style={styles.txtNameDevice}
                children={infoDevice.deviceName}
              />

              <Text
                style={styles.txtLocation}
                children={`Toạ độ: ${locationDevice?.location?.lat}, ${locationDevice?.location?.lng}`} />
            </View>

            <View style={styles.containerLastTime}>
              <Text
                style={styles.txtTime}
                children={
                  convertDateTimeToString(locationDevice.reportedAt).dateTimeStr
                }
              />

              <View style={styles.containerBattery}>
                <Text
                  style={{fontSize: FontSize.small, color: Colors.gray}}
                  children={`${locationDevice.power || 0}%`}
                />
                <Image source={Images.icBattery} style={styles.icBattery} />
              </View>
            </View>
          </TouchableOpacity>
        )}

        <TouchableOpacity
          style={styles.containerGetLocation}
          onPress={getLocationDevice}>
          <Image source={Images.icWatchMarker} style={styles.icMarker} />
        </TouchableOpacity>
      </View>
      <LoadingIndicator ref={refLoading} />
      <NotificationModal ref={refNotification } />
    </View>
  );
};
