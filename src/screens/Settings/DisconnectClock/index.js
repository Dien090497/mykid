import React, {useRef, useState, useEffect} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Image
} from 'react-native';
import Header from '../../../components/Header';
import {useTranslation} from "react-i18next";
import Images from '../../../assets/Images';
import DataLocal from "../../../data/dataLocal";
import Consts from "../../../functions/Consts";
import ModalConfirm from "../../../components/ModalConfirm";
import LoadingIndicator from "../../../components/LoadingIndicator";

export default function DisconnectClock({navigation}) {
  const { t } = useTranslation();
  const refModel = useRef();
  const refLoading = useRef();
  const refNotification = useRef();

  const disconnectClock= () => {

  }

  const gotoHomeScreen = () => {
    if (DataLocal.haveSim === '0') {
      DataLocal.saveHaveSim('1').then(r =>
        navigation.navigate(Consts.ScreenIds.Tabs)
      );
    }
  }

  return(
    <View style={{flex:1, backgroundColor: 'white'}}>
      <Header title={t('common:header_disconnectClock')}/>
      <TouchableOpacity
        style={{alignItems: 'center', marginTop: '18%', justifyContent: 'center'}}
        onPress={() => {refModel.current.open(t('common:alertDisconnectClock'), disconnectClock)}}
      >
        <Image source={Images.icDisconnect} style={{width: '50%'}} resizeMode={'center'}/>
      </TouchableOpacity>
      <ModalConfirm ref={refModel} />
      <LoadingIndicator  ref={refLoading} />
    </View>
  );
}