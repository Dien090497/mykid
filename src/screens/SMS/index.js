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
import FastImage from 'react-native-fast-image';
import { useTranslation } from 'react-i18next';
import { getBrandsApi } from '../../network/SMSService';
import DataLocal from '../../data/dataLocal';
import NotificationModal from '../../components/NotificationModal';
import { getListDeviceApi } from '../../network/DeviceService';
import {Colors} from "../../assets/colors/Colors";

export default function SMS({navigation}) {
  const refLoading = useRef();
  const refNotification = useRef();
  const [brands, setBrands] = useState([]);
  const [devices, setDevices] = useState([]);
  const [showMenu, setShowMenu] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(DataLocal.deviceIndex);
  const { t } = useTranslation();

  useLayoutEffect(() => {
    getListDevice();
  }, []);

  useLayoutEffect(() => {
    if (devices && devices.length > 0) {
      getBrands(devices[selectedIndex].deviceId)
    }
  }, [devices]);

  const handleChange = async (index) => {
    if (!DataLocal.haveSim && refNotification && refNotification.current) {
        refNotification.current.open(t('errorMsg:kwa4067'));
      return;
    }
    setSelectedIndex(index);
    getBrands(devices[index].deviceId)
  };

  const getBrands = (deviceId) => {
    setShowMenu(false);
    getBrandsApi(deviceId, {
      success: resData => {
        setBrands(resData.data);
      },
      refLoading,
      refNotification,
    }).then();
  }

  const getListDevice = () => {
    getListDeviceApi(DataLocal.userInfo.id, 0, 100, '', 'ACTIVE', {
      success: res => {
        setDevices(res.data);
      },
      refLoading,
      refNotification,
    });
  };

  const toggleChat = (obj, i) => {
    navigation.navigate(Consts.ScreenIds.SMSDetail, {brand: obj, deviceId: devices[selectedIndex].deviceId});
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
              <Image source={item.avatar ? {uri: item.avatar} : Images.icOther} style={{width: ScaleHeight.medium , height: ScaleHeight.medium, borderRadius: ScaleHeight.medium / 2}} resizeMode = {'cover'}/>
            </View>
            <View style={{width: '80%', paddingHorizontal: 10}}>
              <Text style={selectedIndex === index ? [styles.textMenuShow, {color: Colors.gray}] : styles.textMenuShow }>
                {item.deviceName}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
    );
  };

  return (
    <View style={styles.contain}>
      <Header title={t('common:header_sms')} />
      <View style={styles.menu}>
        <TouchableOpacity style={styles.menuSelect}>
         <View style={{alignItems: 'center', justifyContent: 'center', width: '10%'}}>
           <Image source={Images.icShow} style={styles.iconShowMenu} resizeMode='stretch'/>
         </View>
          <View onStartShouldSetResponder={() => {
            setShowMenu(true)
          }}
          >
            <Text style={styles.textMenuShow}>{devices && devices[selectedIndex] && devices[selectedIndex].deviceName}</Text>
          </View>
          <View>
            <Image
              source={devices && devices[selectedIndex] && devices[selectedIndex].avatar ? {uri: devices[selectedIndex].avatar} : Images.icOther}
              style={styles.avatar} resizeMode='cover'/>
          </View>
        </TouchableOpacity>
      </View>
      <ScrollView style={styles.container}>
        {brands && brands.map((obj, i) => (
          <View key={i}>
            <TouchableOpacity style={styles.viewItem} onPress={() => {toggleChat(obj, i);}}>
              <View style={styles.viewImg}>
                <FastImage source={obj.avatar ? {uri: obj.avatar} : Images.icAvatar} style={styles.icAvatar} resizeMode={FastImage.resizeMode.stretch} />
              </View>
              <View style={styles.viewText}>
                <View style={styles.rowDirection}>
                  <Text style={styles.txtDate}>{(obj.lastedSmsReportedAt && obj.lastedSmsReportedAt.length > 10 ? obj.lastedSmsReportedAt.substring(0, 10) : '') || ''}</Text>
                  <Text style={styles.txtTitle}>{obj.name || ''}</Text>
                </View>
                <Text numberOfLines={1} style={styles.txtContent}>{obj.lastedSmsContent || ''}</Text>
              </View>
              <View style={styles.viewArrow}>
                <Image source={Images.icRightArrow} style={styles.icArrow}/>
              </View>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
      <Modal
        visible={showMenu}
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
          onPress={() => setShowMenu(false)}>
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
