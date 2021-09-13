import {
  FlatList,
  Image,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import React, {useEffect, useRef, useState} from 'react';

import {Colors} from '../../assets/colors/Colors';
import {FontSize} from '../../functions/Consts';
import Header from '../../components/Header';
import Images from '../../assets/Images';
import {String} from '../../assets/strings/String';
import {getLocationDeviceApi} from '../../network/DeviceService';
import {styles} from './styles';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

const markerDaughter = {
  latitude: 21.0076485,
  longitude: 105.8236356,
  title: 'Con gái',
  battery: 80,
  lastUpdated: '10-09-2021 21:30:18'
};

const initialRegion = {
  latitude: 21.030653,
  longitude: 105.84713,
  latitudeDelta: 0.0922,
  longitudeDelta: 0.0421,
};

export default ({navigation, route}) => {
  const refMap = useRef(null);
  const [currentDevice, setCurrentDevice] = useState(markerDaughter);

  useEffect(() => {
    const getLocationDevice = () => {
      getLocationDeviceApi(1, {
        success: res => {
          setCurrentDevice(res);
          console.log(res, 'getLocationDevice>>>>>>>>>>>');
        },
      });
    };
    getLocationDevice();
  }, []);

  return (
    <View
      style={[styles.container, {paddingBottom: useSafeAreaInsets().bottom}]}>
      <Header title={String.header_maps} back />
      <View style={styles.container}>
        <MapView
          ref={refMap}
          style={styles.container}
          provider={PROVIDER_GOOGLE}
          showsUserLocation={true}
          region={initialRegion}>
          <Marker
            coordinate={markerDaughter}
            title={currentDevice.title}
          />
        </MapView>

        <TouchableOpacity
          onPress={() => {
            refMap.current.animateCamera({
              center: markerDaughter,
              zoom: 15,
            });
          }}
          style={styles.containerDevice}>
          <View style={styles.container}>
            <Text style={styles.txtNameDevice} children={currentDevice.title} />

            <Text
              style={styles.txtLocation}
              children={`Toạ độ: ${currentDevice.latitude}, ${currentDevice.longitude}`}
            />
          </View>

          <View style={styles.containerLastTime}>
            <Text style={styles.txtTime} children={currentDevice.lastUpdated} />

            <View style={styles.containerBattery}>
              <Text
                style={{fontSize: FontSize.small, color: Colors.gray}}
                children={`${currentDevice.battery}%`}
              />
              <Image source={Images.icBattery} style={styles.icBattery} />
            </View>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};
