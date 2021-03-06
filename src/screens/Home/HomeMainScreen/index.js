import { AppState, Image, Linking, StatusBar, Text, TouchableOpacity, View } from "react-native";
import React, {useEffect, useLayoutEffect, useRef, useState} from 'react';

import {Menu, MenuDivider} from 'react-native-material-menu';
import DataLocal from '../../../data/dataLocal';
import reduxStore from '../../../redux/config/redux';
import {useSelector} from 'react-redux';
import commonInfoAction from '../../../redux/actions/commonInfoAction';
import Consts from '../../../functions/Consts';
import Images from '../../../assets/Images';
import LoadingIndicator from '../../../components/LoadingIndicator';
import {getListDeviceApi} from '../../../network/DeviceService';

import {styles} from './styles';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import XmppClient from '../../../network/xmpp/XmppClient';
import WebSocketSafeZone from '../../../network/socket/WebSocketSafeZone';
import WebSocketVideoCall from '../../../network/socket/WebSocketVideoCall';
import WebSocketCheckSim from '../../../network/socket/WebSocketCheckSim';
import {useTranslation} from 'react-i18next';
import NotificationModal from '../../../components/NotificationModal';
import { checkLocationPermission } from '../../../functions/permissions';
import WebSocketCheckLogout from "../../../network/socket/WebSocketCheckLogout";
import loginAction from "../../../redux/actions/loginAction";
import SimpleToast from "react-native-simple-toast";

