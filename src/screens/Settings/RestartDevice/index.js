import { Image, Text, TouchableOpacity, View, Modal} from 'react-native';
import React, {useLayoutEffect, useRef, useState} from 'react'
import {Colors} from '../../../assets/colors/Colors';
import DataLocal from '../../../data/dataLocal';
import Header from '../../../components/Header';
import Images from '../../../assets/Images';
import {String} from '../../../assets/strings/String';
import {offDeviceApi, restartDeviceApi} from "../../../network/DeviceService";
import {showAlert} from "../../../functions/utils";
import ModalConfirm from "../../../components/ModalConfirm";
import LoadingIndicator from "../../../components/LoadingIndicator";

export default function restartDevice() {
  const refModel = useRef();
  const refLoading = useRef();
  const  restartDevice = () => {
    restartDeviceApi(DataLocal.deviceId, {
      success: res => {
      showAlert(String.submitSuccess)
      },
      refLoading: refLoading
    });
  }

  return (
    <View style={{flex: 1, backgroundColor: Colors.white, alignItems: 'center'}}>
      <Header title={String.header_remoteStart}/>
      <View style={{flex:1, alignItems: 'center', justifyContent: 'center'}}>
        <TouchableOpacity
          onPress={() => {refModel.current.open(String.alerfRestartDevice, restartDevice); }}
        >
          <Image source={Images.icRestart} resizeMode={'stretch'} style={{width: 190, height: 190}}/>
        </TouchableOpacity>
      </View>
      <ModalConfirm
        ref={refModel}
      />
      <LoadingIndicator  ref={refLoading} />
    </View>
  );
}