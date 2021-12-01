import React, {useRef, useState, useEffect} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import Header from '../../../components/Header';

export default function DisconnectClock() {
  return(
    <View style={{flex:1, backgroundColor: 'white'}}>
      <Header title={'Ngắt kết nối đồng hồ'}/>

    </View>
  );
}