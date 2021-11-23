import Consts, {FontSize} from '../../functions/Consts';
import {
  Image,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import React, {useEffect, useRef, useState} from 'react';
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
import Geocoder from 'react-native-geocoder';
import Moment from 'moment';

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
  const [locationDevice, setLocationDevice] = useState([]);
  const [infoDevice, setInfoDevice] = useState([]);
  const [listDeviceID, setListDeviceID] = useState([]);
  const [locationName, setLocationName] = useState('');
  const [indexSelect, setIndexSelect] = useState(DataLocal.deviceIndex);
  const { t } = useTranslation();

  const getLocationDevice = async () => {
    try {
      if (!infoDevice.length > 0) {
        getListDeviceApi(DataLocal.userInfo.id, 0, 100, '', 'ACTIVE', {
          success: res => {
            const listID = [];
            res.data.map((obj,i) =>{
              listID.push(obj.deviceId);
            })
            setListDeviceID(listID);
            setInfoDevice(res.data);
          },
          // refLoading: refLoading,
          refNotification: refNotification,
        });
      }
      getLocationDeviceApi(DataLocal.deviceId, {
        success: res => {
          const dataaaaa = {
            accuracy: 21,
            location: {
              lat: 21.030653,
              lng: 105.84713
            },
            power: 30,
            reportedAt: '2021-10-18T06:50:50Z',
            type: 'GPS'
          }
          const listLocation =[];
          listLocation.push(dataaaaa);
          listLocation.push(res.data);
          setLocationDevice(listLocation);
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
    if (locationDevice.length < 1) return initialRegion;
    return {
      ...initialRegion,
      latitude: locationDevice[indexSelect]?.location?.lat,
      longitude: locationDevice[indexSelect]?.location?.lng,
    };
  };

  Geocoder.geocodePosition({
    lat: locationDevice[indexSelect]?.location?.lat,
    lng: locationDevice[indexSelect]?.location?.lng
  }).then(res => {
    const address = [res[0].streetNumber +' '+ res[0].streetName, res[0].subAdminArea, res[0].adminArea].join(', ')
    setLocationName(address);
  }).catch(err => console.log(err))

  const gotoHomeScreen = () => {
    if (DataLocal.haveSim === '0') {
      DataLocal.saveHaveSim('1').then(r =>
        navigation.navigate(Consts.ScreenIds.Tabs)
      );
    }
  }

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
          mapType={'satellite'}
          region={getRegion()}>
          {locationDevice.length > 0 && infoDevice.length > 0 && (
            locationDevice.map((obj,i)=>{
              return(
                <Marker
                  onPress={()=>{
                    setIndexSelect(i);
                  }}
                  coordinate={{
                    latitude: obj?.location?.lat,
                    longitude: obj?.location?.lng,
                  }}
                  title={infoDevice[i].deviceName}>
                  <Image source={Images.icMarkerDefault} style={[styles.icMarker,{tintColor: Colors.colorMain}]}/>
                </Marker>
              )
            })
          )}
        </MapView>

        {locationDevice.length > 0 && infoDevice.length > 0 && (
          <TouchableOpacity
            onPress={() => {
              const {lat, lng} = locationDevice[indexSelect]?.location;
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
            <View style={styles.containerLastTime}>
              <Text style={styles.txtNameDevice}>{infoDevice[indexSelect].deviceName}</Text>
              <Text style={styles.txtTime}>
                {Moment(new Date(locationDevice[indexSelect].reportedAt)).format('HH:mm DD/MM/yyyy')}
              </Text>
            </View>
            <View style={styles.containerLastTime}>
              <Text style={styles.txtLocation}>{t('common:location')}{locationName}</Text>
              <Text style={[styles.txtTime,{flex: 1 ,fontSize: FontSize.xxtraSmall*0.8, textAlign: 'right'}]}>{locationDevice[indexSelect].type + ' ('+ t('common:discrepancy') + (locationDevice[indexSelect].type === 'GPS' ? '50m)' : locationDevice[indexSelect].type === 'WIFI' ? '100m)' : '1000m)')}</Text>
            </View>

            <View style={styles.containerLastTime}>
              <Text style={[styles.txtLocation,{width: '80%'}]}>{t('common:coordinates')}{`${locationDevice[indexSelect]?.location?.lat}, ${locationDevice[indexSelect]?.location?.lng}`}</Text>
              <View style={styles.containerBattery}>
                <Text style={{fontSize: FontSize.xxtraSmall, color: Colors.gray}}>
                  {`${locationDevice[indexSelect].power || 0}%`}
                </Text>
                <Image source={(locationDevice[indexSelect].power || 0) > 20 ? Images.icBattery : Images.icLowBattery} style={(locationDevice[indexSelect].power || 0) > 20 ? styles.icBattery : styles.icLowBattery} />
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
      <NotificationModal ref={refNotification } goBack={gotoHomeScreen}/>
    </View>
  );
};
