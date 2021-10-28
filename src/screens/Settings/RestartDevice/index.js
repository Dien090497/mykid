import { Image, TouchableOpacity, View } from 'react-native';
import React, { useRef } from 'react';
import { Colors } from '../../../assets/colors/Colors';
import DataLocal from '../../../data/dataLocal';
import Header from '../../../components/Header';
import Images from '../../../assets/Images';
import { restartDeviceApi } from '../../../network/DeviceService';
import { showAlert } from '../../../functions/utils';
import ModalConfirm from '../../../components/ModalConfirm';
import LoadingIndicator from '../../../components/LoadingIndicator';
import { useTranslation } from 'react-i18next';

export default function restartDevice() {
  const refModel = useRef();
  const refLoading = useRef();
  const { t } = useTranslation();
  const restartDevice = () => {
    restartDeviceApi(DataLocal.deviceId, {
      success: res => {
        showAlert(t('common:submitSuccess'));
      },
      refLoading: refLoading,
    });
  };

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
      <LoadingIndicator ref={refLoading} />
    </View>
  );
}
