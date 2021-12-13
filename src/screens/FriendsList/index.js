import React, { useLayoutEffect, useRef, useState } from 'react';
import {
  FlatList,
  Modal,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {styles} from './styles';
import Header from '../../components/Header';
import LoadingIndicator from '../../components/LoadingIndicator';
import { Image } from 'react-native';
import Images from '../../assets/Images';
import Consts, {ScaleHeight} from '../../functions/Consts';
import { useTranslation } from 'react-i18next';
import DataLocal from '../../data/dataLocal';
import NotificationModal from '../../components/NotificationModal';
import { getListDeviceApi } from '../../network/DeviceService';
import {Colors} from "../../assets/colors/Colors";

export default function FriendsList({navigation}) {
  const refLoading = useRef();
  const refNotification = useRef();
  const [showModal, setShowModal] = useState(false);
  const [devices, setDevices] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(DataLocal.deviceIndex);
  const { t } = useTranslation();

  useLayoutEffect(() => {
    getListDevice();
  }, []);

  const handleChange = async (index) => {
    if (!DataLocal.haveSim && refNotification && refNotification.current) {
      refNotification.current.open(t('errorMsg:kwa4067'));
      return;
    }
    setSelectedIndex(index);
    setShowModal(false);
  };

  const getListDevice = () => {
    getListDeviceApi(DataLocal.userInfo.id, 0, 100, '', 'ACTIVE', {
      success: res => {
        setDevices(res.data);
      },
      refLoading,
      refNotification,
    });
  };

  const gotoHomeScreen = () => {
    if (DataLocal.haveSim === '0') {
      navigation.navigate(Consts.ScreenIds.Tabs);
    }
  }

  const renderItemModal = ({item, index}) => {
    DataLocal.saveHaveSim(devices[selectedIndex].validSim ? '1' : '0');
    return (
      <TouchableOpacity
        activeOpacity={0.9}
        style={selectedIndex === index ? [styles.containerItemContact, {backgroundColor: Colors.grayButton}] : styles.containerItemContact}
        key={item.name}
        onPress={() => handleChange(index)}
      >
        <View style={styles.wrap}>
          <View style={{justifyContent: 'center', alignItems: 'center', width: '20%'}}>
            <Image source={item.avatar ? {uri: item.avatar} : Images.icOther} style={{width: ScaleHeight.medium , height: ScaleHeight.medium, borderRadius:  ScaleHeight.medium / 2}} resizeMode = {'cover'}/>
          </View>
          <View style={{width: '80%', paddingHorizontal: 10}}>
            <Text style={selectedIndex === index ? [styles.textModalShow, {color: Colors.gray}] : styles.textModalShow }>
              {item.deviceName}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.contain}>
      <Header title={t('common:header_friend')} />
      <View style={styles.modal}>
        <TouchableOpacity style={styles.modalSelect}>
          <View style={{alignItems: 'center', justifyContent: 'center', width: '10%'}}>
            <Image source={Images.icShow} style={styles.iconShowModal} resizeMode='stretch'/>
          </View>
          <View onStartShouldSetResponder={() => {
            setShowModal(true)
          }}
          >
            <Text style={styles.textModalShow}>{devices && devices[selectedIndex] && devices[selectedIndex].deviceName}</Text>
          </View>
          <View>
            <Image
              source={devices && devices[selectedIndex] && devices[selectedIndex].avatar ? {uri: devices[selectedIndex].avatar} : Images.icOther}
              style={styles.avatar} resizeMode='cover'/>
          </View>
        </TouchableOpacity>
      </View>
      <ScrollView style={styles.contain}>
      </ScrollView>
      <Modal
        visible={showModal}
        transparent={true}
        animationType={'none'}>
        <TouchableOpacity
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0.3)',
            width: '100%',
            height: '100%',
            flexDirection: 'column'
          }}
          onPress={() => setShowModal(false)}>
          <View style={styles.viewModal}>
            <View style={{ alignItems: 'center' }}>
              <Text style={styles.textItem}>{t('common:listDevice')}</Text>
            </View>
            <FlatList
              data={devices}
              style={[styles.wrapContainer, {backgroundColor: 'white', width: '100%', marginBottom: '5%'}]}
              renderItem={renderItemModal}
              keyExtractor={item => item.name}
            />
          </View>
        </TouchableOpacity>
      </Modal>
      <LoadingIndicator ref={refLoading} />
      <NotificationModal ref={refNotification} goBack={gotoHomeScreen}/>
    </View>
  );
}
