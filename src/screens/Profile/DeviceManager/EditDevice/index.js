import {
  Image, Keyboard,
  Text, TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { styles } from './styles';
import Header from '../../../../components/Header';
import Images from '../../../../assets/Images';
import Consts from '../../../../functions/Consts';
import { Colors } from '../../../../assets/colors/Colors';
import LoadingIndicator from '../../../../components/LoadingIndicator';
import React, { useLayoutEffect, useRef, useState } from 'react';
import ModalConfirm from '../../../../components/ModalConfirm';
import { editDeviceApi } from '../../../../network/DeviceService';
import { useTranslation } from 'react-i18next';
import DataLocal from '../../../../data/dataLocal';
import NotificationModal from "../../../../components/NotificationModal";

export default function EditDevice({ navigation, route }) {

  const refLoading = useRef();
  const refConfirm = useRef();
  const refNotification = useRef();
  const [data, setData] = useState(null);
  const { t } = useTranslation();

  useLayoutEffect(() => {
    setData(route.params.data);
    console.log('a',route.params.data)
  }, []);

  const onRelationship = () => {
    navigation.navigate(Consts.ScreenIds.Relationship, { data: data, onSetRelationship: onPlaceChosen });
  };

  const onPlaceChosen = (relationship) => {
    const newData = Object.assign({}, data);
    newData.relationshipName = relationship.name;
    newData.relationship = relationship.relationship;
    newData.icon = relationship.icon;
    setData(newData);
  };

  const deleteConfirm = () => {
    const result = Object.assign({}, data);
    if (result.relationship !== 'OTHER') {
      result.relationshipName = null;
    }
    editDeviceApi(
      result.id,
      result.deviceName,
      result.icon,
      result.relationship,
      result.relationshipName,
      {
        success: res => {
          route.params.onRefresh();
          refNotification.current.open(t('common:EditSuccess'), () => navigation.goBack());
        }
        , refLoading,
        refNotification,
      }
    )
  };

  const setDeviceName = (text) => {
    const result = Object.assign({}, data)
    result.deviceName = text;
    setData(result)
  }

  return (
    <View style={styles.contain}>
      <Header title={t('common:header_editDevice')} />
      <View style={{ flex: 1, marginHorizontal: 20 }}>
        <View style={styles.viewContain}>
          <Text style={styles.containText}>{t('common:textDeviceNane')}</Text>
          {data && <TextInput style={styles.textNickName}
            onChangeText={(text) => { setDeviceName(text) }}
            maxLength={10}
            value={data.deviceName} />}
        </View>
        <TouchableOpacity style={styles.input} onPress={onRelationship}>
          {data && <Image style={[styles.iconInput, { height: '60%' }]} source={data.icon} resizeMode='contain' />}
          {data &&
            <Text style={{ flex: 1, color: Colors.black }}>{t('common:iAm')}
              <Text style={{ fontFamily: 'Roboto-Bold' }}>
                {DataLocal.language === 'vi' ? data.relationshipName : t('common:ofHe') + ' '}
              </Text>
              {DataLocal.language === 'vi' ? t('common:ofHe') + ' ' : data.relationshipName}
            </Text>}
          <TouchableOpacity style={{ paddingVertical: '3%' }}>
            <Image style={styles.iconInput} source={Images.icDetail} resizeMode='contain' />
          </TouchableOpacity>
        </TouchableOpacity>
        <View style={styles.input} >
          <Image style={[styles.iconInput, { height: '60%' }]} source={Images.icMobile} resizeMode='contain' />
          <Text style={{ flex: 1, color: Colors.colorHeader }}>{route.params.data.isdn ? '0'+ route.params.data.isdn.substring(3) : t('common:yetHave')}</Text>
        </View>
        <View style={[styles.input, {justifyContent: 'flex-start'}]} >
          <Text style={{color: Colors.black, marginLeft: '4%' }}>ID Đồng hồ: </Text>
          <Text style={{color: Colors.colorHeader, marginLeft: '1%' }}>{route.params.data.deviceCode}</Text>
        </View>
        <View style={[styles.input, {justifyContent: 'flex-start'}]} >
          <Text style={{color: Colors.black, marginLeft: '4%' }}>IMEI đồng hồ: </Text>
          <Text style={{color: Colors.colorHeader, marginLeft:'1%' }}>{route.params.data.imei ? route.params.data.imei : t('common:yetHave')}</Text>
        </View>
        <TouchableOpacity style={styles.button} onPress={() => { deleteConfirm() }}>
          <Text style={styles.buttonText}>{t('common:confirm')}</Text>
        </TouchableOpacity>
      </View>
      <LoadingIndicator ref={refLoading} />
      <ModalConfirm ref={refConfirm} />
      <NotificationModal ref={refNotification} />
    </View>
  );
}
