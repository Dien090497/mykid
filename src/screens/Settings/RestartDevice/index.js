import { Image, TouchableOpacity, View } from 'react-native';
import React, { useRef } from 'react';
import { Colors } from '../../../assets/colors/Colors';
import DataLocal from '../../../data/dataLocal';
import Header from '../../../components/Header';
import Images from '../../../assets/Images';
import { restartDeviceApi } from '../../../network/DeviceService';
import ModalConfirm from '../../../components/ModalConfirm';
import LoadingIndicator from '../../../components/LoadingIndicator';
import { useTranslation } from 'react-i18next';
import NotificationModal from '../../../components/NotificationModal'
import Consts from "../../../functions/Consts";

export default function restartDevice({navigation}) {
  const refModel = useRef();
  const refLoading = useRef();
  const refNotification = useRef();
  const { t } = useTranslation();
  const restartDevice = () => {
    restartDeviceApi(DataLocal.deviceId, {
      success: res => {
        refNotification.current.open(t('common:submitSuccess'))
      },
      refLoading: refLoading,
      refNotification: refNotification,
    });
  };

  const gotoHomeScreen = () => {
    if (DataLocal.haveSim === '0') {
      DataLocal.saveHaveSim('1').then(r =>
        navigation.navigate(Consts.ScreenIds.Tabs)
      );
    }
  }

  return (
    <View style={{ flex: 1, backgroundColor: Colors.white, alignItems: 'center' }}>
      <Header title={t('common:header_remoteStart')} />
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <TouchableOpacity
          onPress={() => {
            refModel.current.open(t('common:alerfRestartDevice'), restartDevice);
          }}
        >
          <Image source={Images.icRestart} resizeMode={'stretch'} style={{ width: 190, height: 190 }} />
        </TouchableOpacity>
      </View>
      <ModalConfirm
        ref={refModel}
      />
      <NotificationModal ref={refNotification} />
      <LoadingIndicator ref={refLoading} goBack={gotoHomeScreen}/>
    </View>
  );
}
