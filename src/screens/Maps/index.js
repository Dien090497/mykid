import Consts, {FontSize} from '../../functions/Consts';
import {
  Image,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import React, {useEffect, useRef, useState} from 'react';
import { getLocationDeviceApi, startWebSocket } from '../../network/DeviceService';
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
import { wsCheckLocation } from '../../network/http/ApiUrl';
import { generateRandomId } from '../../functions/utils';
import * as encoding from 'text-encoding';

const encoder = new encoding.TextEncoder();
let ws = null;
let reconnect = false;

export default ({navigation, route}) => {
  const refMap = useRef(null);
  const refLoading = useRef(null);
  const refNotification = useRef(null);
  const [locationDevices, setLocationDevices] = useState([]);
  const [locationName, setLocationName] = useState('');
  const [indexSelect, setIndexSelect] = useState(DataLocal.deviceIndex);
  const [isCount, setIsCount] = useState(false);
  const [timeCount, setTimeCount] = useState(60);
  const [mapType, setMapType] = useState(true);
  const { t } = useTranslation();
  const infoDevice = route.params.listDevices;
  let timer = 0;

  const getLocationDevice = () => {
      const listID = [];
      infoDevice.map((obj)=>{
        listID.push(obj.deviceId);
      })
      for (const obj of infoDevice) {
        startWebSocket(obj.deviceId,{autoShowMsg:false})
      }
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
          setLocationDevices(res.data);
          if (res.data.length > 0) {
            const {lat, lng} = res.data[indexSelect] ? res.data[indexSelect].location : res.data[0].location;
            if (lat && lng) {
              refMap.current.animateCamera({
                center: {
                  latitude: lat,
                  longitude: lng,
                },
                zoom: 15,
              });
            }
          }
          timer = getTime() + 60;
          setIsCount(true);
          refreshCountdown();
        },
        refLoading: refLoading,
        refNotification: refNotification,
      });
  };

  useEffect(() => {
    !isCount ? initCameraMap() : null;
    if (DataLocal.deviceId) getLocationDevice();
    else {
      refNotification.current.open(t('errorMsg:updateDeviceDefault',()=>{
        navigation.replace(Consts.ScreenIds.DeviceManager);
      }))
    }
  }, []);

  useEffect(() => {
    if (!locationDevices.length > 0 || ws) return;
    handleWebSocketSetup();
    setReconnect(true)

    // return ()=>{
    //   setIsCount(false);
    //   disconnect();
    //   setReconnect(false)
    // }
  }, [locationDevices]);

  if (locationDevices && locationDevices[indexSelect] && locationDevices[indexSelect].location) {
    Geocoder.geocodePosition({
      lat: locationDevices[indexSelect].location.lat,
      lng: locationDevices[indexSelect].location.lng
    }).then(res => {
      const address = [res[0].streetNumber +' '+ res[0].streetName, res[0].subAdminArea, res[0].adminArea].join(', ')
      setLocationName(address);
    }).catch(err => console.log(err))
  }

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

  const handleWebSocketSetup = () => {

    ws = new WebSocket(wsCheckLocation);
    ws.onopen = () => {
      onOpen();
    };
    ws.onmessage = event => {
      onMessage(event);
    };
    ws.onerror = error => {
      onError(error);
    };
    ws.onclose = () =>
      onClose();
  };

  const setReconnect = (setReconnect) => {
    reconnect = !!setReconnect;
  }

  const disconnect = () => {
    reconnect = false;
    ws.close();
    ws = null;
  }

  const ping = async () => {
    await ws.send(encoder.encode('').buffer, true);
    setTimeout(() => {
      if (reconnect) {
        ping();
      }
    }, 3000)
  };

  const onOpen = async () => {
    console.log('Websocket Location Open!');
    let command =
      'CONNECT\n' +
      'accept-version:1.2\n' +
      'host:mykid.ttc.software\n' +
      'authorization:Bearer ' +
      DataLocal.accessToken +
      '\n' +
      'content-length:0\n' +
      '\n\0';
    await ws.send(encoder.encode(command).buffer, true);
    command =
      'SUBSCRIBE\n' +
      'id:' + generateRandomId(10) + '\n' +
      'destination:/user/queue/locations\n' +
      'content-length:0\n' +
      '\n\0';
    await ws.send(encoder.encode(command).buffer, true);

    ping();
  };

  const onClose = () => {
    console.log('Websocket Location Close!');
  };

  const onError = error => {
    console.log(JSON.stringify(error));
    console.log(error, 'Websocket Location Error!');
  };

  const onMessage = message => {
    if (locationDevices && DataLocal.accessToken !== null && message.data) {
      const split = message.data.split('\n');
      if (
        split[0] === 'MESSAGE' &&
        split.length > 4 &&
        split[2] === 'destination:/user/queue/locations'
      ) {
        const data = JSON.parse(
          split[split.length - 1].replace('\u0000', '').replace('\\u0000', ''),
        );
        const newData = Object.assign([], locationDevices);
        for (const obj of newData) {
          if (data.deviceId === obj.deviceId){
            obj.location = data.location;
            obj.type = data.type;
            obj.maxAccuracy = data.maxAccuracy;
            obj.power = data.power;
            obj.reportedAt = data.reportedAt;
          }
        }
        console.log(newData)
        setLocationDevices(newData)
      }
      console.log(message, 'WebSocket Location Message');
    }
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
          mapType={mapType ? 'standard' : 'hybrid'}>
          {locationDevices.length > 0 && (
            locationDevices.map((obj,i)=>{
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

        {locationDevices.length > 0 && locationDevices[indexSelect] && (
          <TouchableOpacity
            onPress={() => {
              const {lat, lng} = locationDevices[indexSelect]?.location;
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
              <Text style={styles.txtNameDevice}>{locationDevices[indexSelect].deviceName}</Text>
              <Text style={styles.txtTime}>
                {Moment(new Date(locationDevices[indexSelect].reportedAt)).format('HH:mm DD/MM/yyyy')}
              </Text>
            </View>
            <View style={styles.containerLastTime}>
              <Text style={styles.txtLocation}>{t('common:location')}{locationName}</Text>
              <Text style={[styles.txtTime,{flex: 1 ,fontSize: FontSize.xxtraSmall*0.8, textAlign: 'right'}]}>
                {locationDevices[indexSelect].type + ' ('+ t('common:discrepancy') + locationDevices[indexSelect].maxAccuracy + 'm)'}
              </Text>
            </View>

            <View style={styles.containerLastTime}>
              <Text style={[styles.txtLocation,{width: '80%'}]}>{t('common:coordinates')}{`${locationDevices[indexSelect]?.location?.lat}, ${locationDevices[indexSelect]?.location?.lng}`}</Text>
              <View style={styles.containerBattery}>
                <Text style={{fontSize: FontSize.xxtraSmall, color: Colors.gray}}>
                  {`${locationDevices[indexSelect].power || 0}%`}
                </Text>
                <Image source={(locationDevices[indexSelect].power || 0) > 20 ? Images.icBattery : Images.icLowBattery} style={(locationDevices[indexSelect].power || 0) > 20 ? styles.icBattery : styles.icLowBattery} />
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
            handleWebSocketSetup();
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
