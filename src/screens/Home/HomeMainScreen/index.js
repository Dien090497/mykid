import { Image, ScrollView, StatusBar, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';

import { Menu, MenuDivider } from 'react-native-material-menu';
import DataLocal from '../../../data/dataLocal';
import reduxStore from '../../../redux/config/redux';
import { useSelector } from 'react-redux';
import commonInfoAction from '../../../redux/actions/commonInfoAction';
import Consts from '../../../functions/Consts';
import Images from '../../../assets/Images';
import LoadingIndicator from '../../../components/LoadingIndicator';
import { getListDeviceApi } from '../../../network/DeviceService';

import {styles} from './styles';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import XmppClient from '../../../network/xmpp/XmppClient';
import WebSocketSafeZone from '../../../network/socket/WebSocketSafeZone';
import WebSocketVideoCall from '../../../network/socket/WebSocketVideoCall';
import WebSocketCheckSim from '../../../network/socket/WebSocketCheckSim';
import { useTranslation } from 'react-i18next';
import NotificationModal from '../../../components/NotificationModal';

export default function HomeMainScreen() {
  const navigation = useNavigation();
  const commonInfoReducer = useSelector(state => state.commonInfoReducer);
  const logout = useSelector(state => state.loginReducer.isLogout);
  const refLoading = useRef();
  const refNotification = useRef();
  const [showMenu, setShowMenu] = useState(false);
  const [devices, setDevices] = useState(null);
  const isFocused = useIsFocused();
  const [selectedIndex, setSelectedIndex] = useState(DataLocal.deviceIndex);
  const { t } = useTranslation();

  useLayoutEffect(() => {
    XmppClient.connectXmppServer();
    WebSocketSafeZone.setReconnect(true);
    WebSocketSafeZone._handleWebSocketSetup(navigation);
    WebSocketVideoCall.setReconnect(true);
    WebSocketVideoCall._handleWebSocketSetup(navigation);
    WebSocketCheckSim.setReconnect(true);
    WebSocketCheckSim._handleWebSocketSetup(navigation);
    getListDevices();
  }, []);

  const getListDevices = () =>{
    getListDeviceApi(DataLocal.userInfo.id, Consts.pageDefault, 100, '', 'ACTIVE', {
      success: resData => {
        setDevices(resData.data);
      },
      refLoading,
      refNotification,
    });
  }

  useEffect(() => {
    if (logout) {
      navigation.replace(Consts.ScreenIds.Login);
    }
  }, [logout]);

  useEffect(() => {
    if (isFocused) {
      getListDevices();
    }
  }, [isFocused]);

  useLayoutEffect(() => {
    if (commonInfoReducer.selectDevice === null || commonInfoReducer.selectDevice === undefined) {
      return;
    }
    setSelectedIndex(commonInfoReducer.selectDevice);
    reduxStore.store.dispatch(commonInfoAction.reset());
  }, [commonInfoReducer]);

  const pressMap = () => {
    navigation.navigate(Consts.ScreenIds.Maps);
  };

  const pressChat = () => {
    navigation.navigate(Consts.ScreenIds.Chat);
  };

  const pressVideoCall = () => {
    navigation.navigate(Consts.ScreenIds.ListDevice);
  };

  const pressJourney = () => {
    navigation.navigate(Consts.ScreenIds.JourneyHistory);
  };

  const pressSafeArea = () => {
    navigation.navigate(Consts.ScreenIds.ElectronicFence);
  };

  const pressSoundGuardian = () => {
    navigation.navigate(Consts.ScreenIds.EacesDroping);
  };

  const pressFindDevice = () => {
    navigation.navigate(Consts.ScreenIds.FindDevice);
  };

  const pressAlarmClock = () => {
    navigation.navigate(Consts.ScreenIds.AlarmClock);
  };

  const pressSettings = () => {
    navigation.navigate(Consts.ScreenIds.Settings);
  };

  const pressWarning = () => {
    navigation.navigate(Consts.ScreenIds.Warning);
  };
  const pressHealth = () => {
    navigation.navigate(Consts.ScreenIds.Health);
  };
  const pressPaying = () => {
    navigation.navigate(Consts.ScreenIds.Paying);
  };

  const pressSecretPhotoShoot = () => {
    navigation.navigate(Consts.ScreenIds.SecretPhotoShoot);
  };

  const RewardPoints = () => {
    navigation.navigate(Consts.ScreenIds.RewardPoints);
  };


  const buttonProps = { activeOpacity: 0.8 };

  const handleChange = async (index) => {
    setSelectedIndex(index);
    await DataLocal.saveDeviceIndex(index);
    await DataLocal.saveDeviceId(devices[index].deviceId);
  };

  return (
    <View style={styles.container}>
      <StatusBar translucent backgroundColor='transparent' />
      <View style={styles.statusBar}>
        <Image
          source={Images.bgHome}
          resizeMode={'stretch'}
          style={styles.banner}
        />
        <Text style={styles.txtTitle}>V-KID PRO</Text>
        <View style={styles.menu}>
          <Menu
            style={{ borderRadius: 15 }}
            visible={showMenu}
            anchor={
              <View style={styles.menuSelect}>
                <Image source={Images.icShow} style={styles.iconShowMenu} resizeMode='stretch' />
                <View onStartShouldSetResponder={()=>{ setShowMenu(true)}}>
                  <Text style={styles.textMenuShow}>{devices && devices[selectedIndex] && devices[selectedIndex].deviceName}</Text>
                </View>
                <View onStartShouldSetResponder={()=>{
                  navigation.navigate(Consts.ScreenIds.InfoKits, devices[selectedIndex].avatar ? {avatar: devices[selectedIndex].avatar} : {avatar: null})
                }}>
                  <Image
                    source={devices && devices[selectedIndex] && devices[selectedIndex].avatar ? { uri: devices[selectedIndex].avatar } : Images.icOther}
                    style={styles.avatar} resizeMode='cover' />
                  </View>
              </View>}
            onRequestClose={() => {
              setShowMenu(false);
            }}
          >
            {devices && devices.map((obj, i) => {
              const isSelectDevice = obj.deviceId === DataLocal.deviceId;
              return (
                <View key={i.toString()} style={{ paddingHorizontal: 10 }}>
                  <View style={styles.viewMenuDrop} onStartShouldSetResponder={() => {
                    !isSelectDevice ? handleChange(i) : null;
                  }}>
                    <Text style={[styles.textMenuDrop,isSelectDevice?{color:'#CDCDCD'}:null]}>{obj.deviceName}</Text>
                    <Image source={obj.avatar ? { uri: obj.avatar } : Images.icOther} style={styles.avatar}
                           resizeMode='cover' />
                  </View>
                  <MenuDivider />
                </View>
              );
            })}
          </Menu>
        </View>
      </View>

      <ScrollView style={styles.body}>
        <View style={{width: '100%', height: '49.5%', flexDirection: 'row'}}>
          <View style={styles.width50}>
            <View style={[styles.buttonContainerL, {height: '50%', width: '101%', marginBottom: '1.5%'}]}>
              <TouchableOpacity
                {...buttonProps}
                style={styles.button}
                onPress={pressMap}>
                <View style={styles.bgIcon}>
                  <Image source={Images.icMap} style={styles.icon}/>
                </View>
                <Text style={styles.buttonText}>{t('common:home_gps')}</Text>
              </TouchableOpacity>
            </View>
            <View style={[styles.buttonContainerL, {height: '50%', width: '101%'}]}>
              <TouchableOpacity
                {...buttonProps}
                style={styles.button}
                onPress={pressJourney}>
                <View style={styles.bgIcon}>
                  <Image source={Images.icJourney} style={styles.icon}/>
                </View>
                <Text style={styles.buttonText}>{t('common:home_journey')}</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={[styles.buttonContainerR, {minHeight: '48%', marginTop: '0.5%'}]}>
            <TouchableOpacity
              {...buttonProps}
              style={styles.button}
              onPress={pressVideoCall}>
              <View style={styles.bgIcon}>
                <Image source={Images.icVideoCall} style={styles.icon}/>
              </View>
              <Text style={styles.buttonText}>{t('common:home_videoCall')}</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={{width: '100%', height: '25%', flexDirection: 'row'}}>
          <View style={styles.buttonContainerL}>
            <TouchableOpacity
              {...buttonProps}
              style={styles.button}
              onPress={pressSafeArea}>
              <View style={styles.bgIcon}>
                <Image source={Images.icSafeZone} style={styles.icon}/>
              </View>
              <Text style={styles.buttonText}>{t('common:home_safeArea')}</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.buttonContainerR}>
            <TouchableOpacity
              {...buttonProps}
              style={styles.button}
              onPress={pressSoundGuardian}>
              <View style={styles.bgIcon}>
                <Image source={Images.icChieldFill} style={styles.icon}/>
              </View>
              <Text style={styles.buttonText}>{t('common:home_soundGuardian')}</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={{width: '100%', height: '25%', flexDirection: 'row'}}>
          <View style={styles.buttonContainerL}>
            <TouchableOpacity
              {...buttonProps}
              style={styles.button}
              onPress={pressAlarmClock}>
              <View style={styles.bgIcon}>
                <Image source={Images.icAlarm} style={styles.icon}/>
              </View>
              <Text style={styles.buttonText}>{t('common:home_alarmClock')}</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.buttonContainerR}>
            <TouchableOpacity
              {...buttonProps}
              style={styles.button}
              onPress={pressChat}>
              <View style={styles.bgIcon}>
                <Image source={Images.icChat} style={styles.icon}/>
              </View>
              <Text style={styles.buttonText}>{t('common:home_chat')}</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={{width: '100%', height: '25%', flexDirection: 'row'}}>
          <View style={styles.buttonContainerL}>
            <TouchableOpacity
              {...buttonProps}
              style={styles.button}
              onPress={pressFindDevice}>
              <View style={styles.bgIcon}>
                <Image source={Images.icFindDevice} style={styles.icon}/>
              </View>
              <Text style={styles.buttonText}>{t('common:home_findDevice')}</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.buttonContainerR}>
            <TouchableOpacity
              {...buttonProps}
              style={styles.button}
              onPress={pressSettings}>
              <View style={styles.bgIcon}>
                <Image source={Images.icSetting} style={styles.icon}/>
              </View>
              <Text style={styles.buttonText}>{t('common:home_setting')}</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={{width: '100%', height: '25%', flexDirection: 'row'}}>
          <View style={styles.buttonContainerL}>
            <TouchableOpacity
              {...buttonProps}
              style={styles.button}
              onPress={pressWarning}>
              <View style={styles.bgIcon}>
                <Image source={Images.icWarning} style={[styles.icon, {height: 30}]}/>
              </View>
              <Text style={styles.buttonText}>{t('common:home_warning')}</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.buttonContainerR}>
            <TouchableOpacity
              {...buttonProps}
              style={styles.button}
              onPress={pressHealth}>
              <View style={styles.bgIcon}>
                <Image source={Images.icTransport} style={styles.icon}/>
              </View>
              <Text style={styles.buttonText}>{t('common:home_transport')}</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={{width: '100%', height: '25%', flexDirection: 'row'}}>
          <View style={styles.buttonContainerL}>
            <TouchableOpacity
              {...buttonProps}
              style={styles.button}
              onPress={pressPaying}>
              <View style={styles.bgIcon}>
                <Image source={Images.icPayment} style={styles.icon}/>
              </View>
              <Text style={styles.buttonText}>{t('common:paying')}</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.buttonContainerR}>
            <TouchableOpacity
              {...buttonProps}
              style={styles.button}
              onPress={pressSecretPhotoShoot}>
              <View style={styles.bgIcon}>
                <Image source={Images.icShootPhoto} style={styles.icon1}/>
              </View>
              <Text style={styles.buttonText}>{t('common:home_secretPhotoShoot')}</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={{width: '100%', height: '25%', flexDirection: 'row'}}>
          <View style={styles.buttonContainerL}>
            <TouchableOpacity
              {...buttonProps}
              style={styles.button}
              onPress={RewardPoints}>
              <View style={styles.bgIcon}>
                <Image source={Images.icReward} style={styles.icon1}/>
              </View>
              <Text style={styles.buttonText}>{t('common:home_reward')}</Text>
            </TouchableOpacity>
          </View>
        </View>

      </ScrollView>
      <LoadingIndicator ref={refLoading}/>
      <NotificationModal ref={refNotification}/>
    </View>
  );
}