export default function HomeMainScreen() {
  const navigation = useNavigation();
  const commonInfoReducer = useSelector(state => state.commonInfoReducer);
  const logout = useSelector(state => state.loginReducer.isLogout);
  const refLoading = useRef();
  const refNotification = useRef();
  const [showMenu, setShowMenu] = useState(false);
  const [devices, setDevices] = useState([]);
  const isFocused = useIsFocused();
  const [selectedIndex, setSelectedIndex] = useState(DataLocal.deviceIndex);
  const [typeNotifyDevice, setTypeNotifyDevice] = useState('')
  const {t} = useTranslation();
  const appState = useRef(AppState.currentState);

  useEffect(() => {
    const subscription = AppState.addEventListener("change", nextAppState => {
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === "active"
      ) {
      }

      appState.current = nextAppState;
      if (appState.current === 'active'){
        if (WebSocketSafeZone.isConnected === false){
          WebSocketSafeZone.setReconnect(true);
          WebSocketSafeZone._handleWebSocketSetup(navigation);
        }
        if (WebSocketCheckSim.isConnected === false){
          WebSocketCheckSim.setReconnect(true);
          WebSocketCheckSim._handleWebSocketSetup(navigation);
        }
        if (WebSocketVideoCall.isConnected === false){
          WebSocketVideoCall.setReconnect(true);
          WebSocketVideoCall._handleWebSocketSetup(navigation);
        }
        if (WebSocketCheckLogout.isConnected === false){
          WebSocketCheckLogout.setReconnect(true);
          WebSocketCheckLogout._handleWebSocketSetup(navigation);
        }
        getListDevices();
      }
    });

    return () => {
      subscription.remove();
    };
  }, []);

  useLayoutEffect(() => {
    XmppClient.connectXmppServer();
    WebSocketSafeZone.setReconnect(true);
    WebSocketSafeZone._handleWebSocketSetup(navigation);
    WebSocketVideoCall.setReconnect(true);
    WebSocketVideoCall._handleWebSocketSetup(navigation);
    WebSocketCheckSim.setReconnect(true);
    WebSocketCheckSim._handleWebSocketSetup(navigation);
    WebSocketCheckLogout.setReconnect(true);
    WebSocketCheckLogout._handleWebSocketSetup(navigation);
    getListDevices();
  }, []);

  useEffect(() => {
    if (logout) {
      reduxStore.store.dispatch(loginAction.reset());
      DataLocal.removeAll().then();
      XmppClient.disconnectXmppServer();
      WebSocketSafeZone.disconnect();
      WebSocketVideoCall.disconnect();
      navigation.replace(Consts.ScreenIds.Auth);
    }
  }, [logout]);

  useEffect(() => {
    if (isFocused) {
      getListDevices();
    }
  }, [isFocused]);

  useLayoutEffect(() => {
    if (commonInfoReducer.selectDevice !== null && commonInfoReducer.selectDevice !== undefined) {
      setSelectedIndex(commonInfoReducer.selectDevice);
      reduxStore.store.dispatch(commonInfoAction.reset());
    } else if (commonInfoReducer.navigate !== null && commonInfoReducer.navigate !== undefined) {
      getListDevices();
      if (commonInfoReducer.navigate !== Consts.ScreenIds.Tabs) {
        navigation.navigate(commonInfoReducer.navigate);
      }
    } else if (commonInfoReducer.replace !== null && commonInfoReducer.replace !== undefined ) {
      getListDevices();
    }
  }, [commonInfoReducer]);

  useEffect(() => {
    let checkDevice = false;
    if (devices.length > 0) {
     for (let i = 0; i < devices.length ; i++) {
       if (DataLocal.deviceId === devices[i].deviceId) {
         return checkDevice = true;
       }
     }
     if (!checkDevice) {
       setSelectedIndex(0);
       DataLocal.saveDeviceIndex(0);
       DataLocal.saveDeviceId(devices[0].deviceId);
     }
   }
  }, [devices])

  useEffect(() => {
    if (typeNotifyDevice !== '' && commonInfoReducer.userDeleteDevice === false) {
      reduxStore.store.dispatch(commonInfoAction.reset());
      if (typeNotifyDevice === 'DEVICE_HOLLOW' ) {
        gotoAddDevices();
      } else if (typeNotifyDevice === 'DEVICE_DELETED' ) {
        SimpleToast.show(t('common:alertEmptyDevices'));
      } else if (typeNotifyDevice === 'DEVICE_ACCEPTED' ) {
        SimpleToast.show(t('common:alertDevicesAccepted'));
      }
   }
    setTypeNotifyDevice('');
  },[typeNotifyDevice])

  const getListDevices = () => {
    getListDeviceApi(DataLocal.userInfo.id, Consts.pageDefault, 100, '', 'ACTIVE', {
      success: resData => {
        setDevices(resData.data);
        if (resData.data.length === 0) {
          setTypeNotifyDevice('DEVICE_HOLLOW');
        } else if (resData.data.length > 1 && commonInfoReducer.navigate !== null && commonInfoReducer.navigate !== undefined && commonInfoReducer.navigate === Consts.ScreenIds.Tabs) {
            setTypeNotifyDevice('DEVICE_ACCEPTED');
        } else if (resData.data.length > 0 && commonInfoReducer.replace !== null && commonInfoReducer.replace !== undefined && commonInfoReducer.replace === Consts.ScreenIds.AddDeviceScreen) {
            setTypeNotifyDevice('DEVICE_DELETED');
          }
      },
      refLoading,
      refNotification,
    });
  }

  const gotoAddDevices = () => {
    navigation.navigate(Consts.ScreenIds.AddDeviceScreen, {isModalConfirm: true, alertDevice: true});
    XmppClient.disconnectXmppServer();
    WebSocketSafeZone.disconnect();
    WebSocketVideoCall.disconnect();
  }

  const pressMap = () => {
    if (DataLocal.haveSim === '0') {
      return refNotification.current.open(t('errorMsg:kwa4067'));
    }
    checkLocationPermission().then((location) => {
      if (location)
       return navigation.navigate(Consts.ScreenIds.Maps,{listDevices: devices});
    })
  };

  const pressChat = () => {
    if (DataLocal.haveSim === '0') {
      return refNotification.current.open(t('errorMsg:kwa4067'));
    }
    navigation.navigate(Consts.ScreenIds.Chat);
  };

  const pressVideoCall = () => {
    navigation.navigate(Consts.ScreenIds.ListDevice);
  };

  const pressJourney = () => {
    if (DataLocal.haveSim === '0') {
      return refNotification.current.open(t('errorMsg:kwa4067'));
    }
    navigation.navigate(Consts.ScreenIds.JourneyHistory);
  };

  const pressSafeArea = () => {
    if (DataLocal.haveSim === '0') {
      return refNotification.current.open(t('errorMsg:kwa4067'));
    }
    navigation.navigate(Consts.ScreenIds.ElectronicFence, {indexDevice: devices[selectedIndex]});
  };

  const pressSoundGuardian = () => {
    if (DataLocal.haveSim === '0') {
      return refNotification.current.open(t('errorMsg:kwa4067'));
    }
    navigation.navigate(Consts.ScreenIds.EacesDroping);
  };

  const pressFindDevice = () => {
    if (DataLocal.haveSim === '0') {
      return refNotification.current.open(t('errorMsg:kwa4067'));
    }
    navigation.navigate(Consts.ScreenIds.FindDevice);
  };

  const pressAlarmClock = () => {
    if (DataLocal.haveSim === '0') {
      return refNotification.current.open(t('errorMsg:kwa4067'));
    }
    navigation.navigate(Consts.ScreenIds.AlarmClock);
  };

  const pressSettings = () => {
    navigation.navigate(Consts.ScreenIds.Settings, {isAdmin: devices[selectedIndex].admin});
  };

  const pressWarning = () => {
    if (DataLocal.haveSim === '0') {
      return refNotification.current.open(t('errorMsg:kwa4067'));
    }
    navigation.navigate(Consts.ScreenIds.Warning);
  };
  const pressHealth = () => {
    if (DataLocal.haveSim === '0') {
      return refNotification.current.open(t('errorMsg:kwa4067'));
    }
    navigation.navigate(Consts.ScreenIds.Health);
  };
  const pressPaying = () => {
    if (DataLocal.haveSim === '0') {
      return refNotification.current.open(t('errorMsg:kwa4067'));
    }
    navigation.navigate(Consts.ScreenIds.Paying);
  };

  const pressSecretPhotoShoot = () => {
    if (DataLocal.haveSim === '0') {
      return refNotification.current.open(t('errorMsg:kwa4067'));
    }
    navigation.navigate(Consts.ScreenIds.SecretPhotoShoot);
  };

  const RewardPoints = () => {
    if (DataLocal.haveSim === '0') {
      return refNotification.current.open(t('errorMsg:kwa4067'));
    }
    navigation.navigate(Consts.ScreenIds.RewardPoints);
  };


  const buttonProps = {activeOpacity: 0.8};

  const handleChange = async (index) => {
    setSelectedIndex(index);
    await DataLocal.saveDeviceIndex(index);
    await DataLocal.saveDeviceId(devices[index].deviceId);
  };

  const onCall = () => {
    if (DataLocal.haveSim === '0') {
      return refNotification.current.open(t('errorMsg:kwa4067'));
    }
    Linking.openURL(`tel:${'0' + devices[selectedIndex].isdn.substring(3)}`)
  }

  const onSMS = () => {
    navigation.navigate(Consts.ScreenIds.SMS);
  }

  const friendsList = () => {
    navigation.navigate(Consts.ScreenIds.FriendsList);
  }
  return (
    <View style={styles.container}>
      <StatusBar translucent backgroundColor='transparent'/>
      <View style={styles.statusBar}>
        <Image
          source={Images.bgHome}
          resizeMode={'stretch'}
          style={styles.banner}
        />
        <Text style={styles.txtTitle}>V-KID PRO</Text>
        <View style={styles.menu}>
          <Menu
            style={{borderRadius: 15}}
            visible={showMenu}
            anchor={
              <View style={styles.menuSelect}>
                <View style={styles.menuSelect} onStartShouldSetResponder={() => {
                  setShowMenu(true)
                }}>
                  <Image source={Images.icShow} style={styles.iconShowMenu} resizeMode='stretch'/>
                  <Text
                    style={styles.textMenuShow}>{devices && devices[selectedIndex] && devices[selectedIndex].deviceName}</Text>
                </View>
                <View onStartShouldSetResponder={() => {
                  navigation.navigate(Consts.ScreenIds.InfoKits,
                    devices[selectedIndex].avatar ?
                      {avatar: devices[selectedIndex].avatar, isAdmin: devices[selectedIndex].admin }
                      : {avatar: null, isAdmin: devices[selectedIndex].admin})
                }}>
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
              const isSelectDevice = obj.deviceId === DataLocal.deviceId;
              {devices[selectedIndex] && DataLocal.saveHaveSim(devices[selectedIndex].validSim ? '1' : '0');}
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
      </View>

      <View style={styles.body}>
        <View style={{width: '100%', height: '39.5%', flexDirection: 'row'}}>
          <View style={styles.width50}>
            <View style={[styles.buttonContainerL, {
              height: '100%',
              width: '49%',
              marginBottom: '1%',
              marginRight: '2%'
            }]}>
              <TouchableOpacity
                {...buttonProps}
                style={[styles.button, {marginBottom: '4%'}]}
                onPress={pressMap}>
                <View style={styles.bgIcon}>
                  <Image source={Images.icMap} style={styles.icon}/>
                </View>
                <Text style={styles.buttonText}>{t('common:home_gps')}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                {...buttonProps}
                style={[styles.button, {marginTop: '4%'}]}
                onPress={pressSafeArea}>
                <View style={styles.bgIcon}>
                  <Image source={Images.icSafeZone} style={styles.icon}/>
                </View>
                <Text style={styles.buttonText}>{t('common:home_safeArea')}</Text>
              </TouchableOpacity>
            </View>
            <View style={[styles.buttonContainerR, {height: '100%', width: '49%'}]}>
              <TouchableOpacity
                {...buttonProps}
                style={[styles.button, {marginBottom: '4%'}]}
                onPress={pressJourney}>
                <View style={styles.bgIcon}>
                  <Image source={Images.icJourney} style={styles.icon}/>
                </View>
                <Text style={styles.buttonText}>{t('common:home_journey')}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                {...buttonProps}
                style={[styles.button, {marginTop: '4%'}]}
                onPress={pressChat}>
                <View style={styles.bgIcon}>
                  <Image source={Images.icChat} style={styles.icon}/>
                </View>
                <Text style={styles.buttonText}>{t('common:home_chat')}</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={[styles.buttonContainerR, {height: '100%', marginTop: '0.5%'}]}>
            <View style={{flexDirection: 'row', height: '50%'}}>
              <TouchableOpacity
                {...buttonProps}
                style={[styles.button, {marginBottom: '2%', marginRight: '2%'}]}
                onPress={pressVideoCall}
              >
                <View style={styles.bgIcon}>
                  <Image source={Images.icVideoCall} style={styles.icon}/>
                </View>
                <Text style={styles.buttonText}>{t('common:home_videoCall')}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                {...buttonProps}
                style={[styles.button, {marginBottom: '2%', marginLeft: '2%'}]}
                onPress={friendsList}
              >
                <View style={styles.bgIcon}>
                  <Image source={Images.icFriendsList} style={styles.icon}/>
                </View>
                <Text style={[styles.buttonText, {paddingHorizontal: '5%'}]}>{t('common:home_friend')}</Text>
              </TouchableOpacity>
            </View>
           <View style={{flexDirection: 'row', height: '50%'}}>
           <TouchableOpacity
              {...buttonProps}
              style={[styles.button, {marginTop: '2%', marginRight: '2%'}]}
              onPress={onCall}
            >
              <View style={styles.bgIcon}>
                <Image source={Images.ic_local_phone} style={styles.icon}/>
              </View>
              <Text style={styles.buttonText}>{t('common:home_phone')}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              {...buttonProps}
              style={[styles.button, {marginTop: '2%', marginLeft: '2%'}]}
              onPress={onSMS}
            >
              <View style={styles.bgIcon}>
                <Image source={Images.icSMS} style={styles.icon}/>
              </View>
              <Text style={styles.buttonText}>{t('common:home_sms')}</Text>
            </TouchableOpacity>
           </View>
          </View>
        </View>
        <View style={{width: '100%', height: '20%', flexDirection: 'row'}}>
          <View style={styles.buttonContainerL1}>
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
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              {...buttonProps}
              style={styles.button}
              onPress={RewardPoints}>
              <View style={styles.bgIcon}>
                <Image source={Images.icReward} style={styles.icon}/>
              </View>
              <Text style={styles.buttonText}>{t('common:home_reward')}</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.buttonContainerR1}>
            <TouchableOpacity
              {...buttonProps}
              style={styles.button}
              onPress={pressSecretPhotoShoot}>
              <View style={styles.bgIcon}>
                <Image source={Images.icShootPhoto} style={styles.icon}/>
              </View>
              <Text style={styles.buttonText}>{t('common:home_secretPhotoShoot')}</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={{width: '100%', height: '20%', flexDirection: 'row'}}>
          <View style={[styles.buttonContainerL1]}>
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
          <View style={styles.buttonContainer}>
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
          <View style={styles.buttonContainerR1}>
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
        <View style={{width: '100%', height: '20%', flexDirection: 'row'}}>
          <View style={styles.buttonContainerL1}>
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
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              {...buttonProps}
              style={styles.button}
              onPress={pressWarning}>
              <View style={styles.bgIcon}>
                <Image source={Images.icWarning} style={styles.icon}/>
              </View>
              <Text style={styles.buttonText}>{t('common:home_warning')}</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.buttonContainerR1}>
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

      </View>
      <LoadingIndicator ref={refLoading}/>
      <NotificationModal ref={refNotification}/>
    </View>
  );
}
