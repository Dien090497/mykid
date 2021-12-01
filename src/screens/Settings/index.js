import Consts, {FontSize } from '../../functions/Consts';
import {Dimensions, FlatList, Image, Text, TouchableOpacity, View} from 'react-native';
import React, { useRef } from 'react';
import {Colors} from '../../assets/colors/Colors';
import CustomIcon from '../../components/VectorIcons';
import Header from '../../components/Header';
import LoadingIndicator from '../../components/LoadingIndicator';
import {styles} from './styles';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Images from '../../assets/Images';
import NotificationModal from '../../components/NotificationModal';
import { useTranslation } from 'react-i18next';
import DataLocal from "../../data/dataLocal";

const {width} = Dimensions.get('window');
export default ({navigation}) => {
  const refLoading = useRef();
  const { t } = useTranslation();
  const refNotification = useRef();
  const dataSettings = [
    {
      key: 'Contacts',
      title: t('common:setting_contact'),
      onPress: () => {
        navigation.navigate(Consts.ScreenIds.Contacts);
      },
      icon: (
        <Image source={Images.icPhoneBook} style={{width: 40, height: 40}} resizeMode={'stretch'}/>
      ),
    },
    {
      key: 'Members',
      title: t('common:setting_member'),
      onPress: () => {
        navigation.navigate(Consts.ScreenIds.Members);
      },
      icon: (
        <Image source={Images.icUserFill} style={{width: 40, height: 40}} resizeMode={'stretch'}/>
      ),
    },
    {
      key: 'DoNotDisturb',
      title: t('common:header_doNotDisturb'),
      onPress: () => {
        if (DataLocal.haveSim === '0') {
          return refNotification.current.open(t('errorMsg:kwa4067'));
        }
        navigation.navigate(Consts.ScreenIds.DoNotDisturb);
      },
      icon: (
        <Image source={Images.icSoundMute} style={{width: 40, height: 40}} resizeMode={'stretch'}/>
      ),
    },
    {
      key: 'LanguageTimeZone',
      title: t('common:header_language_timezone'),
      onPress: () => {
        if (DataLocal.haveSim === '0') {
          return refNotification.current.open(t('errorMsg:kwa4067'));
        }
        navigation.navigate(Consts.ScreenIds.LanguageTimeZone);
      },
      icon: (
        <Image source={Images.icWorldFill} style={{width: 40, height: 40}} resizeMode={'stretch'}/>
      ),
    },
    {
      key: 'SoundSettings',
      title: t('common:header_soundSettings'),
      onPress: () => {
        if (DataLocal.haveSim === '0') {
          return refNotification.current.open(t('errorMsg:kwa4067'));
        }
        navigation.navigate(Consts.ScreenIds.SoundSettings);
      },
      icon: (
        <Image source={Images.icSoundSetting} style={{width: 40, height: 40}} resizeMode={'stretch'}/>
      ),
    },
    {
      key: 'RemoteDevices',
      title: t('common:header_remoteDevices'),
      onPress: () => {
        if (DataLocal.haveSim === '0') {
          return refNotification.current.open(t('errorMsg:kwa4067'));
        }
        navigation.navigate(Consts.ScreenIds.OffDevice);
      },
      icon: (
        <Image source={Images.icSubtract} style={{width: 40, height: 40}} resizeMode={'stretch'}/>
      ),
    },
    {
      key: 'RemoteStart',
      title: t('common:header_remoteStart'),
      onPress: () => {
        if (DataLocal.haveSim === '0') {
          return refNotification.current.open(t('errorMsg:kwa4067'));
        }
        navigation.navigate(Consts.ScreenIds.RestartDevice);
      },
      icon: (
        <Image source={Images.icRemoteStart} style={{width: 40, height: 40}} resizeMode={'stretch'}/>
      ),
    },
    {
      key: 'InstallPosition',
      title: t('common:header_installPosition'),
      onPress: () => {
        if (DataLocal.haveSim === '0') {
          return refNotification.current.open(t('errorMsg:kwa4067'));
        }
        navigation.navigate(Consts.ScreenIds.InstallPosition);
      },
      icon: (
        <Image source={Images.icInstallPosition} style={{width: 40, height: 40}} resizeMode={'stretch'}/>
      ),
    },
    {
      key: 'DisconnectClock',
      title: t('common:header_disconnectClock'),
      onPress: () => {
        if (DataLocal.haveSim === '0') {
          return refNotification.current.open(t('errorMsg:kwa4067'));
        }
        navigation.navigate(Consts.ScreenIds.DisconnectClock);
      },
      icon: (
        <Image source={Images.icDisconnectClock} style={{width: 40, height: 40}} resizeMode={'stretch'}/>
      ),
    },
  ];
  const renderItem = ({item}) => {
    return (
      <TouchableOpacity
        activeOpacity={0.5}
        style={styles.tobMain}
        key={item.key}
        onPress={item.onPress}>
        <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
          <View style={styles.icon}>{item.icon}</View>
          <Text style={styles.titleText}>{item.title}</Text>
          <View style={{flex:0.1,position: 'absolute', right: width* 0.006}}>
            <CustomIcon
              name={'arrow-forward-ios'}
              iconFamily={'MaterialIcons'}
              size={FontSize.medium}
              color={Colors.colorImageAdmin}/>
          </View>
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <View
      style={[styles.container, {paddingBottom: useSafeAreaInsets().bottom}]}>
      <Header title={t('common:header_settings')}/>
      <View style={styles.mainView}>
        <FlatList
          data={dataSettings}
          renderItem={renderItem}
          keyExtractor={item => item.key}
        />
      </View>
      <LoadingIndicator ref={refLoading}/>
      <NotificationModal ref={refNotification}/>
    </View>
  );
};
