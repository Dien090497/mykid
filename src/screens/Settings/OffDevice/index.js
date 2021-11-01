import { Image, TouchableOpacity, View } from 'react-native';
import React, { useRef } from 'react'

import {Colors} from '../../../assets/colors/Colors';
import Header from '../../../components/Header';
import Images from '../../../assets/Images';
import LoadingIndicator from '../../../components/LoadingIndicator';
import {offDeviceApi} from '../../../network/DeviceService';
import DataLocal from '../../../data/dataLocal';
import ModalConfirm from '../../../components/ModalConfirm';
import NotificationModal from '../../../components/NotificationModal';
import { useTranslation } from 'react-i18next';

export default function OffDevice() {
  const refModel = useRef();
  const refLoading = useRef();
  const refNotification = useRef();
  const { t } = useTranslation();
  const turnOffDevice = () => {
    offDeviceApi(DataLocal.deviceId, {
      success: res => {
        refNotification.current.open(t('common:submitSuccess'))
      },
      refLoading: refLoading,
      refNotification: refNotification``
    });
  }

  return (
    <View style={{flex: 1, backgroundColor: Colors.white, alignItems: 'center', flexDirection: 'column'}}>
      <Header title={t('common:header_remoteDevices')}/>
     <View style={{flex:1, alignItems: 'center', justifyContent: 'center'}}>
       <TouchableOpacity
         onPress={() => {refModel.current.open(t('common:alerfTurnOffDevice'), turnOffDevice); }}
       >
         <Image source={Images.icTurnOff} resizeMode={'stretch'} style={{width: 190, height: 190}}/>
       </TouchableOpacity>
     </View>
      <ModalConfirm
         ref={refModel}
      />
      <LoadingIndicator  ref={refLoading} />
      <NotificationModal ref={refNotification} />
    </View>
  );
}
