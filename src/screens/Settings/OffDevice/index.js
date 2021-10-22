import {FlatList, Image, Text, TouchableOpacity, View, Modal, RefreshControl, ScrollView} from 'react-native';
import React, {useLayoutEffect, useRef, useState} from 'react'
import { showAlert, showConfirmation} from '../../../functions/utils';

import {Colors} from '../../../assets/colors/Colors';
import Header from '../../../components/Header';
import Images from '../../../assets/Images';
import LoadingIndicator from '../../../components/LoadingIndicator';
import {String} from '../../../assets/strings/String';
import {offDeviceApi} from "../../../network/DeviceService";
import DataLocal from '../../../data/dataLocal';
import ModalConfirm from "../../../components/ModalConfirm";

export default function OffDevice() {
  const refModel = useRef();
  const refLoading = useRef();
  const turnOffDevice = () => {
    offDeviceApi(DataLocal.deviceId, {
      success: res => {
        showAlert(String.submitSuccess)
      },
      refLoading: refLoading
    });
  }

  return (
    <View style={{flex: 1, backgroundColor: Colors.white, alignItems: 'center', flexDirection: 'column'}}>
      <Header title={String.header_remoteDevices}/>
     <View style={{flex:1, alignItems: 'center', justifyContent: 'center'}}>
       <TouchableOpacity
         onPress={() => {refModel.current.open(String.alerfTurnOffDevice); }}
       >
         <Image source={Images.icTurnOff} resizeMode={'stretch'} style={{width: 190, height: 190}}/>
       </TouchableOpacity>
     </View>
      <ModalConfirm
         ref={refModel}
         onPressYes={turnOffDevice}
      />
      <LoadingIndicator  ref={refLoading} />
    </View>
  );
}