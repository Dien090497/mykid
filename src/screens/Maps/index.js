import Consts, {FontSize} from '../../functions/Consts';
import {
  Image,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import React, {useEffect, useRef, useState} from 'react';
import { getLocationDeviceApi, } from '../../network/DeviceService';
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
import * as Progress from 'react-native-progress';
import Geolocation from 'react-native-geolocation-service';

export default ({navigation, route}) => {
  const refMap = useRef(null);
  const refLoading = useRef(null);
  const refNotification = useRef(null);
  const [locationDevice, setLocationDevice] = useState([]);
  const [locationName, setLocationName] = useState('');
  const [indexSelect, setIndexSelect] = useState(DataLocal.deviceIndex);
  const [isCount, setIsCount] = useState(false);
  const [timeCount, setTimeCount] = useState(60);
  const [mapType, setMapType] = useState(true);
  const { t } = useTranslation();
  const infoDevice = route.params.listDevices;
  let timer = 0;

  const getLocationDevice = async () => {
    try {
      const listID = [];
      infoDevice.map((obj)=>{
        listID.push(obj.deviceId);
      })
      getLocationDeviceApi(listID, {
        success: res => {
          DataLocal.deviceIndex + 1 > res.data.length ? setIndexSelect(0) : null;
          infoDevice.map((obj)=>{
            for (const objElement of res.data) {
              if (objElement.deviceId === obj.deviceId){
                objElement.avatar = obj.avatar;
                objElement.deviceName = obj.deviceName;
              }
            }
          })
          setLocationDevice(res.data);
          const {lat, lng} = res.data[indexSelect]? res.data[indexSelect].location : res.data[0].location;
          if (lat && lng) {
            refMap.current.animateCamera({
              center: {
                latitude: lat,
                longitude: lng,
              },
              zoom: 15,
            });
          }
          timer = getTime() + 60;
          setIsCount(true);
          refreshCountdown();
        },
        refLoading: refLoading,
        refNotification: refNotification,
      });
    } catch (error) {}
  };

  useEffect(() => {
    !isCount ? initCameraMap() : null;
    if (DataLocal.deviceId) getLocationDevice();
    else {
      refNotification.current.open(t('errorMsg:updateDeviceDefault',()=>{
        navigation.replace(Consts.ScreenIds.DeviceManager);
      }))
    }
    return ()=>{
      setIsCount(false);
    }
  }, []);

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

  const getTime = () => {
    return Math.floor(Date.now() / 1000);
  };

  const refreshCountdown = () => {
    setTimeout(() => {
      if (timer - getTime() <= 0) {
        setIsCount(false)
      } else {
        setTimeCount(timer - getTime())
        refreshCountdown();
      }
    }, 200)
  };

  const initCameraMap = () =>{
    Geolocation.getCurrentPosition(
      (position) => {
        refMap.current.animateCamera({
          center: {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude   ,
          },
          zoom: 15,
        });
      },
      (error) => {
        console.log('GeolocationERROR',error);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );
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
          mapType={mapType ? 'standard' : 'hybrid'}>
          {locationDevice.length > 0 && (
            locationDevice.map((obj,i)=>{
              return(
                <Marker
                  key={i}
                  onPress={()=>{
                    setIndexSelect(i);
                  }}
                  coordinate={{
                    latitude: obj?.location?.lat,
                    longitude: obj?.location?.lng,
                  }}
                  title={obj.deviceName}>
                  <View style={{alignItems: 'center'}}>
                    <Image source={{uri: obj.avatar}} style={[styles.avatar]} resizeMode={'cover'}/>
                    <View style={{height:5}}/>
                    <Image source={Images.icMarkerDefault} style={[styles.icMarker,{tintColor: Colors.colorMain}]}/>
                  </View>
                </Marker>
              )
            })
          )}
        </MapView>

        {locationDevice.length > 0 && locationDevice[indexSelect] && (
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
              <Text style={styles.txtNameDevice}>{locationDevice[indexSelect].deviceName}</Text>
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
          activeOpacity={1}
          style={styles.containerGetLocation}
          onPress={()=>{
            if (isCount) return;
            getLocationDevice();
          }}>
          {isCount ?
            <View>
              <Progress.Circle
                size={40}
                indeterminate={false}
                color={Colors.colorMain}
                showsText={true}
                progress={timeCount/60}
                borderWidth={0}
                formatText={() => {
                  return timeCount.toString();
                }}
                textStyle={{fontSize: FontSize.xxtraSmall, fontFamily: 'Roboto-Medium'}}
              />
            </View> : <Image source={Images.icWatchMarker} style={styles.icMarker} />}
        </TouchableOpacity>
          <TouchableOpacity
            style={[styles.containerGetLocation,{ left: 10}]}
            activeOpacity={1}
            onPress={()=>{
                setMapType(!mapType)
            }}>
            <Image source={Images.icMapType} style={styles.icMarker} />
          </TouchableOpacity>
      </View>
      <LoadingIndicator ref={refLoading} />
      <NotificationModal ref={refNotification } goBack={gotoHomeScreen}/>
    </View>
  );
};
