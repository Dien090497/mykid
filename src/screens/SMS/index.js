import React, { useLayoutEffect, useRef, useState } from 'react';
import {
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
import Consts from '../../functions/Consts';
import FastImage from 'react-native-fast-image';
import { useTranslation } from 'react-i18next';
import { getBrandsApi } from '../../network/SMSService';
import DataLocal from '../../data/dataLocal';
import NotificationModal from '../../components/NotificationModal';
import { getListDeviceApi } from '../../network/DeviceService';
import { Menu, MenuDivider } from 'react-native-material-menu';

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
    if (!!DataLocal.haveSim && refNotification && refNotification.current) {
      setTimeout(() => {
        refNotification.current.open(t('errorMsg:kwa4067'));
      }, 1000);
      return;
    }
    setSelectedIndex(index);
    getBrands(devices[index].deviceId)
  };

  const getBrands = (deviceId) => {
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
      DataLocal.saveHaveSim('1').then(r =>
        navigation.navigate(Consts.ScreenIds.Tabs)
      );
    }
  }

  return (
    <View style={styles.contain}>
      <Header title={t('common:header_sms')} />
      <View style={styles.menu}>
        <Menu
          style={{borderRadius: 15}}
          visible={showMenu}
          anchor={
            <View style={styles.menuSelect}>
              <Image source={Images.icShow} style={styles.iconShowMenu} resizeMode='stretch'/>
              <View onStartShouldSetResponder={() => {
                setShowMenu(true)
              }}>
                <Text
                  style={styles.textMenuShow}>{devices && devices[selectedIndex] && devices[selectedIndex].deviceName}</Text>
              </View>
              <View>
                <Image
                  source={devices && devices[selectedIndex] && devices[selectedIndex].avatar ? {uri: devices[selectedIndex].avatar} : Images.icOther}
                  style={styles.avatar} resizeMode='cover'/>
              </View>
            </View>}
          onRequestClose={() => {
            setShowMenu(false);
          }}
        >
          {devices && devices.map((obj, i) => {
            const isSelectDevice = i === selectedIndex;
            DataLocal.saveHaveSim(devices[selectedIndex].validSim ? '1' : '0');
            return (
              <View key={i.toString()} style={{paddingHorizontal: 10}}>
                <View style={styles.viewMenuDrop} onStartShouldSetResponder={() => {
                  !isSelectDevice ? handleChange(i) : null;
                }}>
                  <Text
                    style={[styles.textMenuDrop, isSelectDevice ? {color: '#CDCDCD'} : null]}>{obj.deviceName}</Text>
                  <Image source={obj.avatar ? {uri: obj.avatar} : Images.icOther} style={styles.avatar}
                          resizeMode='cover'/>
                </View>
                <MenuDivider/>
              </View>
            );
          })}
        </Menu>
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
      <LoadingIndicator ref={refLoading} />
      <NotificationModal ref={refNotification} goBack={gotoHomeScreen}/>
    </View>
  );
}
