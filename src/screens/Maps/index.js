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
import {styles} from './styles';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

const markerDaughter = {
  latitude: 21.0152828,
  longitude: 105.8311229,
};

const initialRegion = {
  latitude: 21.030653,
  longitude: 105.84713,
  latitudeDelta: 0.0922,
  longitudeDelta: 0.0421,
};

export default ({navigation, route}) => {
  const refMap = useRef(null);
  return (
    <View
      style={[styles.container, {paddingBottom: useSafeAreaInsets().bottom}]}>
      <Header title={String.header_maps} back />
      <View style={styles.container}>
        <MapView
          ref={refMap}
          style={styles.container}
          provider={PROVIDER_GOOGLE}
          region={initialRegion}
        />

        <Marker
          coordinate={markerDaughter}
          title={'Con gái'}
          pinColor={'purple'}
          description={'Con gái'}
        />

        <View style={styles.containerDevice}>
          <View style={styles.container}>
            <Text style={styles.txtNameDevice} children={'Con gái'} />

            <Text
              style={styles.txtLocation}
              children={`Toạ độ: 21.0152828, 105.8311229`}
            />
          </View>

          <View style={styles.containerLastTime}>
            <Text style={styles.txtTime} children={`10-09-2021 21:30:18`} />

            <View style={styles.containerBattery}>
              <Text
                style={{fontSize: FontSize.small, color: Colors.gray}}
                children={`80%`}
              />
              <Image source={Images.icBattery} style={styles.icBattery} />
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};
