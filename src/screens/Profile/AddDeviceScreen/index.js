import { Image, Modal, ScrollView, Text, TextInput, TouchableOpacity, View, } from 'react-native';
import React, { useLayoutEffect, useRef, useState } from 'react';
import Consts, {ScaleHeight} from '../../../functions/Consts';
import Header from '../../../components/Header';
import Images from '../../../assets/Images';
import LoadingIndicator from '../../../components/LoadingIndicator';
import { addDeviceApi } from '../../../network/DeviceService';
import styles from './style';
import { checkCameraPermission } from '../../../functions/permissions';
import { useTranslation } from 'react-i18next';
import DataLocal from '../../../data/dataLocal';
import NotificationModal from '../../../components/NotificationModal';
import { Colors } from '../../../assets/colors/Colors';
import reduxStore from "../../../redux/config/redux";
import commonInfoAction from "../../../redux/actions/commonInfoAction";
import {useSelector} from "react-redux";

const AddDeviceScreen = ({ navigation, route }) => {
  const refNotification = useRef();
  const [deviceCode, setDeviceCode] = useState('');
  const [deviceName, setDeviceName] = useState('');
  const [submitActive, setSubmitActive] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modal, setModal] = useState(false);
  const [contentModal, setContentModal] = useState('');
  const { t } = useTranslation();
  const commonInfoReducer = useSelector(state => state.commonInfoReducer.navigate);
  const [data, setData] = useState(
    {
      id: 1,
      name: t('common:dad'),
      icon: Images.icFather,
      relationship: 'FATHER',
    });
  const refLoading = useRef();

  useLayoutEffect(() => {
    if (commonInfoReducer && route.params.isModalConfirm &&
        commonInfoReducer.navigate !== null && commonInfoReducer.navigate !== undefined) {
      setModal(true);
    }
  }, [commonInfoReducer]);

  useLayoutEffect(() => {
    setSubmitActive(deviceCode && deviceName);
  }, [deviceCode, deviceName]);

  useLayoutEffect(() => {
    if (route.params && route.params.isShowAlert) {
      setContentModal(t('common:addDeviceSuccess2'));
      setShowModal(true);
    }
  }, []);

  const onQR = (qr) => {
    setDeviceCode(qr);
    console.log(qr);
  };

  const onPlaceChosen = (config) => {
    setData(config)
  };

  const onRelationship = () => {
    navigation.navigate(Consts.ScreenIds.Relationship, {
      data: data,
      onChooseed: onPlaceChosen,
    });
  };
  const addDevice = () => {
    if (!submitActive) return;
    addDeviceApi(deviceCode, deviceName, data.icon, data.relationship, data.relationshipName ,{
      success: resp => {
        if (resp.data) {
          if (resp.data.status === 'PENDING') {
            setContentModal(t('common:addDeviceSuccess2'));
            setShowModal(true);
            setDeviceCode('');
            setDeviceName('');
            setData({
              id: 1,
              name: t('common:dad'),
              icon: Images.icFather,
              relationship: 'FATHER',
            })
          } else if (resp.data.status === 'ACTIVE') {
            if (route.params && route.params.onRefresh()) {
              route.params.onRefresh();
              navigation.goBack();
            } else {
              navigation.navigate(Consts.ScreenIds.Tabs);
            }
            refNotification.current.open(t('common:addDeviceSuccess'),()=>{
              if (route.params && route.params.onRefresh()) {
                route.params.onRefresh();
                navigation.goBack();
              } else {
                navigation.navigate(Consts.ScreenIds.Tabs);
              }
            });
          }
        }

      },
      failure: error => {
      },
      refLoading,
      refNotification,
    }).then();
  };
  const onScan = async () => {
    try {
      checkCameraPermission().then(granted => {
        if (granted) {
          navigation.navigate(Consts.ScreenIds.QRCodeScreen, { onQR: onQR });
        }
      })
    } catch (error) {
      alert(error.message);
    }
  };

  const showModalMes = () =>{
    return(
      <Modal
        animationType='slide'
        transparent={true}
        visible={showModal}>
        <View style={styles.modalContainer}>
          <View style={styles.modal}>
            <Text style={styles.titleModal}>{t('common:notification')}</Text>
            <Text style={styles.contentModal}>{contentModal}</Text>
            <TouchableOpacity
              onPress={() =>{setShowModal(false)}}
              style={styles.btnConfirm}>
              <Text style={styles.textConfirm}>{t('common:member_approval')}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  }

  const onNavigateHome = () => {
    navigation.navigate({
      params: commonInfoReducer.navigate,
      name: Consts.ScreenIds.Tabs
    });
    setModal(false);
    setShowModal(false);
    reduxStore.store.dispatch(commonInfoAction.reset());
  }

  const closeModal = () => {
    setModal(false);
    setShowModal(false);
    reduxStore.store.dispatch(commonInfoAction.reset());
  }

  return (
    <View style={styles.contain}>
      <Header title={t('common:header_addDevice')} />
      <ScrollView style={{ paddingHorizontal: 30 }}>
        <View style={styles.viewImage}>
          <Image style={styles.Sty_Images} source={Images.icSmartwatch} resizeMode='contain' />
        </View>

        <View style={styles.input}>
          <Image style={styles.iconInput} source={Images.icSmartwatch3} resizeMode='contain' />
          <TextInput
            value={deviceCode}
            placeholder={t('common:enterOrScanCode')}
            placeholderTextColor='#B5B4B4'
            onChangeText={code => setDeviceCode(code)}
            style={styles.textInput} />
          <TouchableOpacity onPress={onScan}>
            <Image style={[styles.iconInput,{height:'60%'}]} source={Images.icQRCode} resizeMode='contain' />
          </TouchableOpacity>
        </View>

        <Text style={styles.txtInformation}>{t('common:genneralInfo')}</Text>
        <View style={[styles.input,{marginBottom:20}]}>
            <Image style={[styles.iconInput,{height:'60%'}]} source={Images.icUser2} resizeMode='contain' />
          <TextInput
            placeholder={t('common:deviceNickname')}
            onChangeText={name => setDeviceName(name)}
            placeholderTextColor='#B5B4B4'
            value={deviceName}
            maxLength={30}
            style={styles.textInput} />
        </View>
        <TouchableOpacity style={styles.input} onPress={() => onRelationship()}>
          <Image style={[styles.iconInput,{height:'60%'}]} source={data.icon} resizeMode='contain' />
          <Text style={styles.textInput}>{DataLocal.language === 'vi' ? t('common:iAm') + data.name + ' ' + t('common:ofHe') : t('common:iAm') + t('common:ofHe') + ' ' + data.name  } </Text>
          <TouchableOpacity style={{ paddingVertical: '3%' }}>
            <Image style={styles.iconInput} source={Images.icDetail} resizeMode='contain' />
          </TouchableOpacity>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={addDevice}
          style={[styles.viewButton, submitActive ? {} : {backgroundColor: Colors.gray}]}>
          <Text style={styles.textSubmit}>{t('common:confirm')}</Text>
        </TouchableOpacity>
      </ScrollView>
      {showModalMes()}
      <LoadingIndicator ref={refLoading} />
      <NotificationModal ref={refNotification} />
      <Modal
        visible={modal}
        transparent={true}
        animationType={'none'}>
        <View style={[styles.itemLeft]}>
          <TouchableOpacity
            style={styles.modal1}
            onPress={closeModal}>
            <View style={styles.tobModal}>
              <View style={[styles.tobView, {marginTop: ScaleHeight.small}]}>
                <Text style={styles.textModel}>{t('common:alertDevicesSuccess')}</Text>
              </View>
              <View style={[styles.tobView, {width: '86%'}]}>
                <View style={styles.tob}>
                  <TouchableOpacity
                    style={[
                      styles.smallButton,
                      {backgroundColor: Colors.white},
                    ]}
                    onPress={closeModal}>
                    <Text style={[styles.smallButtonText, {color: Colors.red}]}>
                      {t('common:cancel')}
                    </Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.TobOpacity}>
                  <TouchableOpacity
                    style={[styles.smallButton, {backgroundColor: Colors.red}]}
                    onPress={onNavigateHome}>
                    <Text
                      style={[styles.smallButtonText, {color: Colors.white}]}>
                      {t('common:member_approval')}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};
export default AddDeviceScreen;
