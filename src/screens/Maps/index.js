import React, { useEffect, useRef, useState } from 'react';
import {
    View,
    Image,
    TouchableOpacity,
    Text,
    FlatList,
    Switch,
} from 'react-native';

import { styles } from './styles';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import Header from "../../components/Header";
import {String} from '../../assets/strings/String';
import { useSafeAreaInsets } from "react-native-safe-area-context";
export default ({ navigation, route }) => {
return (
    <View style={[styles.container, { paddingBottom: useSafeAreaInsets().bottom }]}>
    <Header title={String.header_maps} />
    <MapView
      style={{flex: 1,width:'100%', height: 300}}
      provider={PROVIDER_GOOGLE}
    initialRegion={{
      latitude: 37.78825,
      longitude: -122.4324,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    }}
    
  />
  </View>
  )
}